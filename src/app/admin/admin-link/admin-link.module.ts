import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminLinkComponent} from './admin-link.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {LinkService} from '../../service/link.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [LinkService],
  declarations: [AdminLinkComponent]
})
export class AdminLinkModule {
}
