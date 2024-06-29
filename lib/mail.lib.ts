import {transporter} from "../utils/nodemailer";

export const createComplaintMail = async (email: string, complaint: IComplaint) => {
    let complaintType = ""
    switch (complaint.complaintType) {
        case "financial":
            complaintType = "Financial Fraud"
            break;
        case "cyber":
            complaintType = "Cyber Crime"
            break;
        case "online":
            complaintType = "Online Harassment"
            break
        default:
            complaintType = "Other"
    }
    await new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: process.env.GMAIL_USERNAME,
                to: email,
                subject: `You have received a complaint from with complaint ID: ${complaint.complaintID}`,
                // html: render(
                //     ContactEmailHtml({
                //         name: body.name,
                //         email: body.email,
                //         message: body.message,
                //     })
                // ),
                text: `Hello,
You've received a new ${complaintType} 
complaint from ${complaint.name}, 
with the complaint ID ${complaint.complaintID}.`
            },
            function (err, info) {
                if (err) {
                    reject(err)
                } else {
                    resolve({})
                }
            }
        )
    })
}

export const assignComplaintMail = async (email: string, complaint: IComplaint) => {
    let complaintType = ""
    switch (complaint.complaintType) {
        case "financial":
            complaintType = "Financial Fraud"
            break;
        case "cyber":
            complaintType = "Cyber Crime"
            break;
        case "online":
            complaintType = "Online Harassment"
            break
        default:
            complaintType = "Other"
    }
    await new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: process.env.GMAIL_USERNAME,
                to: email,
                subject: `You have been assigned a complaint with complaint ID: ${complaint.complaintID}`,
                // html: render(
                //     ContactEmailHtml({
                //         name: body.name,
                //         email: body.email,
                //         message: body.message,
                //     })
                // ),
                text: `Hello,
You've been assigned a new ${complaintType} 
complaint from ${complaint.name}, 
with the complaint ID ${complaint.complaintID}.`
            },
            function (err, info) {
                if (err) {
                    reject(err)
                } else {
                    resolve({})
                }
            }
        )
    })
}