interface IEmployee {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  alternatePhoneNo?: string | null;
  aadharNo: string;
  createdAt: string;
  hash: string;
  salt: string;
}
