import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {ComplaintService} from "../service/complaint.service";
import {UserService} from "../service/user.service";
import {
    complaintStatusValidator,
    createComplaintNoteValidator,
    createComplaintValidator,
} from "../validators/complaint.validator";
import {Context} from "hono";
import {ZodError} from "zod";
import {EmployeeService} from "../service/employee.service";

const complaintService = new ComplaintService();
const userService = new UserService();
const employeeService = new EmployeeService()

export class ComplaintController {
    async createComplaint(ctx: Context): Promise<Response> {
        try {
            const userID = ctx.get("userID") as string;
            const body = await ctx.req.parseBody();
            body.attachments = ctx.get("files");
            const input = createComplaintValidator.parse(body);
            await complaintService.createComplaint(input, userID);
            return ctx.json(
                {message: "Complaint created successfully"},
                StatusCodes.CREATED
            );
        } catch (e) {
            console.log(e)
            if (e instanceof ZodError) {
                return ctx.json({message: e.errors}, StatusCodes.BAD_REQUEST);
            }
            return ctx.json(
                {message: ReasonPhrases.INTERNAL_SERVER_ERROR},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async assignEmployee(ctx: Context): Promise<Response> {
        try {
            const complaintID = ctx.req.param("id");
            const body = await ctx.req.json();
            const employeeID = body.employee;
            const employee = await employeeService.findEmployeeByID(employeeID);
            if (!employee) {
                return ctx.json(
                    {message: "Employee not found"},
                    StatusCodes.NOT_FOUND
                );
            }
            await complaintService.assignEmployee(complaintID, employeeID);
            return ctx.json(
                {message: "Employee assigned successfully"},
                StatusCodes.OK
            );
        } catch (e) {
            return ctx.json(
                {message: ReasonPhrases.INTERNAL_SERVER_ERROR},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getComplaintsByUserID(ctx: Context): Promise<Response> {
        try {
            const userID = ctx.get("userID") as string;
            const complaints = await complaintService.getComplaintsByUserID(userID);
            return ctx.json(complaints, StatusCodes.OK);
        } catch (e) {
            console.error(e)
            return ctx.json(
                {message: ReasonPhrases.INTERNAL_SERVER_ERROR},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getComplaintsByEmployeeID(ctx: Context): Promise<Response> {
        try {
            const isAdmin = ctx.get("isAdmin") as boolean;
            const userID = ctx.get("userID") as string;
            if (!isAdmin && ctx.req.param("id") !== userID) {
                return ctx.json(
                    {message: "You are not authorized to view this data"},
                    StatusCodes.UNAUTHORIZED
                );
            }
            const employeeID = ctx.req.param("id");
            const complaints = await complaintService.getComplaintsByEmployeeID(employeeID);
            return ctx.json(complaints, StatusCodes.OK);
        } catch (e) {
            return ctx.json(
                {message: ReasonPhrases.INTERNAL_SERVER_ERROR},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllComplaints(ctx: Context): Promise<Response> {
        try {
            const isAdmin = ctx.get("isAdmin") as boolean;
            const complaints = await (isAdmin ? complaintService.getAllComplaints() : complaintService.getComplaintsByEmployeeID(ctx.get("userID")));
            return ctx.json(complaints, StatusCodes.OK);
        } catch (e) {
            return ctx.json(
                {message: ReasonPhrases.INTERNAL_SERVER_ERROR},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getComplaintByID(ctx: Context): Promise<Response> {
        try {
            const complaintID = ctx.req.param("id");
            const complaint = await complaintService.getComplaintByID(complaintID);
            if (!complaint) {
                return ctx.json(
                    {message: "Complaint not found"},
                    StatusCodes.NOT_FOUND
                );
            }
            return ctx.json({data: complaint}, StatusCodes.OK);
        } catch (e) {
            return ctx.json(
                {message: ReasonPhrases.INTERNAL_SERVER_ERROR},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateComplaintStatus(ctx: Context): Promise<Response> {
        try {
            const complaintID = ctx.req.param("id");
            const body = await ctx.req.json();
            const status = complaintStatusValidator.parse(body.status)
            const userID = ctx.get("userID") as string;
            const isAdmin = ctx.get("isAdmin") as boolean;
            const complaint = await complaintService.getComplaintByID(complaintID);
            if (!complaint) {
                return ctx.json(
                    {message: "Complaint not found"},
                    StatusCodes.NOT_FOUND
                );
            }
            if (!isAdmin && complaint.employee !== userID) {
                return ctx.json({message: "You are not authorized to update this complaint"}, StatusCodes.UNAUTHORIZED)
            }
            await complaintService.updateComplaintStatus(complaintID, status);
            return ctx.json(
                {message: "Complaint status updated successfully"},
                StatusCodes.OK
            );
        } catch (e) {
            return ctx.json(
                {message: ReasonPhrases.INTERNAL_SERVER_ERROR},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createComplaintNote(ctx: Context): Promise<Response> {
        try {
            const input = createComplaintNoteValidator.parse(await ctx.req.json());
            const complaint = await complaintService.getComplaintByID(input.complaint);
            if (!complaint) {
                return ctx.json(
                    {message: "Complaint not found"},
                    StatusCodes.NOT_FOUND
                );
            }
            await complaintService.createComplaintNote(input, ctx.get("isAdmin"));
            return ctx.json(
                {message: "Note added successfully"},
                StatusCodes.CREATED
            );
        } catch (e) {
            return ctx.json(
                {message: ReasonPhrases.INTERNAL_SERVER_ERROR},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getComplaintNotes(ctx: Context): Promise<Response> {
        try {
            const complaintID = ctx.req.param("id");
            const notes = await complaintService.getComplaintNotes(complaintID);
            return ctx.json(notes, StatusCodes.OK);
        } catch (e) {
            return ctx.json(
                {message: ReasonPhrases.INTERNAL_SERVER_ERROR},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
