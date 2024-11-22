import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IContact } from '../models/IContact';

@Component({
  selector: 'app-contact-list-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-list-item.component.html',
  styleUrl: './contact-list-item.component.scss'
})
export class ContactListItemComponent {
  @Input() contact!: IContact;
  @Output() contactDeleted = new EventEmitter<number>();  // Emit the contact ID when deleted
  @Output() contactUpdated = new EventEmitter<IContact>();  // Emit the updated contact when saved

  isHovered: boolean = false;

  onHover(state: boolean) {
    this.isHovered = state;
  }

  // Other existing methods

  isEditing = false;
  updatedContact!: IContact;

  onEdit() {
    // Set up the form for editing, with current contact values
    this.isEditing = true;
    this.updatedContact = { 
      ...this.contact,
      name: this.contact.name, 
      phone: this.contact.phone 
    };
  }

  onSave() {
    // Ensure only the name and phone number are updated, and not the ID
    if (this.updatedContact.name && this.updatedContact.phone) {
      const updatedContact: IContact = {
        ...this.contact,  // Keep the original contact details, including id
        name: this.updatedContact.name,
        phone: this.updatedContact.phone
      };
      this.contactUpdated.emit(updatedContact);
      this.isEditing = false;
    }
  }

  onCancel() {
    // Revert the editing mode
    this.isEditing = false;
  }

  onDelete() {
    // Emit the ID of the contact to delete
    this.contactDeleted.emit(this.contact.id);
  }
}
