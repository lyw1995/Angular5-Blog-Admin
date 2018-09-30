import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminInfoComponent} from './admin-info.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserService} from '../../service/user.service';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [UserService],
  declarations: [AdminInfoComponent]
})
export class AdminInfoModule {
}
