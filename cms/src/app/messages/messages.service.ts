import { Injectable } from '@angular/core';
import {Message} from './message.model'
import {MOCKMESSAGES} from "./MOCKMESSAGES"
import { Contact } from '../contacts/contacts.model';

@Injectable()

export class MessagesService {

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
}
