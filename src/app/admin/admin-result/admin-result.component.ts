import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-result',
  templateUrl: './admin-result.component.html',
  styleUrls: ['./admin-result.component.css']
})
export class AdminResultComponent implements OnInit {
  refer = 'publish';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.initParams();
  }

  initParams() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.refer = queryParams['refer'];
    });
  }
}
