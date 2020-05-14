import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styles: [
  ]
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor() { }

  ngOnInit(): void {
  }

}