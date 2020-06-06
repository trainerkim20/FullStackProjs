import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

//  documents: Document[] = [
//   new Document(1, 'Web Full Stack', 'Learn how to develop modern web applications using the MEAN stack.', 'https://byui.instructure.com/courses/92918', null),
//   new Document(2, 'Digital Imaging', 'Learn how take great pictures and edit them in numerous softwares.', 'https://byui.instructure.com/courses/87716', null),
//   new Document(3, 'Interaction Design', 'Intro to UX design.', 'https://byui.instructure.com/courses/86676', null),
//   new Document(4, 'Vector Graphics', 'Create awesome graphics using Illustrator.', 'https://byui.instructure.com/courses/87734', null),
//   new Document(5, 'Capstone', 'A project focused class, perfect for contributing to your WDD portfillo.', 'https://byui.instructure.com/courses/85630', null)
//     ];

documents: Document[] = [];
private subscription: Subscription

    // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(private docService: DocumentsService) { }

  ngOnInit() {
    this.subscription = this.docService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );

    this.documents = this.docService.getDocuments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // onSelectedDocument(document: Document) {
  //   this.docService.documentSelectedEvent.emit(document);
  // }


}
