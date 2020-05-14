import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

 documents: Document[] = [
  new Document(1, 'Web Full Stack', 'Learn how to develop modern web applications using the MEAN stack.', 'https://byui.instructure.com/courses/92918', null),
  new Document(2, 'Digital Imaging', 'Learn how take great pictures and edit them in numerous softwares.', 'https://byui.instructure.com/courses/87716', null),
  new Document(3, 'Interaction Design', 'Intro to UX design.', 'https://byui.instructure.com/courses/86676', null),
  new Document(4, 'Vector Graphics', 'Create awesome graphics using Illustrator.', 'https://byui.instructure.com/courses/87734', null),
  new Document(5, 'Capstone', 'A project focused class, perfect for contributing to your WDD portfillo.', 'https://byui.instructure.com/courses/85630', null)
    ];

    @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
