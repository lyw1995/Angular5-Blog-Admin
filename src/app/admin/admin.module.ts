import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AdminRoutingModule} from '../routing/admin.routing.module';
import {AdminPublishModule} from './admin-publish/admin-publish.module';
import {AdminUserModule} from './admin-user/admin-user.module';
import {AdminLinkModule} from './admin-link/admin-link.module';
import {AdminCategoryModule} from './admin-category/admin-category.module';
import {AdminArticleModule} from './admin-article/admin-article.module';
import {AdminInfoModule} from './admin-info/admin-info.module';
import {UserService} from '../service/user.service';
import {AdminResultModule} from './admin-result/admin-result.module';
import {AdminUtilModule} from './admin-util/admin-util.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
    AdminRoutingModule,
    AdminPublishModule,
    AdminUserModule,
    AdminLinkModule,
    AdminCategoryModule,
    AdminArticleModule,
    AdminInfoModule,
    AdminResultModule,
    AdminUtilModule,
  ],
  providers: [UserService],
  declarations: [AdminComponent]
})
export class AdminModule {
}
