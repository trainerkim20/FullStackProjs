import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service'

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
// contacts: Contact[] = [
//   new Contact('1','Bro. Jackson','jacksonk@byui.edu','208-496-3771','https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
//   new Contact('2','Bro. Barzee','barzeer@byui.edu','208-496-3768','https://web.byui.edu/Directory/Employee/barzeer.jpg', null),
// ];

contacts: Contact[] = [];

// @Output() selectedContactEvent = new EventEmitter<Contact>();
  
constructor(private clService: ContactService) { }

  ngOnInit() {
    this.clService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
    this.contacts = this.clService.getContacts();
  }

  onSelected(contact: Contact) {
    this.clService.contactSelectedEvent.emit(contact);
  }

  // onSelected(contact: Contact) {
  //   this.selectedContactEvent.emit(contact);
  // }

}
