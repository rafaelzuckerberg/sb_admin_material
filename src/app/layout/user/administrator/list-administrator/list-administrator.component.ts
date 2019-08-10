import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { CreateAdministratorComponent } from '../create-administrator/create-administrator.component';
import { SnackbarService } from 'src/app/shared/alerts/snackbar.service'; 
import { DialogComponent } from 'src/app/layout/dialog/dialog.component';


@Component({
  selector: 'app-list-administrator',
  templateUrl: './list-administrator.component.html',
  styleUrls: ['./list-administrator.component.scss']
})
export class ListAdministratorComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'email', 'status', 'created_at', 'icon'];
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
    this.service.getUsers()
      .subscribe((users: User[]) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }


  openModal(user) {
    this.service.user = Object.assign({}, user);
    let dialogRef = this.dialog.open(CreateAdministratorComponent, {
      height: '350px',
      width: '500px',
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if(res) {          
          this.snackbar.message('Administrador cadastrado com sucesso!');
          this.getUsers();
        }
      })
  }


  onChange(e, user) { 
    (!e.checked) ? this.snackbar.message('Usuário foi desabilitado') : this.snackbar.message('Usuário foi abilitado');
    let data = { id: user.id, status: (!e.checked) ? 0 : 1 }; 
    this.service.update(data)
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
          this.service.delete(user.id)
            .subscribe(res => {
              console.log(res);
              this.getUsers();
              this.snackbar.message('Administrador deletado com sucesso!');
            })          
        }
      })
  }

}

