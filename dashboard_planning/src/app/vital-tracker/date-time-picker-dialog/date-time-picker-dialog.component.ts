import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LiveService } from 'src/app/services/live.service';
// import { MatDatetimepickerToggleChange } from '@mat-datetimepicker/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-time-picker-dialog',
  templateUrl: './date-time-picker-dialog.component.html',
  styleUrls: ['./date-time-picker-dialog.component.css']
})
export class DateTimePickerDialogComponent {
  group: FormGroup;
  selectedDateTime: moment.Moment;
  title = 'datetimepicker';

  constructor(
    private dialogRef: MatDialogRef<DateTimePickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    @Inject(LiveService) private liveService:LiveService, 
    private formBuilder: FormBuilder) {
      this.group = this.formBuilder.group({
        datetimeCtrl: ['', Validators.required]
      });
    }


  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.selectedDateTime = moment(this.group.value.datetimeCtrl);
    const formattedDateTime = this.selectedDateTime.format('MMMM Do YYYY, h:mm:ss a');
    this.liveService.changeDisplayTime(this.data.start, formattedDateTime);
    this.dialogRef.close(formattedDateTime);
  }

  // onDateTimePickerChange(event: MatDatetimepickerToggleChange<any>): void {
  //   if (event.value && event.value.length > 0) {
  //     this.group.patchValue({ datetimeCtrl: moment(event.value[0]) });
  //   } else {
  //     this.group.patchValue({ datetimeCtrl: null });
  //   }
  // }

}