import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  loading = true;
  dataSet = Array<{
    cid: number,
    create_time: Date,
    cname: string,
    size: number,
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
      const cname = this.validateForm.value['cname'];
      if (!this.isEdit) {
        // 新增
        this.cs.createCategory({
            'name': encodeURIComponent(cname),
          }
          , value => {
            this.ms.success('新增分类成功!');
            this.handleCancel();
            this.initCategorys();
          });
      } else {
        // 修改
        this.cs.updateCategoryByCid(this.tempItem['cid'], {
            'name': encodeURIComponent(cname),
          }
          , value => {
            this.ms.success('修改分类成功!');
            this.handleCancel();
            this.initCategorys();
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

  constructor(private cs: CategoryService, private fb: FormBuilder, private ms: NzMessageService) {
    this.isAdmin = cs.isAdmin();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      cname: [null, [Validators.required]],
    });
    this.initCategorys();
  }

  initCategorys() {
    this.cs.getCategorys(value => {
      this.dataSet = value['data'];
      this.loading = false;
    });
  }

  showModal(flag: Boolean, item: any) {
    this.tempItem = item;
    this.isEdit = flag;
    this.isVisible = true;
    if (item !== null) {
      this.validateForm.get('cname').setValue(this.tempItem['cname']);
    }
  }

  delAllCategorys() {
    this.cs.delAllCategorys(value => {
      this.ms.success('清空所有分类成功!');
      this.initCategorys();
    });
  }

  delCategoryByCid(cid: string) {
    this.cs.delCategoryByCid(cid, value => {
      this.ms.success('删除分类成功!');
      this.initCategorys();
    });
  }

}
