import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from "./contacts.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class ContactService {

  contactListChangedEvent = new Subject<Contact[]>();

  contactSelectedEvent = new EventEmitter<Contact>();

  // contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];

  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

   addContact(newContact: Contact) {
     if (!newContact) {
       return;
     }
     this.maxContactId++;

     newContact.id = this.maxContactId.toString();

     this.contacts.push(newContact);

    //  const contactListClone = this.contacts.slice();

    //  this.contactListChangedEvent.next(contactListClone);
    this.storeContacts();
   }

    deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    // const contactListClone = this.contacts.slice();

    //  this.contactListChangedEvent.next(contactListClone);
    // this.contactChangedEvent.emit(this.contacts.slice());
    this. storeContacts();
  }

   getContacts() {
    //  return this.contacts.slice();
    this.http.get('https://rkjcms-54e6b.firebaseio.com/contacts.json')
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;

        this.maxContactId = this.getMaxId();

        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }
    )
   }

   getContact(id: string): Contact{
     for(const contact of this.contacts) {
       if(contact.id === id) {
         return contact;
       }
     }
     return null;
   }

   getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      let currentId = parseInt(contact.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
   }

   updateContact(originalContact: Contact, newContact: Contact) {
     if (!originalContact || !newContact) {
       return;
     }

     const pos = this.contacts.indexOf(originalContact);

     if(pos < 0) {
       return;
     }

     newContact.id = originalContact.id;

     this.contacts[pos] = newContact;

    //  const contactListClone = this.contacts.slice();

    //  this.contactListChangedEvent.next(contactListClone);
    this.storeContacts();

   }

   storeContacts() {
    let contacts = JSON.stringify(this.contacts);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('https://rkjcms-54e6b.firebaseio.com/contacts.json', this.contacts, {headers: headers})
    .subscribe(
      () => {
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    );
  }
}
