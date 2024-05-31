import {eq} from "drizzle-orm";
import {db} from "../db/db";
import {employeeTable} from "../db/schema";
import {UpdateEmployeeInput} from "../validators/employee.validator";

export class EmployeeService {
    async findEmployeeByEmployeeID(
        employeeID: string
    ): Promise<IEmployee | null | undefined> {
        return db.query.employeeTable.findFirst({
            where: eq(employeeTable.employeeID, employeeID),
        });
    }

    async getAllEmployees(): Promise<IEmployee[]> {
        return db.query.employeeTable.findMany();
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

    async updateEmployee(id: string, input: UpdateEmployeeInput): Promise<void> {
        await db.update(employeeTable).set(input).where(eq(employeeTable.id, id));
    }
}
