import express from 'express'
import multer from 'multer'
import Anthropic from '@anthropic-ai/sdk'
import PDFDocument from 'pdfkit'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'
import { protect } from '../middleware/auth.js'

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const ok = file.mimetype === 'application/pdf'
      || file.mimetype.includes('wordprocessingml')
      || file.mimetype === 'application/msword'
    cb(null, ok)
  },
})

async function extractText(file) {
  if (file.mimetype === 'application/pdf') {
    // Dynamic import to handle ESM/CJS mismatch
    const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default
    const parsed = await pdfParse(file.buffer)
    return parsed.text
  }
  const mammoth = await import('mammoth')
  const result  = await mammoth.extractRawText({ buffer: file.buffer })
  return result.value
}

function buildPrompt(jobDescription, resumeText) {
  return `You are an expert ATS resume optimizer and career coach.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE'S CURRENT RESUME:
${resumeText}

Analyze the resume against the job description and return ONLY valid JSON (no markdown, no explanation outside the JSON):

{
  "atsScore": <number 0-100>,
  "matchedKeywords": [<up to 15 keywords found in both JD and resume>],
  "missingKeywords": [<up to 10 important keywords from JD missing in resume>],
  "suggestions": [
    { "type": "critical|improvement|optional", "text": "<specific suggestion>" }
  ],
  "optimizedContent": "<full rewritten resume as plain text, maximizing keyword alignment with the JD while keeping facts accurate>"
}`
}

router.post('/optimize', protect, upload.single('resume'), async (req, res) => {
  try {
    const { jobDescription } = req.body

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({ message: 'Job description must be at least 20 characters.' })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required.' })
    }

    const resumeText = await extractText(req.file)

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(503).json({
        message: 'AI service not configured. Set ANTHROPIC_API_KEY in backend/.env to enable resume optimization.',
      })
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 4096,
      messages: [{ role: 'user', content: buildPrompt(jobDescription, resumeText) }],
    })

    const raw = message.content[0]?.text || '{}'
    let parsed

    try {
      // Strip markdown code fences if present
      const clean = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
      parsed = JSON.parse(clean)
    } catch {
      return res.status(500).json({ message: 'Failed to parse AI response. Please try again.' })
    }

    res.json({
      atsScore:         parsed.atsScore         ?? 0,
      matchedKeywords:  parsed.matchedKeywords  ?? [],
      missingKeywords:  parsed.missingKeywords  ?? [],
      suggestions:      parsed.suggestions      ?? [],
      optimizedContent: parsed.optimizedContent ?? '',
    })
  } catch (err) {
    console.error('[resume/optimize]', err)
    res.status(500).json({ message: err.message || 'Optimization failed.' })
  }
})

router.post('/download', protect, async (req, res) => {
  try {
    const { content, format } = req.body

    if (!content) return res.status(400).json({ message: 'Content is required.' })
    if (!['pdf', 'docx'].includes(format)) return res.status(400).json({ message: 'Format must be pdf or docx.' })

    if (format === 'pdf') {
      const doc = new PDFDocument({ margin: 50, size: 'A4' })
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename="optimized_resume.pdf"')
      doc.pipe(res)

      const lines = content.split('\n')
      let first = true

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) { doc.moveDown(0.4); continue }

        // Detect section headers (all-caps lines or lines ending with ':')
        const isHeader = /^[A-Z][A-Z\s&/]{3,}$/.test(trimmed) || /^[A-Z].+:$/.test(trimmed)

        if (isHeader) {
          if (!first) doc.moveDown(0.5)
          doc.fontSize(13).font('Helvetica-Bold').fillColor('#333333').text(trimmed)
          doc.moveDown(0.2)
        } else if (/^[-•*]/.test(trimmed)) {
          doc.fontSize(10).font('Helvetica').fillColor('#444444').text(`  ${trimmed}`, { indent: 10 })
        } else {
          doc.fontSize(10).font('Helvetica').fillColor('#444444').text(trimmed)
        }
        first = false
      }

      doc.end()
    } else {
      // DOCX
      const lines   = content.split('\n')
      const paras   = []

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) { paras.push(new Paragraph({ text: '' })); continue }

        const isHeader = /^[A-Z][A-Z\s&/]{3,}$/.test(trimmed) || /^[A-Z].+:$/.test(trimmed)

        if (isHeader) {
          paras.push(new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: trimmed, bold: true, size: 26 })],
            spacing: { before: 200, after: 100 },
          }))
        } else if (/^[-•*]/.test(trimmed)) {
          paras.push(new Paragraph({
            children: [new TextRun({ text: trimmed, size: 22 })],
            bullet: { level: 0 },
          }))
        } else {
          paras.push(new Paragraph({
            children: [new TextRun({ text: trimmed, size: 22 })],
          }))
        }
      }

      const doc  = new Document({ sections: [{ properties: {}, children: paras }] })
      const buf  = await Packer.toBuffer(doc)

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      res.setHeader('Content-Disposition', 'attachment; filename="optimized_resume.docx"')
      res.send(buf)
    }
  } catch (err) {
    console.error('[resume/download]', err)
    res.status(500).json({ message: err.message || 'Download failed.' })
  }
})

export default router
