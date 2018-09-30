import {Component, OnInit} from '@angular/core';
import {LinkService} from '../../service/link.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-link',
  templateUrl: './admin-link.component.html',
  styleUrls: ['./admin-link.component.css']
})
export class AdminLinkComponent implements OnInit {
  loading = true;
  dataSet = Array<{
    link_id: number,
    create_time: Date,
    link_icon: string,
    link_name: string,
    link_url: string,
  }>();
  isVisible = false;
  isEdit: Boolean = false;
  validateForm: FormGroup;
  tempItem = null;
  isAdmin: Boolean = false;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const linkname = this.validateForm.value['linkname'];
      const linkurl = this.validateForm.value['linkurl'];
      const linkicon = this.validateForm.value['linkicon'];
      if (!this.isEdit) {
        // 新增
        this.ls.createLink({
            'avator': linkicon,
            'name': linkname,
            'url': linkurl,
          }
          , value => {
            this.ms.success('新增友链成功!');
            this.handleCancel();
            this.initLinks();
          });
      } else {
        // 修改
        this.ls.updateLinkByLid(this.tempItem['link_id'], {
            'avator': linkicon,
            'name': linkname,
            'url': linkurl,
          }
          , value => {
            this.ms.success('修改友链成功!');
            this.handleCancel();
            this.initLinks();
          });
      }
    }
  }


  handleOk(): void {
    this.submitForm();
    // this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.tempItem = null;
    this.validateForm.reset();
  }

  constructor(private ls: LinkService, private fb: FormBuilder, private ms: NzMessageService) {
    this.isAdmin = ls.isAdmin();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      linkname: [null, [Validators.required]],
      linkurl: [null, [Validators.required]],
      linkicon: [null, [Validators.required]],
    });
    this.initLinks();
  }

  initLinks() {
    this.ls.getLinks(value => {
      this.dataSet = value['data'];
      this.loading = false;
    });
  }

  showModal(flag: Boolean, item: any) {
    this.tempItem = item;
    this.isEdit = flag;
    this.isVisible = true;
    if (item !== null) {
      this.validateForm.get('linkname').setValue(this.tempItem['link_name']);
      this.validateForm.get('linkurl').setValue(this.tempItem['link_url']);
      this.validateForm.get('linkicon').setValue(this.tempItem['link_icon']);
    }
  }

  delAllLinks() {
    this.ls.delLinks(value => {
      this.ms.success('清空所有友链成功!');
      this.initLinks();
    });
  }

  delLinkByLid(lid: string) {
    this.ls.delLinkByLid(lid, value => {
      this.ms.success('删除友链成功!');
      this.initLinks();
    });
  }
}
