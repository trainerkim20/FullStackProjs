import { Injectable, EventEmitter } from '@angular/core';
import {Message} from './message.model'
import {MOCKMESSAGES} from "./MOCKMESSAGES"
import { Contact } from '../contacts/contacts.model';

@Injectable()

export class MessagesService {

  messageChangeEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
   }

   getMessages() {
     return this.messages.slice();
   }

   getMessage(id: string): Message{
     for(const message of this.messages) {
       if(message.id === id) {
         return message;
       }
     }
     return null;
   }

   addMessage (message: Message) {
     this.messages.push(message);
     this.messageChangeEvent.emit(this.messages.slice());
   }
}
