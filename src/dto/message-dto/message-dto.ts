export interface IPopulatedMessage {
    _id: string;
    chatRoomId: string;
    text: string;
    createdAt: string;
    attachments?: { url: string; type: string }[];
    senderRole: "Vendor" | "Customer";
    sender?: {
        _id?: string;
        name?: string;
        shopName?: string;
        ProfileImage?: string;
    };
}

export class MessageResponseDTO {
    _id: string;
    chatRoomId: string;
    sender: {
        _id: string;
        name: string;
        profileImage?: string;
        role: "Vendor" | "Customer";
    };
    text: string;
    time: string;
    attachments: unknown[];

    constructor(data: IPopulatedMessage) {

        this._id = data._id;
        this.chatRoomId = data.chatRoomId;
        this.text = data.text;
        this.time = data.createdAt;
        this.attachments = data.attachments || [];

        const sender = data.sender || {};
        const isVendor = data.senderRole === "Vendor";

        this.sender = {
            _id: sender._id as string,
            name: (isVendor ? (sender.shopName || sender.name) : sender.name) || "",
            profileImage: isVendor ? sender.ProfileImage : undefined,
            role: data.senderRole
        };
    }
}
