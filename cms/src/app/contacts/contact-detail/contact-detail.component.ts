import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(1,'Bro. Jackson','jacksonk@byui.edu',208-496-3771,'https://web.byui.edu/Directory/Employee/jacksonk.jpg',) ];
  
    constructor() { }

  ngOnInit(): void {
  }

}


