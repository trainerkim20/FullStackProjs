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
    this.maxDocumentId = this.getMaxId();
   }

   maxDocumentId: number;

   addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;

    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);

    const documentListClone = this.documents.slice();

    this.documentListChangedEvent.next(documentListClone);
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
    const documentListClone = this.documents.slice();

    this.documentListChangedEvent.next(documentListClone);
    // this.documentChangedEvent.emit(this.documents.slice());
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


getMaxId(): number {

  let maxId = 0;

  for(const document of this.documents) {
    let currentId = parseInt(document.id)
    if (currentId > maxId) {
      maxId = currentId;
    }
  }
  return maxId;
  } 
  
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);

    if(pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    this.documents[pos] = newDocument;

    const documentListClone = this.documents.slice();

    this.documentListChangedEvent.next(documentListClone);

  }



}


  


