import { Request, Response } from 'express';
import { sql } from '@vercel/postgres';

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
    await sql`
      INSERT INTO items (id, QR_code, item_name, description, supplier, cost, quantity, date, time, shelf_life, shelf_id)
      VALUES (${id}, ${QR_code}, ${item_name}, ${description}, ${supplier}, ${cost}, ${quantity}, ${date}, ${time}, ${shelf_life}, ${shelf_id}) RETURNING * `;
    res.status(201).json({ message: 'Item created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating item' });
  }
}


export async function readItems(req: Request, res: Response) {
  try {
    const items = await sql `SELECT * FROM items`;
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reading items' });
  }
}

export async function readItem(req: Request, res: Response) {
  const {id} = req.params;

  try {
    const item = await sql`SELECT * FROM items  WHERE id = ${id}`
    return res.status(200).json(item);

  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Error geting item'})
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
    await sql`
      UPDATE items
       SET QR_code = $1, item_name = $2, description = $3, supplier = $4, cost = $5, quantity = $6, date = $7, time = $8, shelf_life = $9, shelf_id = $10
       WHERE id = $11,
      (
        ${QR_code},
        ${item_name},
        ${description},
        ${supplier},
        ${cost},
        ${quantity},
        ${date},
        ${time},
        ${shelf_life},
        ${shelf_id},
        ${id},
      )
    `
    res.status(200).json({ message: 'Item updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating item' });
  }
}

export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await sql`DELETE FROM items WHERE id = $1', ${id}`;
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting item' });
  }
}