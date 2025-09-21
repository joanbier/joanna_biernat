import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Post} from '../shared/models/post.model';
import {CommentModel} from '../shared/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostsApi {
  http = inject(HttpClient);

  async getAllPosts(): Promise<Post[]> {
    const posts$ = this.http.get<Post[]>("posts");
    return firstValueFrom(posts$);
  }

  async getPostComment(postId: number): Promise<CommentModel[]> {
    const post$ = this.http.get<CommentModel[]>(`posts/${postId}/comments`);
    return firstValueFrom(post$);
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    let params = new HttpParams()
      .set("userId", userId.toString())

    const posts$ = this.http.get<Post[]>(`posts`, {params});
    return firstValueFrom(posts$);
  }

}
