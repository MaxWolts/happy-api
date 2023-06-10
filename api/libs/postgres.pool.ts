import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "max",
  password: "admin123",
  database: "happy_api",
});
