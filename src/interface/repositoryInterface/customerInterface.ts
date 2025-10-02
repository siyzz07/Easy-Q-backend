



export interface ICustomerRepo{
    addNewCustomer(data:{name:string,email:string,phone:string,password:string,isVerified:boolean,isActive:boolean}) :Promise <boolean>,
    checkCustomerExist(email:string) :Promise<boolean>
}