interface IComplaint {
  id: string;
  user: string;
  name: string;
  email: string | null;
  phoneNo: string;
  alternatePhoneNo?: string | null;
  relativeName: string | null;
  aadharNo: string;
  complaintType: string;
  policeStation: string;
  offenceTime: string;
  description: string;
  additionalDetails: string | null;
  suspectDetails: string | null;
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
