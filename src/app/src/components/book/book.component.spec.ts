import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { spyOnClass } from 'jasmine-es6-spies';

import { BookComponent } from './book.component';
import { of } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData: any;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService: jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let notificationService: jasmine.SpyObj<MatSnackBar>;

  const el = (selector: any) => fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BookComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        { provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef) },
        { provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dataService = TestBed.get(DataService);
    dialogService = TestBed.get(MatDialogRef);
    notificationService = TestBed.get(MatSnackBar);
    dialogData = TestBed.get(MAT_DIALOG_DATA);
    component = fixture.componentInstance;

    const homes = require('../../../../assets/homes.json');
    dialogData.home = homes[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    expect(el('[data-test="title"').textContent).toContain('Book Home 1');
  });

  it('should show price', () => {
    expect(el('[data-test="price"').textContent).toContain('$125 per night');
  });

  it('should show checkin date', () => {
    expect(el('[data-test="check-in"')).toBeTruthy();
  });

  it('should show checkout date', () => {
    expect(el('[data-test="check-out"')).toBeTruthy();
  });

  it('should show total', () => {
    // expect(el('[data-test="total"')).toBeTruthy();

    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(el('[data-test="total"').textContent).toContain('Total: $375');
  });

  it('should show double dash (--) for total when the values are empty/invalid', () => {
    
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(el('[data-test="total"').textContent).toContain('Total: 0');
  });

  it('should book home after clicking the book button', () => {

    dataService.bookHome$.and.returnValue(of(null));

    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    el('[data-test="book-btn"] button').click();

    expect(dataService.bookHome$).toHaveBeenCalled();
  });

  it('should close the dialog and show notification after clicking Book button', () => {
    // expect(el('[data-test="total"')).toBeTruthy();

    dataService.bookHome$.and.returnValue(of(null));

    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    el('[data-test="book-btn"] button').click();

    expect(dialogService.close).toHaveBeenCalled();
    expect(notificationService.open).toHaveBeenCalled();
  });
});
