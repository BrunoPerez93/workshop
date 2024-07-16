import { Pool } from "pg";

const db = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

export { db };
