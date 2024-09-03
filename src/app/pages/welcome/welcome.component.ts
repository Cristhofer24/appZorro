
import { Component, OnInit } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NzFlexModule , CommonModule,NzDividerModule,NzStepsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
 
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
