interface IUser {
  id: string;
  name?: string | null;
  email?: string | null;
  phoneNo: string;
  hash: string;
  salt: string;
}
