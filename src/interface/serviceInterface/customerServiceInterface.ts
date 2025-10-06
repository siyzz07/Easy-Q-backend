import { ICustomer } from "../../types/customerType";

export interface ICustomerInterface {
    addCustomer(data:ICustomer): Promise<boolean>;
    verifyEmail(data:ICustomer):Promise<void>
    customerLoginService (data:{email:string;password:string}):Promise<{ accessToken: string; refreshToken: string}|void>
    updateToken (token:string):Promise<string>
}
