import { INotification } from "../../types/common-types";


export interface INotificationRepositoryInterface{

        getUserNotification(userId:string):Promise<INotification[]>
        addNewNotification(data:Partial<INotification>):Promise<boolean>
    
}