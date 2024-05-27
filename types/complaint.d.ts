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
  createdAt: string;
}
