import { IChatRoom } from "../../types/common-types";

export interface IChatRoomRepository {

    addMemberToChatRoom(contractId: string, memberId: string,memberType:"Customer"|"Vendor" ,role:"admin"|"member"): Promise<boolean> 
    createChatRoom(contractId:string):Promise<IChatRoom>
    getChatRoomByContractId(contractId:string):Promise<IChatRoom|void>
    getChatRoomById(id:string):Promise<any>
    removeMember(contractId:string, memberId:string):Promise<boolean>
    

}