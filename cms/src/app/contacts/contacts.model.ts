export class Contact {
    public contactId: number;
    public name: string;
    public email: string;
    public phone: number;
    public imageUrl: string;
    public group: null;

    constructor(contactId: number, name: string, email: string, phone: number, imageUrl: string, group: null) {
        this.name = name;
        this.contactId = contactId;
        this.imageUrl = imageUrl;
        this.email = email;
        this.phone = phone;
        this.group = group;

    }
}