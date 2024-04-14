import "dotenv/config";
import * as schema from "../database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";


const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("seeding db ...🟠");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg"
            },
            {
                id: 2,
                title: "French",
                imageSrc: "/fr.svg"
            },
            {
                id: 3,
                title: "Italian",
                imageSrc: "/it.svg"
            },
            {
                id: 4,
                title: "Croatian",
                imageSrc: "/hr.svg"
            },
            {
                id: 5,
                title: "Japenese",
                imageSrc: "/jp.svg"
            },
        ]);
        console.log("seeding finished!🟢")
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed db!🔴")
    }
}

main();
