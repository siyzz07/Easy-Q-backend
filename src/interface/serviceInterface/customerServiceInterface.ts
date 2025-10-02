import { ICustomer } from "../../types/customerType";

export interface ICustomerInterface {
    addCustomer(data:ICustomer): Promise<boolean>;
    verifyEmail(data:ICustomer):Promise<void>
}
