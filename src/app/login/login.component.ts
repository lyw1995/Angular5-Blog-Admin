import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // 提交数据
    if (this.validateForm.valid) {
      const username = this.validateForm.value['userName'];
      const password = this.validateForm.value['password'];
      const remember = this.validateForm.value['remember'];
      if (remember) {
        console.log('记住密码');
      }
      this.us.userLogin(username, password, (value => {
        // 登录成功 跳转
        localStorage.setItem('is_admin', username);
        this.router.navigate(['/admin']);
      }));
    }
  }

  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private ms: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('^[A-Za-z]+\\w+$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16), Validators.pattern('^[A-Za-z]+\\w+$')]],
      remember: [true]
    });
  }

  forgetPassword() {
    this.ms.create('warning', '尚未开放!');
  }
}
