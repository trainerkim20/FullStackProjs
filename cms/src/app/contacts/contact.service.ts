import { Injectable } from '@angular/core';
import { Contact } from "./contacts.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS"

@Injectable()
export class ContactService {

  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts() {
     return this.contacts.slice();
   }

  //  getContact(id: string): Contact{
    //  Look at recording
  //  }
}
