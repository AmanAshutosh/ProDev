const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const req = async (endpoint, opts = {}) => {
  const token = localStorage.getItem('prodev-token')
  const res = await fetch(`${BASE}${endpoint}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...opts.headers,
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

export const api = {
  get:  (ep)       => req(ep),
  post: (ep, body) => req(ep, { method: 'POST', body: JSON.stringify(body) }),
  put:  (ep, body) => req(ep, { method: 'PUT',  body: JSON.stringify(body) }),
  del:  (ep)       => req(ep, { method: 'DELETE' }),
}
