import { Component } from '@angular/core';
import { Contact } from 'src/app/modules/contact';
import { ContactoService } from 'src/app/services/contacto.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})

export class ContactosComponent {
  contactList?:Contact[];
 
  contactForm = this.formBuilder.group({
    id: [''],
    company: ['', [ Validators.required , Validators.minLength(8)]] ,
    contact: ['' , Validators.required],
    country: ['', Validators.required]
    
  });

  constructor(private contactService:ContactoService, private formBuilder: FormBuilder)
  {
     contactService.getContactList().subscribe( 
      data => this.contactList = data
    );
  }

  get company ()
  {
    return this.contactForm.get("company");
    
  }

  get contact ()
  {
    return this.contactForm.get("contact");
    
  }

  get country ()
  {
    return this.contactForm.get("country");
  }

  get id()
  {
    return this.contactForm.get("id");
  }

  saveContact()
  {
    if (this.contactForm.valid)
    {
      if ( this.contactForm.controls.id.value!='')
      {
        this.contactService.updateContact(this.contactForm.value as Contact).subscribe(
          {
            next: (data) => { 
              console.log(data);
              this.contactList?.splice(this.contactList.findIndex((obj)=> obj.id===data.id ),1)
              this.contactList?.push(data as Contact);
              document.getElementById("closeContactModal")?.click();
            },
            error: (error) => {
              console.error(error);
            },
            complete(){
              console.log("COMPLETE UPDATE"); 
            }     
          }
        );
      }
      else{
        this.contactService.addContact(this.contactForm.value as unknown as Contact).subscribe(
          {
            next: (data) => { 
              console.log(data);
              this.contactList?.push(data as Contact);
              document.getElementById("closeContactModal")?.click();
            },
            error: (error) => {
              console.error(error);
            },
            complete(){
              console.log("COMPLETE CREATE"); 
            }     
          }
        );
      }
    }
  }

  populateForm(contact:Contact)
  {
    this.id?.setValue(contact.id);
    this.company?.setValue( contact.company);
    this.contact?.setValue(contact.contact);
    this.country?.setValue( contact.country);
  }

  deleteContact(id:string)
  {
    if(confirm("Está seguro de elimnar el registro nro " + id))
    {
      this.contactService.deleteContact(id).subscribe(
      {
        next : (data) => { 
          this.contactList?.splice(this.contactList.findIndex((obj)=> obj.id===data.id)-1,1)
          alert("El registro se ha eliminado exitosamente")} 
      }
     )
    }
  }
}
