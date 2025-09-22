import {Component, inject, input, InputSignal} from '@angular/core';
import { Post } from '../../models/post.model';
import {Router} from '@angular/router';
import {TruncatePipe} from '../../pipes/truncate-pipe';
import {Store} from '../../../services/store';

@Component({
  selector: 'app-post-card',
  imports: [
    TruncatePipe
  ],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCard {
  router = inject(Router);
  store = inject(Store);

  post: InputSignal<Post> = input.required<Post>();

  goToDetails() {
    this.router.navigate(['/posts', this.post().id], {
      state: { post: this.post() }
    });
  }

  toggleFav(event: MouseEvent) {
    event.stopPropagation();
    this.store.toggleFav(this.post().id);
  }
}
