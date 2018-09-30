import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminArticleComponent} from './admin-article.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ArticleService} from '../../service/article.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  providers:[ArticleService],
  declarations: [AdminArticleComponent]
})
export class AdminArticleModule { }
