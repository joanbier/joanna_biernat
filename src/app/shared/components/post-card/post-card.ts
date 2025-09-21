import {Component, inject, input, InputSignal} from '@angular/core';
import { Post } from '../../models/post.model';
import {Router} from '@angular/router';
import {TruncatePipe} from '../../pipes/truncate-pipe';

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

  post: InputSignal<Post> = input.required<Post>();

  goToDetails() {
    this.router.navigate(['/posts', this.post().id], {
      state: { post: this.post() }
    });
  }
}
