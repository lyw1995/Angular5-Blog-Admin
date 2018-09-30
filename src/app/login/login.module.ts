import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../service/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [UserService],
  declarations: [LoginComponent]
})
export class LoginModule {
}
