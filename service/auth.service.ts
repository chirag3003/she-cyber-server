import { CreateUserInput } from "../validators/user.validator";
import { db } from "../db/db";
import { userTable } from "../db/schema/user";
import { eq } from "drizzle-orm";

export class AuthService {
  async createUser(input: CreateUserInput, hash: string, salt: string): Promise<void> {
    await db.insert(userTable).values({ ...input, hash, salt });
  }
}
