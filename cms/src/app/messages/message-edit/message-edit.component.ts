import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService} from '../messages.service'
import { ContactService } from 'src/app/contacts/contact.service';
import {Contact} from '../../contacts/contacts.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: Contact;
  // @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject', {static: false}) subject: ElementRef;
  @ViewChild('msgText', {static: false}) msgText: ElementRef;
  
  constructor(private messService: MessagesService, private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContact('101').subscribe((response) => {
      this.currentSender = response.contact;
    });
  }

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;
    const newMessage = new Message(
      '1',
      subjectValue,
      msgTextValue,
      this.currentSender);
// console.log(message);
// return;
      this.messService.addMessage(newMessage);

      this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
