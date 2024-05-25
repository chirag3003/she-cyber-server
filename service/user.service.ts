import {db} from "../db/db";
import {userTable} from "../db/schema";
import {eq} from "drizzle-orm";

export class UserService {
    async findUserByID(id: string): Promise<IUser | undefined> {
        return db.query.userTable.findFirst({
            where: eq(userTable.id, id)
        })
    }

    async findUserByEmail(email: string): Promise<IUser | undefined> {
        return db.query.userTable.findFirst({
            where: eq(userTable.email, email)
        })
    }

    async findUserByPhoneNo(phoneNo: string): Promise<IUser | undefined> {
        return db.query.userTable.findFirst({
            where: eq(userTable.phoneNo, phoneNo)
        })
    }
}