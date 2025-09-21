import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavBar} from './core/layout/nav-bar/nav-bar';
import {Footer} from './core/layout/footer/footer';
import {Title} from '@angular/platform-browser';
import {filter, map, mergeMap} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Footer],
  styles: [],
  template: `
    <div class="w-full max-w-7xl mx-auto">
      <header>
        <app-nav-bar />
      </header>
      <main class="min-h-screen px-5 pb-10 pt-[100px]">
        <router-outlet />
      </main>
      <footer>
        <app-footer />
      </footer>
    </div>
  `
})
export class App {
  protected readonly title = signal('proffeo-task');
}
