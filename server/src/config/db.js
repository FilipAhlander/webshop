import pg from 'pg';

const { Pool } = pg;
const pool = new Pool();



export const query = async (text, params, callback) => pool.query(text, params, callback);