import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'https://deno.land/x/postgresjs@v3.4.3/mod.js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { load } from 'deno/dotenv/mod.ts';

const env = await load();

const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' });

const connection = postgres(env.DATABASE_URL);

export const db = drizzle(connection);
