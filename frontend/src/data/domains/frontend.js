export const FRONTEND_DOMAIN = {
  id: "frontend",
  label: "Frontend",
  sub: "React, CSS, JS, HTML",
  gradient: "gradient-purple",
  textGrad: "text-grad-purple",
  color: "#6c63ff",
  shadow: "rgba(108,99,255,0.35)",
  icon: "Code2",
  progress: 0,
  topics: ["React Hooks", "CSS Grid", "TypeScript"],
  topicColors: ["text-violet-500", "text-orange-400", "text-emerald-500"],
  allTopics: [
    { id: "html-semantics", label: "HTML5 Semantic Elements", group: "HTML5" },
    { id: "html-forms", label: "Forms, Inputs & Validation", group: "HTML5" },
    { id: "html-a11y", label: "Accessibility (ARIA, WCAG)", group: "HTML5" },
    { id: "css-flexbox", label: "Flexbox Layout", group: "CSS3" },
    { id: "css-grid", label: "CSS Grid Layout", group: "CSS3" },
    { id: "css-animations", label: "Animations & Transitions", group: "CSS3" },
    { id: "css-variables", label: "CSS Custom Properties", group: "CSS3" },
    {
      id: "css-responsive",
      label: "Responsive Design & Media Queries",
      group: "CSS3",
    },
    { id: "js-closures", label: "Closures & Scope", group: "JavaScript ES6+" },
    {
      id: "js-promises",
      label: "Promises & async/await",
      group: "JavaScript ES6+",
    },
    {
      id: "js-modules",
      label: "ESM Modules & Bundlers",
      group: "JavaScript ES6+",
    },
    {
      id: "js-destructuring",
      label: "Destructuring & Spread/Rest",
      group: "JavaScript ES6+",
    },
    {
      id: "js-eventloop",
      label: "Event Loop & Microtasks",
      group: "JavaScript ES6+",
    },
    { id: "js-proto", label: "Prototypes & Classes", group: "JavaScript ES6+" },
    { id: "react-hooks", label: "useState, useEffect, useRef", group: "React" },
    { id: "react-context", label: "Context API & useReducer", group: "React" },
    { id: "react-router", label: "React Router v6", group: "React" },
    {
      id: "react-perf",
      label: "Performance: memo, useMemo, useCallback",
      group: "React",
    },
    {
      id: "react-patterns",
      label: "Component Patterns & HOCs",
      group: "React",
    },
    {
      id: "ts-types",
      label: "TypeScript Types & Interfaces",
      group: "TypeScript",
    },
    {
      id: "ts-generics",
      label: "Generics & Utility Types",
      group: "TypeScript",
    },
    { id: "ts-react", label: "TypeScript with React", group: "TypeScript" },
    { id: "build-vite", label: "Vite & Build Optimization", group: "Tooling" },
    { id: "build-testing", label: "Testing: Jest & RTL", group: "Tooling" },
  ],
};

export const FRONTEND_QUESTIONS = [
  {
    q: "What is the difference between let, const, and var?",
    diff: "Easy",
    tag: "JS Fundamentals",
  },
  {
    q: "Explain closures in JavaScript with a practical example.",
    diff: "Medium",
    tag: "JS · Closures",
  },
  {
    q: "How does the JavaScript event loop work?",
    diff: "Medium",
    tag: "JS · Async",
  },
  {
    q: "What are React Hooks? Explain useState and useEffect.",
    diff: "Easy",
    tag: "React · Hooks",
  },
  {
    q: "Explain virtual DOM and React reconciliation algorithm.",
    diff: "Medium",
    tag: "React · Internals",
  },
  {
    q: "What is the difference between CSS Flexbox and Grid?",
    diff: "Easy",
    tag: "CSS · Layout",
  },
  {
    q: "Explain CORS and how to handle it in a web app.",
    diff: "Medium",
    tag: "HTTP · Security",
  },
  {
    q: "What are Promises and async/await vs callbacks?",
    diff: "Medium",
    tag: "JS · Async",
  },
  {
    q: "Explain browser rendering pipeline — from HTML to paint.",
    diff: "Hard",
    tag: "Browser · Performance",
  },
  {
    q: "What is debouncing vs throttling? Implement both.",
    diff: "Medium",
    tag: "JS · Performance",
  },
  {
    q: "Explain the difference between == and === in JS.",
    diff: "Easy",
    tag: "JS · Types",
  },
  {
    q: "How does React Context API work? When to use vs Redux?",
    diff: "Medium",
    tag: "React · State",
  },
  {
    q: "What is code splitting and lazy loading in React?",
    diff: "Medium",
    tag: "React · Performance",
  },
  {
    q: "Explain CSS specificity and the cascade.",
    diff: "Easy",
    tag: "CSS · Fundamentals",
  },
];
