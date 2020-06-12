import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model'

@Component({
  selector: 'cms-documents-edit',
  templateUrl: './documents-edit.component.html',
  styleUrls: ['./documents-edit.component.css']
})
export class DocumentsEditComponent implements OnInit {

  // @ViewChild('f', {static: false}) ngForm: NgForm;

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor(private documentService: DocumentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.params.subscribe(
     (params: Params) => {
      this.id = params['id'];

       if (this.id = null) {
         this.editMode = false;
         return;
       }

       this.originalDocument = this.documentService.getDocument(this.id);

       if (this.originalDocument = null) {
          return;
       }

       this.editMode = true;
       this.document = JSON.parse(JSON.stringify(this.originalDocument));
     }

    )
  }

  onSubmit(ngform: NgForm) {
    console.log(ngform);
    const value = ngform.value;
    const newDocument = new Document(this.id, value.name, value.documentUrl, value.description, null);

    if(this.editMode = true) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  

}
