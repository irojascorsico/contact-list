import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject, tap} from 'rxjs';
import { Contact } from '../modules/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  url: String ="http://localhost:3000";

  constructor(private http:HttpClient) { }

  getContactList(): Observable<Contact[]>
  {
    return this.http.get<Contact[]>(this.url + "/contacts/");
  }

  addContact(contact:Contact):Observable<Contact>
  {
    return this.http.post<Contact>(this.url+"/contacts/", contact);
  }

  updateContact(contact:Contact): Observable<Contact>
  {
    return this.http.put<Contact>(this.url+"/contacts/"+contact.id, contact); 
  }

  deleteContact(id:string): Observable<any>
  {
    return this.http.delete(this.url+"/contacts/"+ id);
  }

}
