import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    const SALT = bcrypt.genSaltSync(5);
    const password = bcrypt.hashSync('superfranky', SALT);
    await knex('users').del();

    await knex('users').insert([
        {
            username: 'superfranky',
            email: 'superfranky@rental-cars.com',
            password,
            role: 'superadmin',
        },
    ]);
}
