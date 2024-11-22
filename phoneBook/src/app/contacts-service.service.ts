import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IContact } from './models/IContact';

@Injectable({
  providedIn: 'root'
})
export class ContactsServiceService {
  private apiUrl = 'http://localhost:4000/contacts';

  constructor(private http:HttpClient) { }
  getContacts() {
    return this.http.get<IContact[]>(this.apiUrl);
  }

  addContact(contact: { name: string; phone: string }): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }

  updateContact(id: number, contact: { name: string; phone: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
