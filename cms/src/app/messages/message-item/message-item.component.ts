import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import {ContactService} from '../../contacts/contact.service';
import {Contact} from '../../contacts/contacts.model'

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  messageSender: string;
  // canEdit: boolean = false;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContact(this.message.sender.id)
    .subscribe(contactData => {
      this.messageSender = contactData.contact.name;
    });
    // let contact: Contact = this.contactService.getContact(this.message.sender);
    //   this.messageSender = contact.name;
  }

}
