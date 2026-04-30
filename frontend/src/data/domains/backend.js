export const BACKEND_DOMAIN = {
  id: "backend",
  label: "Backend",
  sub: "Node.js, Express, APIs",
  gradient: "gradient-teal",
  textGrad: "text-grad-teal",
  color: "#38b2ac",
  shadow: "rgba(56,178,172,0.35)",
  icon: "Server",
  progress: 0,
  topics: ["REST APIs", "GraphQL", "Docker"],
  topicColors: ["text-teal-500", "text-purple-500", "text-red-400"],
  allTopics: [
    {
      id: "node-eventloop",
      label: "Node.js Event Loop & Non-blocking I/O",
      group: "Node.js",
    },
    { id: "node-modules", label: "CommonJS & ESM Modules", group: "Node.js" },
    {
      id: "node-fs",
      label: "File System, Streams & Buffers",
      group: "Node.js",
    },
    {
      id: "node-events",
      label: "EventEmitter & Custom Events",
      group: "Node.js",
    },
    {
      id: "node-env",
      label: "Environment Variables & Config",
      group: "Node.js",
    },
    {
      id: "express-routing",
      label: "Express Routing & Controllers",
      group: "Express.js",
    },
    {
      id: "express-mw",
      label: "Middleware Chain & Error Handling",
      group: "Express.js",
    },
    {
      id: "express-cors",
      label: "CORS, Helmet & Security Headers",
      group: "Express.js",
    },
    {
      id: "express-valid",
      label: "Request Validation (Joi / zod)",
      group: "Express.js",
    },
    {
      id: "rest-design",
      label: "REST API Design Principles",
      group: "REST APIs",
    },
    {
      id: "rest-methods",
      label: "HTTP Methods & Status Codes",
      group: "REST APIs",
    },
    {
      id: "rest-versioning",
      label: "API Versioning & Documentation (Swagger)",
      group: "REST APIs",
    },
    {
      id: "auth-jwt",
      label: "JWT Authentication & Refresh Tokens",
      group: "Authentication",
    },
    {
      id: "auth-oauth",
      label: "OAuth 2.0 & OpenID Connect",
      group: "Authentication",
    },
    {
      id: "auth-sessions",
      label: "Session-based Auth & Cookies",
      group: "Authentication",
    },
    {
      id: "auth-bcrypt",
      label: "Password Hashing & bcrypt",
      group: "Authentication",
    },
    { id: "gql-schema", label: "GraphQL Schema & Resolvers", group: "GraphQL" },
    {
      id: "gql-ops",
      label: "Queries, Mutations & Subscriptions",
      group: "GraphQL",
    },
    { id: "ws-socketio", label: "WebSockets & Socket.io", group: "Real-time" },
    { id: "test-jest", label: "Unit Testing with Jest", group: "Testing" },
    {
      id: "test-supertest",
      label: "Integration Testing with Supertest",
      group: "Testing",
    },
    {
      id: "sec-rate-limit",
      label: "Rate Limiting & Brute Force Protection",
      group: "Security",
    },
    { id: "perf-redis", label: "Redis Caching Layer", group: "Performance" },
    {
      id: "perf-cluster",
      label: "Clustering & Worker Threads",
      group: "Performance",
    },
  ],
};

export const BACKEND_QUESTIONS = [
  {
    q: "What is the difference between REST and GraphQL?",
    diff: "Medium",
    tag: "APIs",
  },
  {
    q: "Explain JWT and how token-based authentication works.",
    diff: "Medium",
    tag: "Auth · Security",
  },
  {
    q: "What is middleware in Express.js? Give examples.",
    diff: "Easy",
    tag: "Node.js · Express",
  },
  {
    q: "Explain OAuth 2.0 flow with a real-world example.",
    diff: "Hard",
    tag: "Auth · Protocols",
  },
  {
    q: "What is database connection pooling and why use it?",
    diff: "Medium",
    tag: "Database · Performance",
  },
  {
    q: "How do you handle errors in an async Express app?",
    diff: "Medium",
    tag: "Node.js · Error Handling",
  },
  {
    q: "Explain HTTP status codes — 2xx, 3xx, 4xx, 5xx.",
    diff: "Easy",
    tag: "HTTP · Basics",
  },
  {
    q: "What is the difference between SQL and NoSQL databases?",
    diff: "Easy",
    tag: "Database · Fundamentals",
  },
  {
    q: "How does Node.js handle concurrency with a single thread?",
    diff: "Hard",
    tag: "Node.js · Internals",
  },
  {
    q: "What is idempotency in REST APIs and why does it matter?",
    diff: "Medium",
    tag: "REST · Design",
  },
  {
    q: "How would you implement pagination in a REST API?",
    diff: "Medium",
    tag: "REST · Best Practices",
  },
  {
    q: "Explain ACID properties with real-world examples.",
    diff: "Medium",
    tag: "Database · Fundamentals",
  },
];
