import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user_name = '';
  user_avator = '';
  isCollapsed = false;
  triggerTemplate = null;
  isVisible = false;
  isOkLoading = false;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  constructor(private route: Router, private us: UserService, private ms: NzMessageService) {
    this.user_name = localStorage.getItem('user_name');
    this.user_avator = localStorage.getItem('user_avator');
  }

  ngOnInit() {
  }

  logout() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.us.userLogout(_ => {
        this.ms.success('退出登录成功!');
        this.route.navigate(['/login']);
      });
    }, 1000);
  }
}
