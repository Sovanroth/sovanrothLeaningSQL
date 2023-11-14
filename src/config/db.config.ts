import mysql, { ConnectionConfig } from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: ConnectionConfig = {
    host: process.env.DATABASE_HOST as string,
    port: parseInt(process.env.DATABASE_PORT as string, 10),
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
};

const db = mysql.createConnection(dbConfig);

export = db;
