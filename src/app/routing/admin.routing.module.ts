import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {RegistComponent} from '../regist/regist.component';
import {AdminComponent} from '../admin/admin.component';
import {AuthGuard} from '../guard/auth.guard';
import {AdminPublishModule} from '../admin/admin-publish/admin-publish.module';
import {AdminPublishComponent} from '../admin/admin-publish/admin-publish.component';
import {AdminArticleModule} from '../admin/admin-article/admin-article.module';
import {AdminArticleComponent} from '../admin/admin-article/admin-article.component';
import {AdminLinkComponent} from '../admin/admin-link/admin-link.component';
import {AdminUserComponent} from '../admin/admin-user/admin-user.component';
import {AdminCategoryComponent} from '../admin/admin-category/admin-category.component';
import {AdminInfoComponent} from '../admin/admin-info/admin-info.component';
import {AdminResultComponent} from '../admin/admin-result/admin-result.component';
import {AdminUtilComponent} from '../admin/admin-util/admin-util.component';

const routers: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: AdminInfoComponent
          },
          {
            path: 'publish',
            component: AdminPublishComponent
          },
          {
            path: 'article',
            component: AdminArticleComponent
          },
          {
            path: 'link',
            component: AdminLinkComponent
          },
          {
            path: 'user',
            component: AdminUserComponent
          },
          {
            path: 'category',
            component: AdminCategoryComponent
          },
          {
            path: 'result',
            component: AdminResultComponent
          },
          {
            path: 'util',
            component: AdminUtilComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
