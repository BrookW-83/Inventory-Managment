import { Request, Response } from 'express';
import { sql } from '@vercel/postgres';



export async function createShelf(req: Request, res: Response) {
  const { id, QR_code, location, warehouse_id, number_of_rows, section } = req.body;

  try {
    await sql`
      INSERT INTO shelf (id, QR_code, location, warehouse_id, number_of_rows, section)
      VALUES (${id}, ${QR_code}, ${location}, ${warehouse_id}, ${number_of_rows}, ${section})`;
    res.status(201).json({ message: 'Shelf created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating shelf' });
  }
}

export async function readShelves(req: Request, res: Response) {
  try {
    const shelves = await sql`SELECT * FROM shelf`;
    res.status(200).json(shelves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reading shelves' });
  }
}

export async function readShelve(req: Request, res: Response) {
  const {id} = req.params;

  try {
    const shelves = await sql`SELECT * FROM shelf WHERE id = ${id}`;
    res.status(200).json(shelves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reading shelves' });
  }
}


export async function updateShelf(req: Request, res: Response) {
  const { id } = req.params;
  const { QR_code, location, warehouse_id, number_of_rows, section } = req.body;

  try {
    await sql`
      UPDATE shelf
      SET QR_code = ${QR_code}, location = ${location}, warehouse_id = ${warehouse_id}, number_of_rows = ${number_of_rows}, section = ${section}
      WHERE id = ${id}`;
    res.status(200).json({ message: 'Shelf updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating shelf' });
  }
}

export async function deleteShelf(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await sql`DELETE FROM shelf WHERE id = ${id}`;
    res.status(200).json({ message: 'Shelf deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting shelf' });
  }
}
