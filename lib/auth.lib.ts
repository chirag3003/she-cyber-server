import crypto from "node:crypto";
import * as jwt from "hono/jwt";

//creates hash and salts for users
export const getPasswordKeys = (password: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 512, "sha512")
        .toString("hex");

    return {salt, hash};
};

//validates passwords with users hash and salt
export const validatePassword = (
    password: string,
    hash: string,
    salt: string
): boolean => {
    try {
        const h = crypto
            .pbkdf2Sync(password, salt, 10000, 512, "sha512")
            .toString("hex");
        return hash === h;
    } catch {
        return false;
    }
};

//generates JWT for users
export const generateJWT = async (data: IJWTData): Promise<string> => {
    //5 Days
    const expiry = Math.floor(Date.now() / 1000) + 60 * 5 * 24 * 60;
    return await jwt.sign({
        ...data,
        exp: expiry,
    }, process.env.JWT_SECRET!);
};

//verifies JWT for users
export const verifyJWT = async (token: string): Promise<IJWTData> => {
    const data = await jwt.verify(token, process.env.JWT_SECRET!);
    return data as IJWTData;
};
//generates JWT for users
export const generateEmployeeJWT = async (
    data: IEmployeeJWTData
): Promise<string> => {
    //5 Days
    const expiry = Math.floor(Date.now() / 1000) + 60 * 5 * 24 * 60;
    return await jwt.sign({
        ...data,
        exp: expiry,
    }, process.env.JWT_EMPLOYEE_SECRET!);
};

//verifies JWT for users
export const verifyEmployeeJWT = async (
    token: string
): Promise<IEmployeeJWTData> => {
    const data = await jwt.verify(token, process.env.JWT_EMPLOYEE_SECRET!);
    return data as IJWTData;
};
