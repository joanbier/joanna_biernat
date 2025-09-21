import { TestBed } from '@angular/core/testing';

import { PostsApi } from './posts-api';

describe('PostsApi', () => {
  let service: PostsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
