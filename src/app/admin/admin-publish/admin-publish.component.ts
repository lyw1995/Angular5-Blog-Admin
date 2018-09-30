import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/filter';
import {CategoryService} from '../../service/category.service';
import {ArticleService} from '../../service/article.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-publish',
  templateUrl: './admin-publish.component.html',
  styleUrls: ['./admin-publish.component.css']
})
export class AdminPublishComponent implements OnInit {
  isAdmin: Boolean = false;
  option: Object;
  froalaText = '';
  title = '';
  origin = [{value: -1, label: '请选择'}, {value: 1, label: '原创'}, {value: 0, label: '转载'}];
  categorys = Array<{
    cid: number,
    create_time: Date,
    cname: string,
    size: number,
  }>();
  selectedOrigin = -1;
  selectedCategory = -1;
  refer = '';
  aid = -1;

  constructor(private cs: CategoryService,
              private as: ArticleService,
              private ms: NzMessageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.froalaText = '';
    this.initParams();
    this.isAdmin = as.isAdmin();
  }

  initParams() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.hasOwnProperty('refer')) {
        this.refer = queryParams['refer'];
        this.aid = queryParams['aid'];
      } else {
        this.refer = '';
        this.aid = -1;
      }
    });
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

  ngOnInit() {
    this.initCategorys();

    this.option = {
      language: 'zh_cn',
      placeholderText: '请输入博客内容',
      charCounterCount: true,
      charCounterMax: -1,
      heightMin: 300,
      imageUploadParam: 'cover',
      imageUploadURL: this.as.getUploadUrl(),
      quickInsertButtons: ['image', 'table', 'ol', 'ul'],
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline',
        'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily',
        'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
        'paragraphFormat', 'align', 'formatOL', 'formatUL',
        'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertTable',
        'specialCharacters', 'insertHR', '|', 'selectAll', 'clearFormatting',
        , 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
      codeBeautifierOptions: {
        end_with_newline: true,
        indent_inner_html: true,
        extra_liners: '[\'p\', \'h1\', \'h2\', \'h3\', \'h4\', \'h5\', \'h6\', \'blockquote\', \'pre\', \'ul\', \'ol\', \'table\', \'dl\']',
        brace_style: 'expand',
        indent_char: ' ',
        indent_size: 4,
        wrap_line_length: 0
      },
      events: {
        'froalaEditor.keyup': (v, editor) => {
          // this.setHighLight(this.froalaText);
        }
      }
    };
    this.initArticle();
  }

  initArticle() {
    if (this.refer !== '' && this.aid !== -1) {
      this.as.GetArticleWithState(this.aid + '', this.refer, value => {
        this.title = value['data']['title'];
        this.froalaText = value['data']['content'];
        this.selectedOrigin = value['data']['origin'];
        this.selectedCategory = value['data']['cid'];
      });
    }
  }

  publish() {
    if (!this.canPublish()) {
      return;
    }
    this.as.publishArticle(this.selectedCategory + '', {
      'origin': this.selectedOrigin + '',
      'title': encodeURIComponent(this.title),
      'content': encodeURIComponent(this.froalaText)
    }, value => {
      this.ms.success('发布文章成功!');
      this.clearRecord();
      this.router.navigate(['/admin/result'], {
        queryParams: {
          refer: 'publish'
        }
      });
    });
  }

  clearRecord() {
    this.selectedOrigin = -1;
    this.selectedCategory = -1;
    this.title = '';
    this.froalaText = '';
  }

  canPublish(): Boolean {
    if (this.title.length <= 0) {
      this.ms.error('请输入文章标题!');
      return false;
    }
    if (this.froalaText.length <= 0) {
      this.ms.error('请输入文章内容!');
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
    return true;
  }

  draft() {
    if (!this.canPublish()) {
      return;
    }
    this.as.drafthArticle(this.selectedCategory + '', {
      'origin': this.selectedOrigin + '',
      'title': encodeURIComponent(this.title),
      'content': encodeURIComponent(this.froalaText)
    }, value => {
      this.ms.success('保存草稿成功!');
      this.clearRecord();
      this.router.navigate(['/admin/result'], {
        queryParams: {
          refer: 'draft'
        }
      });
    });
  }

  goBack() {
    window.history.back();
  }

  isShow(): Boolean {
    return this.title.length <= 0 && this.froalaText.length <= 0;
  }

  saveArticle() {
    if (!this.canPublish()) {
      return;
    }
    this.as.saveArticleWithState(this.aid + '', {
      'cid': this.selectedCategory + '',
      'origin': this.selectedOrigin + '',
      'title': encodeURIComponent(this.title),
      'content': encodeURIComponent(this.froalaText)
    }, value => {
      this.ms.success('保存草稿成功!');
      this.clearRecord();
      this.router.navigate(['/admin/result'], {
        queryParams: {
          refer: 'draft'
        }
      });
    });
  }

  publishArticle() {
    if (!this.canPublish()) {
      return;
    }
    this.as.publishArticleWithState(this.aid + '', {
      'cid': this.selectedCategory + '',
      'origin': this.selectedOrigin + '',
      'title': encodeURIComponent(this.title),
      'content': encodeURIComponent(this.froalaText)
    }, value => {
      this.ms.success('发布文章成功!');
      this.clearRecord();
      this.router.navigate(['/admin/result'], {
        queryParams: {
          refer: 'publish'
        }
      });
    });
  }
}
