import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { employeeTable } from "../db/schema";

export class EmployeeService {
  async findEmployeeByEmployeeID(
    employeeID: string
  ): Promise<IEmployee | null | undefined> {
    return db.query.employeeTable.findFirst({
      where: eq(employeeTable.employeeID, employeeID),
    });
  }
  async getEmployeeByEmail(
    email: string
  ): Promise<IEmployee | null | undefined> {
    return db.query.employeeTable.findFirst({
      where: eq(employeeTable.email, email),
    });
  }
  async getEmployeeByPhone(
    phoneNo: string
  ): Promise<IEmployee | null | undefined> {
    return db.query.employeeTable.findFirst({
      where: eq(employeeTable.phoneNo, phoneNo),
    });
  }
  async findEmployeeByID(id: string): Promise<IEmployee | null | undefined> {
    return db.query.employeeTable.findFirst({
      where: eq(employeeTable.id, id),
    });
  }
}
