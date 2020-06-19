import { Injectable, EventEmitter } from '@angular/core';
import {Message} from './message.model';
import {MOCKMESSAGES} from "./MOCKMESSAGES";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http"
import { Contact } from '../contacts/contacts.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  maxMessageId: number;

  messageChangeEvent = new Subject<Message[]>();

  messages: Message[] = [];

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    
   }

   getMaxId(): number {

    let maxId = 0;
  
    for(const message of this.messages) {
      let currentId = parseInt(message.id)
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
    }

   getMessages() {
    //  return this.messages.slice();
    this.http.get('https://rkjcms-54e6b.firebaseio.com/messages.json')
    .subscribe(
      //success function
      (messages: Message[]) => {
        this.messages = messages;

        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.next(this.messages.slice());
      }
    )
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
    //  this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
   }

   storeMessages() {
     let messages = JSON.stringify(this.messages);

     const headers = new HttpHeaders({'Content-Type': 'application/json'});

     this.http.put('https://rkjcms-54e6b.firebaseio.com/messages.json', messages, {headers:headers})
     .subscribe(
       () => {
         this.messageChangeEvent.next(this.messages.slice());
       }
     )
   }
}
