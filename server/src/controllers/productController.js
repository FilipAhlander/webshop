import { query } from '../config/db.js';

export const getAllProducts = async (req, res) => {
  const { rows } = await query(`SELECT * FROM product`);
  return res.status(200).json(rows);
}

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const { rows } = await query(
    `select p.name as productName, c.name as categoryName, p.id as product_id, category_id from product p
    left join product_category pc on p.id = pc.product_id
    left join category c on c.id = pc.category_id
    where p.id = $1`, [id]
  );
  console.log(rows);
  if (rows.length === 0) {
    res.status(404).send();
    return;
  }
  res.status(200).json({
    rows
  });
}

export const createProduct = async (req, res) => {
  const { name, categories } = req.body;
  console.log(name);
  console.log(categories);
  try {
    await query('BEGIN');
    let { rows } = await query(`INSERT INTO product (name) values ($1) RETURNING id`, [name]);
    if (rows.length === 0) throw new error;
    const { id } = rows[0];
    for (let i = 0; i<categories.length; i++) {
      await query(`INSERT INTO product_category (product_id, category_id) VALUES ($1, $2)`, [id, categories[i]]);
    }
  } catch (err) {
    await query('ROLLBACK');
    return res.status(500).send();
  } finally {
    query(`COMMIT`);
  }
  
  res.status(200).send();
}

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name: newName, categories: categoryToDb } = req.body;

  const { rows } = await query(
    `SELECT p.id, p.name, pc.category_id from product p
    left join product_category pc on pc.product_id = p.id
    where p.id = $1`, [id]);

  const oldName = rows[0].name;
  const categoryFromDb = rows.map((row) => row.category_id);

  categoryToDb.sort((a, b) => a - b);
  categoryFromDb.sort((a, b) => a - b);

  const addToDb = categoryToDb
    .filter((n) => !categoryFromDb.some((n1) => n1 === n));
  const removeFromDb = categoryFromDb
    .filter((n) => !categoryToDb.some((n1) => n1 === n));

  if (addToDb.length === 0 &&
    removeFromDb.length === 0 &&
    newName === oldName) {
      res.status(204).send();
      return;
  }
  try {
    await query('BEGIN');
    if (newName !== oldName) {
      await query(`UPDATE product set name = $1 where id = $2`, [newName, id]);
    }
    if (removeFromDb.length > 0 && !!removeFromDb[0]) {
      for (const categoryId of removeFromDb) {
        await query(`DELETE FROM product_category 
          where product_id = $1 AND category_id = $2`,
          [id, categoryId]);
      }
    }
    if (addToDb.length > 0) {
      for (const categoryId of addToDb) {
        await query(`INSERT INTO product_category (product_id, category_id)
          VALUES ($1, $2)`,
          [id, categoryId]);
      }
    }
    await query(`COMMIT`)
  } catch (error) {
    await query(`ROLLBACK`);
    console.log(error);
    return res.status(500).send();
  }

  // update product set name = 'playstation' where id = 1 returning name
  // await query('BEGIN');


  res.status(200).send();
}

export const removeProduct = async (req, res) => {

}