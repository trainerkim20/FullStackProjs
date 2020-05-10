import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(1,'Bro. Jackson','jacksonk@byui.edu','208-496-3771','https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    new Contact(2,'Bro. Barzee','barzeer@byui.edu','208-496-3768','https://web.byui.edu/Directory/Employee/barzeer.jpg', null),
  ];

  @Input() contact: Contact;
  
    constructor() { }

  ngOnInit(): void {
  }

}


