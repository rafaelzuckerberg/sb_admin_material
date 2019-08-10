import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { SnackbarService } from 'src/app/shared/alerts/snackbar.service';
import { DialogComponent } from 'src/app/layout/dialog/dialog.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'email', 'cnpj', 'status', 'created_at', 'icon'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isChecked: boolean = false;

  constructor(private service: UserService, public dialog: MatDialog, private snackbar: SnackbarService) {  
  }

  ngOnInit() {
    this.getUsers();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  


  getUsers() {
    this.service.getCustomers()
      .subscribe((users: User[]) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }


  openModal(user) {
    this.service.user = Object.assign({}, user);
    this.service.customer = Object.assign({}, user);
    let dialogRef = this.dialog.open(CreateCustomerComponent, {
      height: '600px',
      width: '1200px',
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if(res) {          
          this.snackbar.message('Cliente cadastrado com sucesso!');
          this.getUsers();
        }
      })
  }


  onChange(e, user) { 
    (!e.checked) ? this.snackbar.message('Cliente foi desabilitado') : this.snackbar.message('Cliente foi abilitado');
    let data = { id: user.id, status: (!e.checked) ? 0 : 1 }; 
    this.service.updateCustomer(data)
      .subscribe((res) => { 
        this.getUsers();
      })
  }


  delete(user: User) {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '250px',
      width: '300px',
      disableClose: true
    });
    dialogRef.afterClosed()
      .subscribe(i => { 
        if(i == 1) {
          this.service.deleteCustomer(user.id)
            .subscribe(res => { 
              this.getUsers();
              this.snackbar.message('Cliente deletado com sucesso!');
            })          
        }
      })
  }


}
