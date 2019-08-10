import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SnackbarService } from 'src/app/shared/alerts/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  form: FormGroup;
  block: boolean = false;
  canEdit: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CreateCustomerComponent>, 
    private snackbar: SnackbarService,    
    private service: UserService) { }

  ngOnInit() {
    this.getForm();
    console.log(this.service.customer) 
    if(this.service.user.id != undefined) { 
      this.canEdit = true;
    }
  }


  getForm() {
    this.form = this.fb.group({
      nome: [this.service.user.nome || '', Validators.required],
      email: [this.service.user.nome || '', Validators.required],
      senha: [''],
      
      cnpj: [this.service.customer.cnpj || ''],
      responsavel_nome: [this.service.customer.responsavel_nome || ''],
      responsavel_telefone: [this.service.customer.responsavel_telefone || ''],
      responsavel_celular: [this.service.customer.responsavel_celular || ''],
      responsavel_email: [this.service.customer.responsavel_email || ''],
      responsavel2_nome: [this.service.customer.responsavel2_nome || ''],
      responsavel2_telefone: [this.service.customer.responsavel2_telefone || ''],
      responsavel2_celular: [this.service.customer.responsavel2_celular || ''],
      responsavel2_email: [this.service.customer.responsavel2_email || ''], 
   
      valor_cliente_parecer: [this.service.customer.valor_cliente_parecer || ''],
      valor_fornecedor_parecer: [this.service.customer.valor_fornecedor_parecer || ''],
      valor_cliente_negociacao: [this.service.customer.valor_cliente_negociacao || ''],
      valor_proposto_negociacao: [this.service.customer.valor_proposto_negociacao || ''],
      valor_negociado_negociacao: [this.service.customer.valor_negociado_negociacao || ''],
      valor_negociadoC_negociacao: [this.service.customer.valor_negociadoC_negociacao || ''],

      // fk_id_pais?: string;
      // fk_id_estado?: string;
      // fk_id_regiao?: string;
      // fk_id_cidade?: string;
      // fk_id_bairro?: string;
      // fk_id_logradouro?: string;
      complemento_endereco: [this.service.customer.complemento_endereco || ''],
      numero: [this.service.customer.numero || ''],
    });
  }


  save() { 
    this.block = true;
    if(this.service.user.id != undefined) { 
      this.form.value.id = this.service.user.id;  
      this.service.updateCustomer(this.form.value)
        .subscribe(() => {
          this.closeDialog();
        })
    } else {
      if(this.form.value.senha == '') {
        this.snackbar.message('Campo senha obrigatório');
        this.block = false;
      } else {
        this.service.createCustomer(this.form.value)
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


