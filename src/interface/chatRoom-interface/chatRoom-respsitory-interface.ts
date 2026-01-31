import { IChatRoom } from "../../types/common-types";

export interface IChatRoomRepositoryInterface {

    addMemberToChatRoom(contractId: string, memberId: string,memberType:"Customer"|"Vendor" ,role:"admin"|"member"): Promise<boolean> 
    createChatRoom(contractId:string):Promise<IChatRoom>
    getChatRoomByContractId(contractId:string):Promise<IChatRoom|void>
    

}