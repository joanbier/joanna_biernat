import {Component, inject, OnInit, signal} from '@angular/core';
import {JsonPipe, Location} from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Post} from '../../../shared/models/post.model';
import {Author} from '../../../shared/models/author.model';
import {PostsApi} from '../../../services/posts-api';
import {UsersApi} from '../../../services/users-api';
import {CommentModel} from '../../../shared/models/comment.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.html',
  imports: [
    JsonPipe
  ],
  styleUrl: './post-details.scss'
})
export class PostDetails implements OnInit {
  route = inject(ActivatedRoute);
  location: Location = inject(Location);
  titleService: Title = inject(Title);
  postsService = inject(PostsApi);
  userService = inject(UsersApi);

  post = signal<Post | null>(null);
  postId = signal<number | null>(null);

  authorDetails = signal<Author | null>(null);
  comments = signal<CommentModel[] | null>(null);

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('postId')
    this.postId.set(Number(postId));
    this.post.set(history.state['post']);
    this.setDynamicPageTitle();
    this.getAuthorDetails();
    this.getComments();
  }

  async getAuthorDetails() {
    const authorId = this.post()?.userId;
    const author = await this.userService.getAuthorDetails(authorId as number);
    this.authorDetails.set(author);
  }

  async getComments() {
    const comments = await this.postsService.getPostComment(this.postId() as number);
    this.comments.set(comments);
  }

  setDynamicPageTitle() {
    this.route.data.subscribe(() => {
      const post = this.post();
      if (post?.title) {
        this.titleService.setTitle(`Post – ${post.title}`);
      } else {
        this.titleService.setTitle("Post Details");
      }
    });
  }

  backToList() {
    this.location.back();
  }
}
