import {CreateUserInput} from "../validators/user.validator";
import {db} from "../db/db";
import {userTable} from "../db/schema/user";
import {eq} from "drizzle-orm";
import {CreateEmployeeInput} from "../validators/employee.validator";
import {employeeTable} from "../db/schema";

export class AuthService {
    async createUser(
        input: CreateUserInput,
        hash: string,
        salt: string
    ): Promise<void> {
        await db.insert(userTable).values({...input, hash, salt});
    }

    async createEmployee(
        input: CreateEmployeeInput,
        profileImage: string | null,
        hash: string,
        salt: string
    ): Promise<void> {
        await db
            .insert(employeeTable)
            .values({...input, profileImage, hash, salt, createdAt: new Date().toISOString()});
    }

    async changeEmployeePassword(id: string, hash: string, salt: string): Promise<void> {
        await db.update(employeeTable).set({hash, salt}).where(eq(employeeTable.id, id));
    }
}
