import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';


const userUrl = environment.baseUrl + 'api/admin/users';
const categoryUrl = '/categorys';

@Injectable()
export class CategoryService extends BaseService {

  getCategorys(next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + categoryUrl;
    this.get(url, {}, next);
  }

  createCategory(data: any, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + categoryUrl;
    this.post(url, data, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }

  delAllCategorys(next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + categoryUrl;
    this.delete(url, {}, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }

  delCategoryByCid(cid: string, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + categoryUrl + '/' + cid;
    this.delete(url, {}, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }

  updateCategoryByCid(cid: string, data: any, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + categoryUrl + '/' + cid;
    this.put(url, data, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }
}
