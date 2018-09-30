import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleService} from '../../service/article.service';
import {CategoryService} from '../../service/category.service';
import {ExtendService} from '../../service/extend.service';

@Component({
  selector: 'app-admin-util',
  templateUrl: './admin-util.component.html',
  styleUrls: ['./admin-util.component.css']
})
export class AdminUtilComponent implements OnInit {
  origin = [{value: -1, label: '请选择'}, {value: 1, label: '原创'}, {value: 0, label: '转载'}];
  categorys = Array<{
    cid: number,
    create_time: Date,
    cname: string,
    size: number,
  }>();
  selectedOrigin = -1;
  selectedCategory = -1;
  csdnUrl = '';
  extendData = null;
  isAdmin: Boolean = false;

  constructor(private ms: NzMessageService, private es: ExtendService, private cs: CategoryService) {
    this.isAdmin = es.isAdmin();
  }

  ngOnInit() {
    this.initExtends();
    this.initCategorys();
  }

  initCategorys() {
    this.cs.getCategorys(value => {
      this.categorys = value['data'];
      this.categorys.unshift({
        cid: -1,
        cname: '请选择',
        create_time: new Date(),
        size: 0,
      });
    });
  }

  CreateOfCsdn(act: string) {
    if (this.csdnUrl.length <= 0) {
      this.ms.error('请输入csdn博客文章链接!');
      return false;
    }
    if (!this.csdnUrl.startsWith('https://blog.csdn.net', 0)) {
      this.ms.error('请输入csdn博客文章链接!');
      return false;
    }
    if (this.selectedOrigin === -1) {
      this.ms.error('请选择文章类型!');
      return false;
    }
    if (this.selectedCategory === -1) {
      this.ms.error('请选择个人分类!');
      return false;
    }
    this.es.collectByCsdn({
      cid: this.selectedCategory,
      origin: this.selectedOrigin,
      refer: 'csdn',
      uid: localStorage.getItem('user_id'),
      url: this.csdnUrl,
      action: act,
    }, value => {
      this.ms.success(value['msg']);
    });
  }

  private initExtends() {
    this.es.getAll(value => {
      this.extendData = value['data'];
    });
  }
}
