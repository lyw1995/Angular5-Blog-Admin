import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  dataSet = [];

  constructor(private us: UserService) {
  }

  ngOnInit() {
    this.us.getAllUsers( (value => {
        this.dataSet = value['data'];
    }));
  }
}
