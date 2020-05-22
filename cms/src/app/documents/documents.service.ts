import { Injectable, EventEmitter } from '@angular/core';
import { Document } from "./document.model"
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS"

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documentSelectedEvent = new EventEmitter<Document>();

  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   getDocuments() {
     return this.documents.slice();
   }

   getContact(id: string): Document{
     for(const document of this.documents) {
       if(document.id === id) {
         return document;
       }
     }
     return null;
   }
}
