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

  // maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
   }

   sortAndSend() {
    this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.contactListChangedEvent.next(this.contacts.slice());
   }

   addContact(newContact: Contact) {
     if (!newContact) {
       return;
     }
    //  this.maxContactId++;
    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{message: string, contact: Contact}>('http://localhost:3000/contacts/', 
    newContact, {headers: headers})
    .subscribe(
      (responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });

    //  newContact.id = this.maxContactId.toString();

    //  this.contacts.push(newContact);

    //  const contactListClone = this.contacts.slice();

    //  this.contactListChangedEvent.next(contactListClone);
    // this.storeContacts();
   }

    deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if(pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
    .subscribe(
      (response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      }
    );

    // this.contacts.splice(pos, 1);
    // const contactListClone = this.contacts.slice();

    //  this.contactListChangedEvent.next(contactListClone);
    // this.contactChangedEvent.emit(this.contacts.slice());
    // this. storeContacts();
  }

   getContacts() {
    //  return this.contacts.slice();
    this.http.get<{message: string, contacts: Contact[]}>('http://localhost:3000/contacts/')
    .subscribe(
      (responseData) => {
        this.contacts = responseData.contacts;
        this.sortAndSend();

        // this.maxContactId = this.getMaxId();

        
      },
      (error: any) => {
        console.log(error);
      }
    )
   }

   getContact(id: string) {
    return this.http.get<{message: string, contact: Contact[]}>('http://localhost:3000/contacts/' + id);
    //  .subscribe(
    //    (responseData) => {
    //      this.contacts = responseData.contacts;
    //      this.sortAndSend();
    //    }
    //  );
    //  for(const contact of this.contacts) {
    //    if(contact.id === id) {
    //      return contact;
    //    }
    //  }
    //  return null;
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

     const pos = this.contacts.findIndex(c => c.id === originalContact.id);

     if(pos < 0) {
       return;
     }

     newContact.id = originalContact.id;

     const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //  const strContact = JSON.stringify(newContact);

     this.http.put('http://localhost:3000/contacts/' + originalContact.id
     , newContact, {headers: headers})
     .subscribe(
      (response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      }
       );

    //  this.contacts[pos] = newContact;

    //  const contactListClone = this.contacts.slice();

    //  this.contactListChangedEvent.next(contactListClone);
    // this.storeContacts();

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
