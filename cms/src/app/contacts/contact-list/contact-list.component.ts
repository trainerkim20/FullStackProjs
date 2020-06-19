import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from "rxjs";



@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {


// contacts: Contact[] = [
//   new Contact('1','Bro. Jackson','jacksonk@byui.edu','208-496-3771','https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
//   new Contact('2','Bro. Barzee','barzeer@byui.edu','208-496-3768','https://web.byui.edu/Directory/Employee/barzeer.jpg', null),
// ];

contacts: Contact[] = [];
private subscription: Subscription;
term: string;

// @Output() selectedContactEvent = new EventEmitter<Contact>();
  
constructor(private clService: ContactService) { }

  ngOnInit() {
    this.subscription = this.clService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
   this.clService.getContacts();
  }

  onSelected(contact: Contact) {
    this.clService.contactSelectedEvent.emit(contact);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }

  // onSelected(contact: Contact) {
  //   this.selectedContactEvent.emit(contact);
  // }

}
