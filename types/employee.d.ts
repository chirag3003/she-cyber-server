interface IEmployee {
    id: string;
    name: string;
    email: string;
    phoneNo: string;
    alternatePhoneNo: string;
    aadharNo: string;
    employeeID: string;
    profileImage?: string | null
    createdAt: string;
    hash: string;
    salt: string;
}
