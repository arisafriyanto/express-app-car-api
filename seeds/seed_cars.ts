import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('cars').del();

    await knex('cars').insert([
        {
            plate: 'DBH-3491',
            manufacture: 'Ford',
            model: 'F150',
            rent_per_day: 200000,
            capacity: 2,
            description:
                'Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.',
            transmission: 'Automatic',
            type: 'Sedan',
            year: '2023',
            available_at: new Date().toISOString(),
            available: true,
            options: ['Cruise Control', 'Tinted Glass'],
            specs: ['Brake assist', 'Leather-wrapped shift knob'],
        },
        {
            plate: 'BTW-1960',
            manufacture: 'Honda',
            model: 'Accord',
            rent_per_day: 900000,
            capacity: 4,
            description:
                ' Silver finish interior door handles. 160-amp alternator. Tire pressure monitoring system (TPMS). Cloth covered headliner.',
            transmission: 'Automatic',
            type: 'Sedan',
            year: '2020',
            available_at: new Date().toISOString(),
            available: true,
            options: ['AM/FM Stereo', 'Power Windows'],
            specs: ['Silver finish interior door handles', '160-amp alternator'],
        },
        {
            plate: 'WXB-3984',
            manufacture: 'BMW',
            model: 'X5',
            rent_per_day: 800000,
            capacity: 6,
            description:
                ' Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.',
            transmission: 'Automatic',
            type: 'Convertible',
            year: '2019',
            available_at: new Date().toISOString(),
            available: true,
            options: ['Keyless Entry', 'Power Windows'],
            specs: ['Rear passenger map pockets', 'Electrochromic rearview mirror'],
        },
    ]);
}
