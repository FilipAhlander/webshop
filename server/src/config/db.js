import pg from 'pg';

const { Pool, Client } = pg;
const pool = new Pool();
const client = new Client();



export const query = (text, params, callback) => pool.query(text, params, callback);
export default client;