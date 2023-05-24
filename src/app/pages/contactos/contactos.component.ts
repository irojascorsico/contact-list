import { Component } from '@angular/core';
import { Contact } from 'src/app/modules/contact';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent {
  contactos?:Contact[];
  constructor(private contactService:ContactoService)
  {
     contactService.getContactList().subscribe( 
      data => this.contactos = data
    );
  }
}
