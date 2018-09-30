import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUtilComponent} from './admin-util.component';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {ExtendService} from '../../service/extend.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgZorroAntdModule
  ],
  providers: [ExtendService],
  declarations: [AdminUtilComponent]
})
export class AdminUtilModule {
}
