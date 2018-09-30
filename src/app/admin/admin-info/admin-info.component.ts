import {Component, NgZone, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {Subscription} from 'rxjs/Subscription';
import {NzMessageService} from 'ng-zorro-antd';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {
  loading = true;
  userData = null;
  nick_name = '';
  user_desc = '';
  user_email = '';
  user_addr = '';
  password = '';
  isVisible = false;
  isOkLoading = false;
  isAdmin: Boolean = false;

  handleOk(): void {
    if (this.password.length <= 0) {
      this.ms.error('新的账户密码必填!');
      return;
    }
    this.isOkLoading = true;
    this.us.updateUserInfo({
      'password': this.password,
    }, value => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.us.userLogout(_ => {
        this.ms.success('修改用户信息成功!');
        this.router.navigate(['/login']);
      });
    }, error => {
      this.isOkLoading = false;
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(private us: UserService, private ms: NzMessageService, private router: Router) {
    this.isAdmin = us.isAdmin();
  }

  ngOnInit() {
    this.getUserInfo();
  }

  // 获取用户信息
  getUserInfo() {
    this.us.getUserInfo(value => {
      this.loading = false;
      this.userData = value;
    });
  }

  // 自定义上传
  uploadRequest = (item): Subscription => {
    const file = item['file'];
    const isJPG = file.type === 'image/jpeg';
    const isPng = file.type === 'image/png';
    if (!isJPG && !isPng) {
      this.ms.error('头像上传仅支持jpg,png格式!');
    }
    return this.us.uploadAvator(file, value => {
      this.uploadAvator(environment.baseUrl + value['data']);
    });
  };

  // 修改头像
  uploadAvator(file: string) {
    this.us.updateUserInfo({
      'avator': file,
    }, value => {
      this.userData['data']['user_avator'] = file;
      this.ms.success('修改用户头像成功!');
    });
  }

  // 修改个人信息
  submit() {
    // 懒得写数据约束了.. 只要传就改
    let data = {};
    if (this.nick_name.length > 0) {
      data['nickname'] = this.nick_name;
    }
    if (this.user_desc.length > 0) {
      data['desc'] = this.user_desc;
    }
    if (this.user_email.length > 0) {
      data['email'] = this.user_email;
    }
    if (this.user_addr.length > 0) {
      data['addr'] = this.user_addr;
    }
    if (Object.keys(data).length <= 0) {
      this.ms.error('用户信息参数必填一个!');
      return;
    }
    this.us.updateUserInfo(data, value => {
      if (data.hasOwnProperty('nickname')) {
        this.userData['data']['nick_name'] = data['nickname'];
      }

      if (data.hasOwnProperty('addr')) {
        this.userData['data']['user_addr'] = data['addr'];
      }

      if (data.hasOwnProperty('email')) {
        this.userData['data']['user_email'] = data['email'];
      }

      if (data.hasOwnProperty('desc')) {
        this.userData['data']['user_desc'] = data['desc'];
      }
      this.ms.success('修改用户信息成功!');
    });
  }

  // 修改密码
  updatePassword() {
    this.isVisible = true;
  }
}
