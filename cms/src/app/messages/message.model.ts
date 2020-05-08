export class Message {
    public id: number;
    public subject: string;
    public msgText: string;
    public sender: string;
    
    constructor(id: number, subject: string, msgText: string, sender: string) {
        this.subject = subject;
        this.id = id;
        this.sender = sender;
        this.msgText = msgText;
        
    }

}