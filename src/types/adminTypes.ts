

export interface IAdmin {
   _id?:string,
   email:string,
   password:string
}


export interface IServiceType{
   _id?:string;
   serviceName:string;
   description:string;
   isActive:boolean
}