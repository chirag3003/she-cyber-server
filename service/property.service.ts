import {CreatePropertyInput} from "../validators/property.validator";
import {db} from "../db/db";
import {propertyTable} from "../db/schema";
import {eq} from "drizzle-orm";

export class PropertyService {
    async createProperty(input: CreatePropertyInput, userID: string) {
        await db.insert(propertyTable).values({
            createdAt: new Date().toISOString(),
            user: userID,
            ...input,
        })
    }

    async getPropertyByID(id: string): Promise<IProperty | undefined > {
        return db.query.propertyTable.findFirst({where: eq(propertyTable.id, id)})
    }

    async updatePropertyByID(id: string, input: CreatePropertyInput): Promise<void> {
        await db.update(propertyTable).set({
            ...input,
        }).where(eq(propertyTable.id, id))
    }
}