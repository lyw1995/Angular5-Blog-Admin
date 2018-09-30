import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';


const extendsUrl = environment.baseUrl + 'api/admin/extends';

@Injectable()
export class ExtendService extends BaseService {

  getAll(next?: (value: any) => void) {
    const url = extendsUrl + '?op=all&uid=' + localStorage.getItem('user_id');
    this.get(url, {}, next);
  }

  collectByCsdn(data: any, next?: (value: any) => void) {
    this.post(extendsUrl, data, next, error1 => {
      this.ms.error('采集文章失败!');
    });
  }
}
