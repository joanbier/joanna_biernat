import {Component, computed, effect, inject, signal, Signal} from '@angular/core';
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

  filterTerm = signal<string>('');

  filteredPosts = computed(() => {
    const all = this.posts();
    const term = this.filterTerm().toLowerCase();

    if (!all) return [];

    if (!term) return all;

    return all.filter(post => post.body.toLowerCase().includes(term));
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
}
