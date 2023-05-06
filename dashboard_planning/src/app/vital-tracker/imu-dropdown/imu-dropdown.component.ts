import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imu-dropdown',
  templateUrl: './imu-dropdown.component.html',
  styleUrls: ['./imu-dropdown.component.css']
})
export class ImuDropdownComponent {

  @Input() elements: string[];
  @Input() displayText: string;

  selectedElem: string;
}
