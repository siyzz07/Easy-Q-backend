import { INotification } from "../../types/common-types";


export interface INotificationRepositoryInterface{

        addNewNotification(data:Partial<INotification>):Promise<boolean>
    
}