import {Hono} from "hono";
import {ComplaintController} from "../controller/complaint";
import {
    adminOnly,
    authenticate,
    authenticateEmployee,
} from "../middleware/auth.middleware";
import {uploadMiddleware} from "../middleware/upload.middleware";

const complaintRoutes = new Hono();
const complaintController = new ComplaintController();

complaintRoutes.post(
    "/",
    authenticate,
    uploadMiddleware,
    complaintController.createComplaint
);
complaintRoutes.patch("/assign/:id", authenticateEmployee, adminOnly, complaintController.assignEmployee);
complaintRoutes.get(
    "/",
    authenticateEmployee,
    complaintController.getAllComplaints
);
complaintRoutes.get(
    "/employee/:id",
    authenticateEmployee,
    complaintController.getComplaintsByEmployeeID
);
complaintRoutes.get(
    "/user",
    authenticate,
    complaintController.getComplaintsByUserID
);
complaintRoutes.get("/:id", complaintController.getComplaintByID);
complaintRoutes.patch('/status/:id', authenticateEmployee, complaintController.updateComplaintStatus)
complaintRoutes.post(
    "/note",
    authenticateEmployee,
    complaintController.createComplaintNote
);
complaintRoutes.get(
    "/note/:id",
    authenticateEmployee,
    complaintController.getComplaintNotes
);

export default complaintRoutes;
