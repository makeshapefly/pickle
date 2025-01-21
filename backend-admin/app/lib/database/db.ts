import { createKysely } from '@vercel/postgres-kysely';
import { Database } from './types'
 
export const db = createKysely<Database>(
  {
    connectionString: 'postgres://neondb_owner:coEyiTwD9P2O@ep-late-rain-a2bj3tfd-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require'
  }
);
 