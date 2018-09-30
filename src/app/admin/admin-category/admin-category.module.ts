import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminCategoryComponent} from './admin-category.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CategoryService} from '../../service/category.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [CategoryService],
  declarations: [AdminCategoryComponent]
})
export class AdminCategoryModule {
}
