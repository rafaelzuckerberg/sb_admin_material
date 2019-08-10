import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service'; 
import { SnackbarService } from 'src/app/shared/alerts/snackbar.service';

@Component({
  selector: 'app-create-administrator',
  templateUrl: './create-administrator.component.html',
  styleUrls: ['./create-administrator.component.scss']
})
export class CreateAdministratorComponent implements OnInit {

  form: FormGroup;
  block: boolean = false;
  canEdit: boolean = false;

  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CreateAdministratorComponent>, 
    private snackbar: SnackbarService,    
    private service: UserService) { }

  ngOnInit() {
    this.getForm(); 
    if(this.service.user.id != undefined) { 
      this.canEdit = true;
    }  
  }

  getForm() {
    this.form = this.fb.group({
      nome: [this.service.user.nome || '', Validators.required],
      email: [this.service.user.email || '', Validators.required],
      senha: [''],
    });
  }


  save() { 
    this.block = true;
    if(this.service.user.id != undefined) { 
      this.form.value.id = this.service.user.id;  
      this.service.update(this.form.value)
        .subscribe(res => {
          this.closeDialog();
        })
    } else {
      if(this.form.value.senha == '') {
        this.snackbar.message('Campo senha obrigatório');
        this.block = false;
      } else {
        this.service.create(this.form.value)
        .subscribe(() => {  
          this.closeDialog();
        });
      }
    }    
  }


  closeDialog() {
    this.dialogRef.close(true);
  }

}
