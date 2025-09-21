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
export class App implements OnInit {
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private titleService: Title = inject(Title);

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route?.data ?? [])
      )
      .subscribe(data => {
        if (data["title"]) {
          this.titleService.setTitle(data["title"]);
        } else {
          this.titleService.setTitle("JB - Json Placeholder"); // fallback
        }
      });
  }
}
