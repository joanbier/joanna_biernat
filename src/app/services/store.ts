import {inject, Injectable, signal} from '@angular/core';
import {PostsApi} from './posts-api';
import {Post} from '../shared/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class Store {
  postsApiService: PostsApi = inject(PostsApi);

  #posts = signal<Post[] | null>(null);
  posts = this.#posts.asReadonly();

  async loadAllPosts() {
    const posts = await this.postsApiService.getAllPosts();
    this.#posts.set(posts);
  }

  toggleFav(postId: number) {
    const posts = this.#posts();
    if (!posts) return;

    this.#posts.set(
      posts.map(post =>
        post.id === postId ? { ...post, isFav: !post.isFav } : post
      )
    );
  }
}
