import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class BaseService {

  constructor(protected http: HttpClient, protected  ms: NzMessageService) {
  }

  isAdmin(): Boolean {
    const a = localStorage.getItem('is_admin');
    return a === 'Admin' || a === 'Track' || a === 'admin' || a === 'track';
  }

  // 只要不包含sessions 都加入auth 头
  injectToken(url: string): HttpHeaders {
    if (url.indexOf('sessions') === -1) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      });
    }
  }

  // 统一post 请求 响应返回
  post(url: string, body: {
    [param: string]: string | string[];
  }, next?: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    const headers = this.injectToken(url);
    return this.http.post(url, new HttpParams({
      fromObject: body
    }), {headers: headers}).subscribe(
      next, error, complete
    );
  }

  // 统一put 请求 响应返回
  put(url: string, body: {
    [param: string]: string | string[];
  }, next?: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    const headers = this.injectToken(url);
    return this.http.put(url, new HttpParams({
      fromObject: body
    }), {headers: headers}).subscribe(
      next, error, complete
    );
  }

  // 统一Get 请求 响应返回
  get(url: string, body: {
    [param: string]: string | string[];
  }, next?: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    const headers = this.injectToken(url);
    return this.http.get(url, {
      headers: headers, params: new HttpParams({
        fromObject: body
      }),
    }).subscribe(
      next, error, complete
    );
  }

  // 统一Delete 请求 响应返回
  delete(url: string, body: {
    [param: string]: string | string[];
  }, next?: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    const headers = this.injectToken(url);
    return this.http.delete(url, {
      headers: headers, params: new HttpParams({
        fromObject: body
      }),
    }).subscribe(
      next, error, complete
    );
  }
}
