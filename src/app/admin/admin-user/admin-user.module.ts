import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUserComponent} from './admin-user.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserService} from '../../service/user.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  providers: [UserService],
  declarations: [AdminUserComponent]
})
export class AdminUserModule {
}
