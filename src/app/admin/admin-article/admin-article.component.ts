import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleService} from '../../service/article.service';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements OnInit {
  selectIndex = 0;
  isDraft = false;
  tabs = [
    {
      active: true,
      name: '发布列表',
      icon: 'anticon anticon-profile'
    },
    {
      active: false,
      name: '草稿箱',
      icon: 'anticon anticon-delete'
    }
  ];
  isAdmin: Boolean = false;
  dataSet = Array<{
    aid: number,
    cid: number,
    create_time: Date,
    origin: number,
    title: string,
    views: number,
  }>();
  showTotal = 0;
  nzPageIndex = 1;
  categorys = Array<{
    cid: number,
    create_time: Date,
    cname: string,
    size: number,
  }>();
  sortValue = 'descend';
  pvSort = 'descend';

  constructor(private ms: NzMessageService,
              private as: ArticleService,
              private cs: CategoryService,
              private router: Router) {
    this.isAdmin = as.isAdmin();
  }

  sortByCreateTime() {
    if (this.sortValue === 'descend') {
      this.sortValue = 'ascend';
    } else if (this.sortValue === 'ascend') {
      this.sortValue = 'descend';
    }
    if (!this.isDraft) {
      this.as.getArticlesPublished((this.nzPageIndex - 1) + '', this.getSortValue(), value => {
        this.dataSet = value['data']['articles'];
        this.showTotal = value['data']['count'];
      });
    } else {
      this.as.getArticlesDrafted((this.nzPageIndex - 1) + '', this.getSortValue(), value => {
        this.dataSet = value['data']['articles'];
        this.showTotal = value['data']['count'];
      });
    }
  }

  getSortValue(): string {
    if (this.sortValue === 'descend') {
      return 'create_time,desc';
    }
    {
      return 'create_time,asc';
    }
  }

  ngOnInit() {
    this.initCategorys();
    this.initArticles();
  }

  initCategorys() {
    this.cs.getCategorys(value => {
      this.categorys = value['data'];
    });
  }

  findCategoryByCid(cid: number): string {
    let name = '未知分类';
    this.categorys.forEach(value => {
      if (value['cid'] === cid) {
        name = value['cname'];
      }
    });
    return name;
  }

  initArticles() {
    this.nzPageIndex = 1;
    if (!this.isDraft) {
      this.as.getArticlesPublished((this.nzPageIndex - 1) + '', this.getSortValue(), value => {
        this.dataSet = value['data']['articles'];
        this.showTotal = value['data']['count'];
      });
    } else {
      this.as.getArticlesDrafted((this.nzPageIndex - 1) + '', this.getSortValue(), value => {
        this.dataSet = value['data']['articles'];
        this.showTotal = value['data']['count'];
      });
    }
  }

  tabSelect(args: any[]) {
    this.isDraft = this.selectIndex !== 0;
    this.initArticles();
  }

  changePage(args: number) {
    if (!this.isDraft) {
      this.as.getArticlesPublished((args - 1) + '', this.getSortValue(), value => {
        this.dataSet = value['data']['articles'];
        this.showTotal = value['data']['count'];
      });
    } else {
      this.as.getArticlesDrafted((args - 1) + '', this.getSortValue(), value => {
        this.dataSet = value['data']['articles'];
        this.showTotal = value['data']['count'];
      });
    }
  }

  didEdit(args: any) {
    this.router.navigate(['/admin/publish'], {
      queryParams: {
        aid: args['aid'],
        refer: 'draft'
      }
    });
  }

  didUpdate(args: any) {
    this.router.navigate(['/admin/publish'], {
      queryParams: {
        aid: args['aid'],
        refer: 'publish'
      }
    });
  }

  delPublishArticle(cid: string, aid: string) {
    this.as.delPublishArticleByAid(cid, aid, value => {
      this.ms.success('删除文章成功!');
      this.initArticles();
    });
  }

  delPublishDraft(cid: string, aid: string) {
    this.as.delDraftArticleByAid(cid, aid, value => {
      this.ms.success('删除草稿成功!');
      this.initArticles();
    });
  }
}
