import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent} from './messages/messages.component';
import { ContactsComponent } from './contacts/contacts.component'

const app_Routes: Routes = [
    { path: '', redirectTo: '/documents', pathMatch: 'full'},
    { path: 'documents', component: DocumentsComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'contact', component: ContactsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(app_Routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}