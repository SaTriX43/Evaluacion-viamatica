import pkg from 'pg';
const { Pool } = pkg;

// Importar dotenv para cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config(); 

// Configura tus credenciales usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST || 'localhost', 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT || 5432, 
});


export default pool;