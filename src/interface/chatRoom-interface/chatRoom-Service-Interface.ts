import { IChatRoom } from "../../types/common-types"


export interface IChatRoomServiceInterface {
    
      createChatRoom(contractId: string,customerId:string):Promise<boolean |void>
      addMemberToChatRoom(contractId: string, memberId: string,memberType:"Customer"|"Vendor" ,role:"admin"|"member"): Promise<boolean> 
      getChatRoomData (contractId:string):Promise<IChatRoom|void>

}