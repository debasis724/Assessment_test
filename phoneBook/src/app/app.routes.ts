import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';


export const routes: Routes = [
    {
        path:'',
        component:ContactListComponent,
        title:'Contact List'
    },
    {
        path:'add',
        component:AddContactComponent,
        title:"Add a Contact"
    }
];
