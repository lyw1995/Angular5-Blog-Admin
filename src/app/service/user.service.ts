import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';

const sessionUrl = environment.baseUrl + 'api/admin/sessions';
const userUrl = environment.baseUrl + 'api/admin/users';
const uploadUrl = environment.baseUrl + 'api/admin/sessions/upload';

@Injectable()
export class UserService extends BaseService {

  // 用户登录
  userLogin(username: string, password: string, next?: (value: any) => void) {
    const data = {
      'username': username,
      'password': password
    };
    this.post(sessionUrl, data,
      (value: any) => {
        localStorage.setItem('user_id', value['data']['user_id']);
        localStorage.setItem('token', value['data']['token']);
        localStorage.setItem('user_name', value['data']['user_name']);
        localStorage.setItem('user_avator', value['data']['user_avator']);
        this.ms.success('登录成功!');
        next(value);
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.ms.error('获取数据异常: ' + error.statusText);
        } else {
          this.ms.error('获取数据异常!');
        }
      });
  }

  // 用户注册
  userRegist(data: any, next?: (value: any) => void) {
    this.post(userUrl, data,
      (value: any) => {
        next(value);
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.ms.error('获取数据异常: ' + error.statusText);
        } else {
          this.ms.error('获取数据异常!');
        }
      });
  }

  // 用户登出 清除缓存
  userLogout(next?: (value: any) => void) {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_avator');
    next(true);
  }

  // 获取用户列表
  getAllUsers(next?: (value: any) => void) {
    this.get(userUrl, {}, next);
  }

  getUserInfo(next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id');
    this.get(url, {}, next);
  }

  uploadAvator(file: File, next?: (value: any) => void): Subscription {
    const formData = new FormData();
    formData.append('avator',
      file, file.name)
    ;
    return this.http.post(uploadUrl, formData)
      .subscribe(next, _ => {
        this.ms.error('上传头像失败,请重试!');
      });
  }

  // 修改用户信息
  updateUserInfo(data: any, next?: (value: any) => void, error?: (error: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id');
    this.put(url, data,
      (value: any) => {
        next(value);
      }, (err: any) => {
        error(err);
        if (err instanceof HttpErrorResponse) {
          this.ms.error('获取数据异常: ' + err.statusText);
        } else {
          this.ms.error('获取数据异常!');
        }
      });
  }
}
