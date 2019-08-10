import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  message(message: string) {
    this.snackbar.open(message, 'Fechar', {
      duration: 3000
    });
  }

}
