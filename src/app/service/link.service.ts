import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';


const userUrl = environment.baseUrl + 'api/admin/users';
const linkUrl = '/links';

@Injectable()
export class LinkService extends BaseService {

  getLinks(next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + linkUrl;
    this.get(url, {}, next);
  }

  createLink(data: any, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + linkUrl;
    this.post(url, data, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }

  delLinks(next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + linkUrl;
    this.delete(url, {}, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }

  delLinkByLid(lid: string, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + linkUrl + '/' + lid;
    this.delete(url, {}, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }

  updateLinkByLid(lid: string, data: any, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + linkUrl + '/' + lid;
    this.put(url, data, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }
}
