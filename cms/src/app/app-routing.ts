import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent} from './messages/messages.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsEditComponent } from './documents/documents-edit/documents-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

const app_Routes: Routes = [
    { path: '', redirectTo: '/documents', pathMatch: 'full'},
    { path: 'documents', component: DocumentsComponent, children: [
        { path: 'new', component: DocumentsEditComponent},
        { path: ':id', component: DocumentDetailComponent},
        { path: ':id/edit', component: DocumentsEditComponent},
    ] },
    { path: 'messages', component: MessagesComponent },
    { path: 'contact', component: ContactsComponent, children: [
        { path: 'new', component: ContactEditComponent},
        { path: ':id', component: ContactDetailComponent},
        { path: ':id/edit', component:ContactEditComponent}
] }
];

@NgModule({
    imports: [RouterModule.forRoot(app_Routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}