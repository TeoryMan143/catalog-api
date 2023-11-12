// @deno-types="npm:@types/express@4.17.15"
import express from 'express';
import { db } from './db/config.ts';
import { users as usersTable } from './db/schema.ts';
import { env } from './core/utils.ts';

const app = express();
app.disable('X-Powered-By');

const PORT = env.PORT || 8080;

app.get('/', (_, res) => {
  res.json('Star');
});

app.get('/hello', (_, res) => {
  res.json({ hello: 'Hello World' });
});

app.get('/users', async (_, res) => {
  const users = await db.select().from(usersTable);
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Listening at: \n http://localhost:${PORT}/`);
});
