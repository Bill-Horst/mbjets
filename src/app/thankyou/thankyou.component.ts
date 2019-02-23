import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  progress: number = 100;
  timer;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress = this.progress -= 10;
      if (this.progress <= 0) {
        clearInterval(this.timer);
        this.router.navigate(['/']);
      }
    }, 1000)
  }

}


