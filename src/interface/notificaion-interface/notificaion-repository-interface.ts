import { INotification } from "../../types/common-types";


export interface INotificationRepository{

        getUserNotification(userId:string):Promise<INotification[]>
        addNewNotification(data:Partial<INotification>):Promise<boolean>
        updateNotification (userid:string,notificaionId?:string):Promise<boolean>
    
}