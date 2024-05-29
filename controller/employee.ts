import {Context} from "hono";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {EmployeeService} from "../service/employee.service";

const employeeService = new EmployeeService();

export class EmployeeController {
    async me(ctx: Context) {
        try {
            const employeeID = ctx.get("userID") as string;
            const employee = await employeeService.findEmployeeByID(employeeID);
            return ctx.json({
                user: employee,
                admin: ctx.get("isAdmin") ?? false
            }, StatusCodes.OK);
        } catch (err) {
            return ctx.json({message: ReasonPhrases.INTERNAL_SERVER_ERROR}, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}