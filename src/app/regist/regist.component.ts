import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {UserService} from '../service/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {
  validateForm: FormGroup;
  emailIn = '';

  submitForm(): void {
    if (this.emailIn.length > 0) {
      this.validateForm.get('email').setValidators(Validators.email);
      this.validateForm.get('email').markAsDirty();
      this.validateForm.get('email').updateValueAndValidity();
    } else {
      this.validateForm.get('email').clearValidators();
      this.validateForm.get('email').markAsPristine();
      this.validateForm.get('email').updateValueAndValidity();
    }
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.didRegist();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
  };

  constructor(private fb: FormBuilder, private us: UserService, private ms: NzMessageService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('^[A-Za-z]+\\w+$')]],
      nickname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16), Validators.pattern('^[A-Za-z]+\\w+$')]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      desc: ['', [Validators.maxLength(150)]],
      email: [''],
      addr: ['', [Validators.maxLength(50)]]
    });
  }

  didRegist() {
    const username = this.validateForm.value['username'];
    const nickname = this.validateForm.value['nickname'];
    const password = this.validateForm.value['password'];
    const desc = this.validateForm.value['desc'];
    const email = this.validateForm.value['email'];
    const addr = this.validateForm.value['addr'];
    this.us.userRegist({
      'username': username,
      'password': password,
      'nickname': nickname,
      'desc': desc,
      'addr': addr,
      'email': email
    }, (value => {
      this.ms.success('注册成功!');
      this.router.navigate(['/login']);
    }));
  }

}
