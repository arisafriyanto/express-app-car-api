import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('cars', (builder) => {
        builder.increments('id').primary().notNullable();
        builder.string('plate').notNullable();
        builder.string('manufacture').notNullable();
        builder.string('model').notNullable();
        builder.integer('rent_per_day').notNullable().defaultTo(0);
        builder.integer('capacity').notNullable().defaultTo(0);
        builder.string('description').nullable();
        builder.string('transmission').notNullable();
        builder.string('type').notNullable();
        builder.string('year').notNullable();
        builder.specificType('options', 'text ARRAY').defaultTo(null).nullable();
        builder.specificType('specs', 'text ARRAY').defaultTo(null).nullable();
        builder.datetime('available_at').defaultTo(knex.fn.now());
        builder.integer('created_by').references('id').inTable('users');
        builder.integer('updated_by').references('id').inTable('users');
        builder.dateTime('created_at').defaultTo(knex.fn.now());
        builder.dateTime('updated_at').defaultTo(knex.fn.now());
        builder.json('image').defaultTo(null).nullable();
        builder.boolean('available').notNullable().defaultTo(true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists('cars');
}
