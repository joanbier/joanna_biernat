import { Routes } from '@angular/router';
import {Gantt} from './features/gantt/gantt';

export const routes: Routes = [
  {
    path: "posts",
    loadChildren: () => import("./features/posts/posts.routes").then(m => m.postsRoutes),
    data: { title: "JsonPl - Posts" }
  },
  {
    path: "gantt",
    component: Gantt,
    data: { title: "JsonPl - Gantt chart" }
  },
  {
    path: "**",
    redirectTo: "/posts"
  }
];
