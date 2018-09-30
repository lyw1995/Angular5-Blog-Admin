import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminResultComponent } from './admin-result.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  declarations: [AdminResultComponent]
})
export class AdminResultModule { }
