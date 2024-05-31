interface IComplaint {
    id: string;
    user: string;
    name: string;
    email: string | null;
    phoneNo: string;
    alternatePhoneNo?: string | null;
    relativeName: string;
    aadharNo: string;
    complaintType: string;
    attachments: string[];
    policeStation: string;
    offenceTime: string;
    description: string;
    additionalDetails: string;
    suspectDetails: string;
    referencedBy: string;
    employee: string | null;
    complaintStatus: "opened" | "processing" | "closed" | "unsolved" | "solved";
    createdAt: string;
}

interface IComplaintNote {
    id: string;
    complaint: string;
    note: string;
    createdAt: string;
    admin: boolean;
}
