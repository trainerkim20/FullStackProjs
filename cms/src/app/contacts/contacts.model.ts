import { Injectable } from '@angular/core';

@Injectable()
export class Contact {
    // id: string;
    // public name: string;
    // public email: string;
    // public phone: string;
    // public imageUrl: string;
    // public group: Contact[];

    constructor(public id: string,public name: string,public email: string,public phone: string,public imageUrl: string,public group: Contact[]) {
        this.name = name;
        this.id = id;
        this.imageUrl = imageUrl;
        this.email = email;
        this.phone = phone;
        this.group = group;

    }
}