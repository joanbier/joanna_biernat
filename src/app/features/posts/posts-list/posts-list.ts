import {Component, computed, effect, inject, signal, Signal} from '@angular/core';
import {Store} from '../../../services/store';
import {Loading} from '../../../services/loading';
import {Post} from '../../../shared/models/post.model';
import {PostCard} from '../../../shared/components/post-card/post-card';
import {PostsApi} from '../../../services/posts-api';

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
  postApiService: PostsApi = inject(PostsApi);

  loading: Signal<boolean> = this.loadingService.loading;
  posts: Signal<Post[] | null> = this.store.posts;

  filterTerm = signal<string>('');
  searchAuthor = signal<number | null>(null);

  postsByAuthor = signal<Post[] | null>(null);

  filteredPosts = computed(() => {
    const all = this.postsByAuthor() ?? this.posts() ?? [];
    const term = this.filterTerm().toLowerCase();

    if (!term) return all;

    return all.filter(post =>
      post.body.toLowerCase().includes(term)
    );
  });

  constructor() {
    effect(() => {
      if (!this.posts()) {
        this.store.loadAllPosts();
      }
    });
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterTerm.set(value);
  }

  async onAuthorChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const userId = Number(value);

    if (!userId) {
      this.searchAuthor.set(null);
      this.postsByAuthor.set(null);
      return;
    }

    this.searchAuthor.set(userId);

    const posts = await this.postApiService.getPostsByUserId(userId);
    this.postsByAuthor.set(posts);
  }
}
