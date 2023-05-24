import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
