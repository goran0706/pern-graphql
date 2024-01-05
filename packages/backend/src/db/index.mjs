// /src/db/index.js
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "graphql",
  port: 5432,
});

export default pool;
