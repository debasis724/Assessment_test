import { Component } from '@angular/core';
import { ContactsServiceService } from '../contacts-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IContact } from '../models/IContact';
import { ContactListItemComponent } from '../contact-list-item/contact-list-item.component';
import { AddContactComponent } from "../add-contact/add-contact.component";

@Component({
  selector: 'app-contact-list',
  imports: [FormsModule, ContactListItemComponent, CommonModule, AddContactComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  contacts!: IContact[];
  error:Error | null = null;

  fetchContacts(){
    // this.loading=true;
    this.contactService.getContacts().subscribe({
      next: (contacts: IContact[]) => {
        console.log(contacts);
        this.contacts = contacts;
        // this.loading = false;
      },
      error: (error:Error) => {
        console.log(error);
        // this.error = error;
        // this.loading = false;
      },
    });
  }

  onDeleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.fetchContacts();
    });
  }

  onUpdateContact(contact: any) {
    this.contactService.updateContact(contact.id, contact).subscribe(() => {
      this.fetchContacts();
    });
  }

  constructor(private contactService: ContactsServiceService) {
    this.fetchContacts();
  }

  onNewContactAdded(newContact: IContact) {
    this.contacts.push(newContact); // Add the new contact to the list
  }
}
