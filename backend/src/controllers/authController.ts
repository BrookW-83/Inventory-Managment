import { Request, Response } from 'express';
import { Client } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const client = new Client({
  connectionString: 'postgresql://username:password@localhost:5432/database_name',
});

export async function signUp(req: Request, res: Response) {
  try {
    await client.connect();

    const { name, email, password } = req.body;

    const existingUser = await client.query<{ id: string }>('SELECT id FROM Users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      await client.end();
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query('INSERT INTO Users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);

    const user = await client.query<{ id: string }>('SELECT id FROM Users WHERE email = $1', [email]);

    const token = jwt.sign({ id: user.rows[0].id }, 'your_secret_key', { expiresIn: '1h' });

    await client.end();
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error signing up' });
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    await client.connect();

    const { email, password } = req.body;

    const user = await client.query<{ id: string; password: string }>(
      'SELECT id, password FROM Users WHERE email = $1',
      [email]
    );

    if (user.rows.length === 0) {
      await client.end();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      await client.end();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.rows[0].id }, 'your_secret_key', { expiresIn: '1h' });

    await client.end();
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error signing in' });
  }
}