import { pool } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, password, rol } = req.body;
    try {
      const newUser = await pool.query(
        "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
        [name, password, rol]
      );
      res.status(200).json(newUser.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
