import {Component, effect, inject, Signal} from '@angular/core';
import {Store} from '../../../services/store';
import {Loading} from '../../../services/loading';
import {Post} from '../../../shared/models/post.model';
import {PostCard} from '../../../shared/components/post-card/post-card';

@Component({
  selector: 'app-posts-list',
  imports: [
    PostCard
  ],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.scss'
})
export class PostsList {
  loadingService: Loading = inject(Loading);
  store = inject(Store);

  loading: Signal<boolean> = this.loadingService.loading;
  posts: Signal<Post[] | null> = this.store.posts;

  constructor() {
    effect(() => {
      const posts = this.posts();

      if (!posts) {
        this.store.loadAllPosts();
      }
      console.log(posts)
    });
  }
}
