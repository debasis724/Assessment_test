import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IContact } from '../models/IContact';
import { ContactsServiceService } from '../contacts-service.service';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {
  @Output() contactAdded = new EventEmitter<IContact>();
  addContactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactsServiceService
  ) {
    this.addContactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onAddContact() {
    if (this.addContactForm.valid) {
      const newContact: IContact = this.addContactForm.value;

      // Call the service to add the contact
      this.contactService.addContact(newContact).subscribe({
        next: (addedContact) => {
          console.log(addedContact);

          this.contactAdded.emit(addedContact);  // Emit the added contact to notify the parent component
        },
        error: (error: Error) => {
          console.log(error);  // Log the error if the contact could not be added
        }
      });

      this.addContactForm.reset();  // Reset the form after submission
    } else {
      this.addContactForm.markAllAsTouched();  // Mark all fields as touched to show validation messages
    }
  }
}
