import { Contact } from '../contacts/contacts.model';

export class Message {
    public id: string;
    public subject: string;
    public msgText: string;
    public sender: Contact;
    
    constructor(id: string, subject: string, msgText: string, sender: Contact) {
        this.subject = subject;
        this.id = id;
        this.sender = sender;
        this.msgText = msgText;
        
    }

}