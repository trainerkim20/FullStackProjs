export class Message {
    public id: string;
    public subject: string;
    public msgText: string;
    public sender: string;
    
    constructor(id: string, subject: string, msgText: string, sender: string) {
        this.subject = subject;
        this.id = id;
        this.sender = sender;
        this.msgText = msgText;
        
    }

}