import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { BookComponent } from 'src/app/src/components/book/book.component';
import { DialogService } from 'src/app/src/services/dialog.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.less']
})
export class HomesComponent implements OnInit {

  homes$: any;

  constructor(private dataService: DataService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.homes$ = this.dataService.getHomes$();
  }

  openDialog(home: any){
    this.dialogService.open(BookComponent, {
      width: '500px',
      data: {home}
    });
  }
}
