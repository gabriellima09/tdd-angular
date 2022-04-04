import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less']
})
export class BookComponent implements OnInit {

  checkIn: any;
  checkOut: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dataService: DataService,
  private dialogRef: MatDialogRef<BookComponent>,
  private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  calculateTotal(checkIn: any, checkOut: any){
    const dateFormat = 'MM-DD-YY';
    const mCheckIn = moment(checkIn, dateFormat);
    const mCheckOut = moment(checkOut, dateFormat);

    const diffInDays = mCheckOut.diff(mCheckIn, 'days');

    const result = this.data.home.price * diffInDays;

    if(result > 0)
      return result

    return 0;
  }

  bookHome(){
    this.dataService.bookHome$().subscribe(()=>{
      this.dialogRef.close();
      this.snackBar.open('Home booked!', '', {
        duration: 2000
      });
    });
  }
}
