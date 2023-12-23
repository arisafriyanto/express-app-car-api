import knex, { Knex } from 'knex';
import 'dotenv/config';

class Database {
    private static instance: Database;
    private _db: Knex;

    constructor() {
        this._db = knex({
            client: 'pg',
            connection: {
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                user: process.env.DB_USER,
                port: Number(process.env.DB_PORT),
                password: process.env.DB_PASSWORD,
            },
            searchPath: ['public'],
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    get db(): Knex {
        return this._db;
    }
}

export default Database.getInstance().db;
