import "dotenv/config"
import {migrate} from 'drizzle-orm/postgres-js/migrator';
import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from "postgres";

const queryClient = postgres(process.env.POSTGRES_URL);
const db = drizzle(queryClient);

async function migrateDB() {
    console.log(process.cwd())
    await migrate(db, {
        migrationsFolder: `${process.cwd()}/migrations`,
    })
    await queryClient.end()
}

migrateDB().then(() => console.log('Migration complete'))