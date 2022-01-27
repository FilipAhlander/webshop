import { query } from '../config/db.js';

export const getCategories = async (req, res) => {
  const { rows } = await query('select * from category');
  if (rows.length === 0) {
    res.status(404).send();
    return;
  }
  res.status(200).json(rows);
}

export const getCategory = async (req, res) => {
  const { id } = req.params;
  const { rows } = await query(
    `select product_id, category_id, c.name as categoryName, p.name as productName from category c
    join product_category pc on c.id = pc.category_id
    join product p on p.id = pc.product_id
    where c.id = $1`
    , [id]);
  if (rows.length === 0) {
    res.status(404).send();
    return;
  }
  res.status(200).send(rows);
}

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const { rows } = await query(`INSERT INTO category(name) VALUES($1) RETURNING *;`, [name]);
  res.status(200).json(rows);
}

export const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { rows } = await query(`UPDATE category SET name = $1 WHERE id = $2 RETURNING *;`, [name, id]);
  if (rows.length === 0) {
    res.status(404).send();
    return;
  }
  res.status(200).json(rows);
}

export const removeCategory = async (req, res) => {
  const { id }= req.params;
  const { rowCount } = await query(`DELETE FROM category where id = $1 RETURNING *;`, [id]);
  if (rowCount === 0) {
    res.status(404).send();
    return;
  }
  res.status(200).json(rowCount);
}