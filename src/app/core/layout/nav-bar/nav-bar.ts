import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar {
  menuItems: {label: string, path: string, icon: string }[] = [
    { label: "Posts", path: "posts", icon: "user" },
    { label: "Gantt", path: "gantt", icon: "globe" },
  ];
}
