import client, { query } from '../config/db.js';

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const { rows } = await query(
    `select p.name as productName, c.name as categoryName, product_id, category_id from product p
    join product_category pc on p.id = pc.product_id
    join category c on c.id = pc.category_id
    where p.id = $1`, [id]
  );
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
    throw (err);
  } finally {
    query(`COMMIT`);
  }
  
  res.status(200).send();
}

export const editProduct = async (req, res) => {

}

export const removeProduct = async (req, res) => {

}