import { Request, Response } from 'express';
import { Client } from 'pg';

const client = new Client({
  connectionString: 'postgresql://username:password@localhost:5432/database_name',
});

export async function createItem(req: Request, res: Response) {
  const {
    id,
    QR_code,
    item_name,
    description,
    supplier,
    cost,
    quantity,
    date,
    time,
    shelf_life,
    shelf_id,
  } = req.body;

  try {
    await client.query(
      `INSERT INTO Items (id, QR_code, item_name, description, supplier, cost, quantity, date, time, shelf_life, shelf_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        id,
        QR_code,
        item_name,
        description,
        supplier,
        cost,
        quantity,
        date,
        time,
        shelf_life,
        shelf_id,
      ]
    );
    res.status(201).json({ message: 'Item created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating item' });
  }
}

export async function readItems(req: Request, res: Response) {
  try {
    const result = await client.query('SELECT * FROM Items');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reading items' });
  }
}

export async function updateItem(req: Request, res: Response) {
  const { id } = req.params;
  const {
    QR_code,
    item_name,
    description,
    supplier,
    cost,
    quantity,
    date,
    time,
    shelf_life,
    shelf_id,
  } = req.body;

  try {
    await client.query(
      `UPDATE Items
       SET QR_code = $1, item_name = $2, description = $3, supplier = $4, cost = $5, quantity = $6, date = $7, time = $8, shelf_life = $9, shelf_id = $10
       WHERE id = $11`,
      [
        QR_code,
        item_name,
        description,
        supplier,
        cost,
        quantity,
        date,
        time,
        shelf_life,
        shelf_id,
        id,
      ]
    );
    res.status(200).json({ message: 'Item updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating item' });
  }
}

export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await client.query('DELETE FROM Items WHERE id = $1', [id]);
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting item' });
  }
}