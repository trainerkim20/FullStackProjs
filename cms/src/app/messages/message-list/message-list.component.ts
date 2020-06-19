import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import {MessagesService} from '../messages.service'

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  
  messages: Message[] = [];
  //   new Message('1','Subject 1','Message Text 1','Kim'),
  //   new Message('2','Subject 2','Message Text 2','Kim'),
  //   new Message('3','Subject 3','Message Text 3','Kim')
  // ];

    constructor(private messService: MessagesService) { }

    ngOnInit() {
      this.messService.getMessages();
      this.messService.messageChangeEvent.subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
    }

  // onAddMessage(message: Message) {
  //   this.messages.push(message);
  // }

}
