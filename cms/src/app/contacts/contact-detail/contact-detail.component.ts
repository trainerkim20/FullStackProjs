import { Component, OnInit} from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  // contacts: Contact[] = [
  //   new Contact('1','Bro. Jackson','jacksonk@byui.edu','208-496-3771','https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
  //   new Contact('2','Bro. Barzee','barzeer@byui.edu','208-496-3768','https://web.byui.edu/Directory/Employee/barzeer.jpg', null),
  // ];

 contact: Contact;
 id: string;
  
    constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.contactService.getContact(this.id)
        .subscribe(contactData => {
          this.contact = contactData.contact;
        });

    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contact');
  }

}


