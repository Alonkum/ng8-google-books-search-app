


  import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Book } from 'src/app/models/book.model';

export interface DialogData {
  book: Book;
  favorite: boolean;
}

@Component({
  selector: 'book-dialog',
  templateUrl: 'book-dialog.component.html',
  styleUrls: ['book-dialog.component.scss']
})
export class BookDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToFavorites(){
    this.data.favorite = true;
  }

}
