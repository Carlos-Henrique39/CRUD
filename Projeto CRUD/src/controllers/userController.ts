import { Request, Response } from 'express';
import { pool } from '../database/db';

export const getUsers = async (_: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  res.json(result.rows[0]);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, idade } = req.body;
  const result = await pool.query(
    'INSERT INTO users (name, email, idade) VALUES ($1, $2, $3) RETURNING *',
    [name, email, idade]
  );
  res.status(201).json(result.rows[0]);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, idade } = req.body;
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2, idade = $3 WHERE id = $4 RETURNING *',
    [name, email, idade, id]
  );
  res.json(result.rows[0]);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  res.status(204).send();
};
