export interface MessageType {
    createdAt: {
        nanoseconds: number;
        seconds: number;
     };
     uid: string;
     text: string;
     imageUrl: string;
  }

export interface MessageProps {
    message: MessageType;
  }  