import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';


const userUrl = environment.baseUrl + 'api/admin/users';
const articleUrl = '/articles';
const categoryUrl = '/categorys';
const uploadUrl = environment.baseUrl + 'api/admin/sessions/upload';

@Injectable()
export class ArticleService extends BaseService {
  getUploadUrl() {
    return uploadUrl;
  }

  getArticleUrl(cid: string) {
    return userUrl + '/' + localStorage.getItem('user_id') + categoryUrl + '/' + cid + articleUrl;
  }

  // 获取发布列表
  getArticlesPublished(page: string, sort: string, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + articleUrl + '?page=' + page + '&published=true&sort=' + sort;
    this.get(url, {}, next);
  }

  // 获取草稿箱列表
  getArticlesDrafted(page: string, sort: string, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + articleUrl + '?page=' + page + '&published=false&sort=' + sort;
    this.get(url, {}, next);
  }

  GetArticleWithState(aid: string, refer: string, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + articleUrl + '/' + aid + '?state=' + refer;
    this.get(url, {}, next);
  }

  saveArticleWithState(aid: string, data: any, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + articleUrl + '/' + aid + '?state=draft';
    this.put(url, data, next);
  }

  publishArticleWithState(aid: string, data: any, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + articleUrl + '/' + aid + '?state=publish';
    this.put(url, data, next);
  }

  // 发布文章
  publishArticle(cid: string, data: any, next?: (value: any) => void) {
    const url = this.getArticleUrl(cid) + '?publish=true';
    this.post(url, data, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }

  // 保存草稿
  drafthArticle(cid: string, data: any, next?: (value: any) => void) {
    const url = this.getArticleUrl(cid) + '?publish=false';
    this.post(url, data, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }

  delPublishArticleByAid(cid: string, aid: string, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + categoryUrl + '/' + cid + articleUrl + '/' + aid + '?state=publish';
    this.delete(url, {}, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }

  delDraftArticleByAid(cid: string, aid: string, next?: (value: any) => void) {
    const url = userUrl + '/' + localStorage.getItem('user_id') + categoryUrl + '/' + cid + articleUrl + '/' + aid + '?state=draft';
    this.delete(url, {}, next, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.ms.error('获取数据异常: ' + error.statusText);
      } else {
        this.ms.error('获取数据异常!');
      }
    });
  }
}
