export const DATABASE_DOMAIN = {
  id: "database",
  label: "Database",
  sub: "SQL, MongoDB, Redis",
  gradient: "gradient-pink",
  textGrad: "text-grad-pink",
  color: "#ff6584",
  shadow: "rgba(255,101,132,0.35)",
  icon: "Database",
  progress: 0,
  topics: ["SQL Joins", "Indexing", "MongoDB"],
  topicColors: ["text-pink-500", "text-teal-500", "text-green-500"],
  allTopics: [
    {
      id: "sql-select",
      label: "SELECT, WHERE & Filtering",
      group: "SQL Fundamentals",
    },
    {
      id: "sql-joins",
      label: "JOINs: INNER, LEFT, RIGHT, FULL",
      group: "SQL Fundamentals",
    },
    {
      id: "sql-agg",
      label: "GROUP BY, HAVING & Aggregations",
      group: "SQL Fundamentals",
    },
    {
      id: "sql-subqueries",
      label: "Subqueries & CTEs",
      group: "SQL Fundamentals",
    },
    {
      id: "sql-dml",
      label: "INSERT, UPDATE, DELETE",
      group: "SQL Fundamentals",
    },
    {
      id: "sql-indexes",
      label: "Indexes & Query Optimization",
      group: "SQL Advanced",
    },
    {
      id: "sql-transactions",
      label: "Transactions & ACID Properties",
      group: "SQL Advanced",
    },
    {
      id: "pg-relations",
      label: "Relations & Foreign Keys",
      group: "PostgreSQL",
    },
    {
      id: "pg-views",
      label: "Views & Materialized Views",
      group: "PostgreSQL",
    },
    {
      id: "pg-stored-proc",
      label: "Stored Procedures & Triggers",
      group: "PostgreSQL",
    },
    { id: "pg-json", label: "JSONB & Full-Text Search", group: "PostgreSQL" },
    { id: "mongo-crud", label: "MongoDB CRUD Operations", group: "MongoDB" },
    { id: "mongo-agg", label: "Aggregation Pipeline", group: "MongoDB" },
    {
      id: "mongo-indexes",
      label: "Indexes & Performance Tuning",
      group: "MongoDB",
    },
    {
      id: "mongo-schema",
      label: "Schema Design & Embedding vs Refs",
      group: "MongoDB",
    },
    {
      id: "mongo-atlas",
      label: "MongoDB Atlas & Cloud Deployment",
      group: "MongoDB",
    },
    { id: "redis-ds", label: "Redis Data Structures", group: "Redis" },
    {
      id: "redis-cache",
      label: "Caching Patterns (Write-through)",
      group: "Redis",
    },
    { id: "redis-pubsub", label: "Pub/Sub & Streams", group: "Redis" },
    {
      id: "db-design",
      label: "Normalization (1NF–3NF)",
      group: "Database Design",
    },
    {
      id: "db-er",
      label: "ER Diagrams & Data Modeling",
      group: "Database Design",
    },
    { id: "orm-mongoose", label: "Mongoose ODM", group: "ORM / ODM" },
    { id: "orm-prisma", label: "Prisma ORM", group: "ORM / ODM" },
    {
      id: "db-replication",
      label: "Replication, Sharding & Backup",
      group: "Scaling",
    },
  ],
};

export const DATABASE_QUESTIONS = [
  {
    q: "What is the difference between an index and a primary key?",
    diff: "Easy",
    tag: "SQL · Indexes",
  },
  {
    q: "Explain JOIN types with examples (INNER, LEFT, RIGHT, FULL).",
    diff: "Medium",
    tag: "SQL · Joins",
  },
  {
    q: "What is database normalization? Explain 1NF, 2NF, 3NF.",
    diff: "Medium",
    tag: "DB Design",
  },
  {
    q: "When would you choose MongoDB over PostgreSQL?",
    diff: "Medium",
    tag: "NoSQL vs SQL",
  },
  {
    q: "Explain the MongoDB aggregation pipeline.",
    diff: "Medium",
    tag: "MongoDB",
  },
  {
    q: "What is Redis and what are its common use cases?",
    diff: "Easy",
    tag: "Redis",
  },
  {
    q: "How does database replication work? Types?",
    diff: "Hard",
    tag: "Scaling",
  },
  {
    q: "What is an N+1 query problem and how to fix it?",
    diff: "Medium",
    tag: "ORM · Performance",
  },
  {
    q: "Explain database sharding and its trade-offs.",
    diff: "Hard",
    tag: "Scaling",
  },
  {
    q: "What is a transaction and when should you use one?",
    diff: "Medium",
    tag: "SQL · Transactions",
  },
];
