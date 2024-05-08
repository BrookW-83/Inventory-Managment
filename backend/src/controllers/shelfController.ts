import { Request, Response } from 'express';
import { Client } from 'pg';

const client = new Client({
  connectionString: 'postgresql://username:password@localhost:5432/database_name',
});

export async function createShelf(req: Request, res: Response) {
  const { id, QR_code, location, warehouse_id, number_of_rows, section } = req.body;

  try {
    await client.query(
      `INSERT INTO Shelf (id, QR_code, location, warehouse_id, number_of_rows, section)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, QR_code, location, warehouse_id, number_of_rows, section]
    );
    res.status(201).json({ message: 'Shelf created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating shelf' });
  }
}

export async function readShelves(req: Request, res: Response) {
  try {
    const result = await client.query('SELECT * FROM Shelf');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reading shelves' });
  }
}

export async function updateShelf(req: Request, res: Response) {
  const { id } = req.params;
  const { QR_code, location, warehouse_id, number_of_rows, section } = req.body;

  try {
    await client.query(
      `UPDATE Shelf
       SET QR_code = $1, location = $2, warehouse_id = $3, number_of_rows = $4, section = $5
       WHERE id = $6`,
      [QR_code, location, warehouse_id, number_of_rows, section, id]
    );
    res.status(200).json({ message: 'Shelf updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating shelf' });
  }
}

export async function deleteShelf(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await client.query('DELETE FROM Shelf WHERE id = $1', [id]);
    res.status(200).json({ message: 'Shelf deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting shelf' });
  }
}