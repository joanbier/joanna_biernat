import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Author} from '../shared/models/author.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersApi {
  http = inject(HttpClient);

  async getAuthorDetails(authorId: number): Promise<Author> {
    const author$ = this.http.get<Author>(`users/${authorId}`);
    return firstValueFrom(author$);
  }
}
