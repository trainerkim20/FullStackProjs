import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[],term: string): any {
    
    let filteredContacts: Contact[] = [];

    if (term && term.length) {
      filteredContacts = contacts.filter(
        (contact: Contact) =>
        contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    return filteredContacts.length > 0 ? filteredContacts : contacts;
  }
  
}
