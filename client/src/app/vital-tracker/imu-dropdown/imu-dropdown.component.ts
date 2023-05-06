import { Component, Inject, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { LiveService } from 'src/app/services/live.service';

@Component({
  selector: 'app-imu-dropdown',
  templateUrl: './imu-dropdown.component.html',
  styleUrls: ['./imu-dropdown.component.css']
})
export class ImuDropdownComponent {

  @Input() elements: string[];
  @Input() displayText: string;
  // 0 for data (['Acceleration', 'Orientation','Magnetic','Gyro','Linear','Gravity']) and 1 for axis (['X-Axis', 'Y-Axis', 'Z-Axis'])
  @Input() function: number;


  selectedElem: string[];

  constructor(@Inject(LiveService) private liveService:LiveService) {
  }

  ngOnInit() {
    if (this.function == 0)
      this.selectedElem = ['Acceleration'];
    else 
      this.selectedElem = ['X-Axis'];
  }

  onSelectionChange(event: MatSelectChange) {
    console.log('Selected values:', event.value);
    this.liveService.changeIMUSelected(event.value, this.function);
  }
  
}
