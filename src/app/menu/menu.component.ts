import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  color: string;
  href: string;
  constructor(private router: Router) {
    this.href = '';
    // Call the method every event in the router
    router.events.subscribe(val => {
      this.changeColor();
    });
  }

  ngOnInit() {
    this.href = this.router.url;
    this.changeColor();
  }

  public changeColor() {
    this.href = this.router.url;
    if (this.href === '/home') {
      this.color = 'cyan lighten-3';
    } else if (this.href === '/login') {
      this.color = 'green lighten-3';
    } else {
      this.color = 'indigo lighten-3';
    }
  }
}
