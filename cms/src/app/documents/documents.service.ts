import { Injectable, EventEmitter } from '@angular/core';
import { Document } from "./document.model";
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documentListChangedEvent = new Subject<Document[]>();

  documentChangedEvent = new EventEmitter<Document[]>();

  documentSelectedEvent = new EventEmitter<Document>();

  documents: Document[] = [];
  id: string;

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if(pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

   getDocuments() {
     return this.documents.slice();
   }

   getDocument(id: string): Document{
     for(const document of this.documents) {
       if(document.id === id) {
         return document;
       }
     }
     return null;
   }

   
}
