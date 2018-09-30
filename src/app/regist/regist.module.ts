import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistComponent} from './regist.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserService} from '../service/user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [UserService],
  declarations: [RegistComponent]
})
export class RegistModule {
}
