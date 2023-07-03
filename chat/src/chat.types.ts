export interface MessageType {
    createdAt: {
        nanoseconds: number;
        seconds: number;
     };
     uid: string;
     text: string;
  }

export interface MessageProps {
    message: MessageType;
  }  