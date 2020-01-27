

export class Message{

    id?:string;
    text?:string;
    date?:string;
    time?:string;
    userId?:number;
    otherId?:number;
    Unread?:boolean;
    IsSearched:boolean=false;
    msgType:MessageType=MessageType.Text
}

export enum MessageType{
    Text,
    Image,
    Pdf,
    Video,
    Sound
}