import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPublishComponent} from './admin-publish.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {ArticleService} from '../../service/article.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [ArticleService],
  declarations: [AdminPublishComponent]
})
export class AdminPublishModule {
}
