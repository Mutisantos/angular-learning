import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> ffab0ca5f2c1d4f60a47a9b48b8232b5c240ba4a

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
<<<<<<< HEAD
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
=======

  constructor() { }

  ngOnInit() {
  }

>>>>>>> ffab0ca5f2c1d4f60a47a9b48b8232b5c240ba4a
}
