import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from "./contacts.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS"

@Injectable()
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();

  contactChangedEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

    deleteContact(contact: Contact) {
    if (document === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

   getContacts() {
     return this.contacts.slice();
   }

   getContact(id: string): Contact{
     for(const contact of this.contacts) {
       if(contact.id === id) {
         return contact;
       }
     }
     return null;
   }
}
