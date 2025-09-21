import {PostsList} from './posts-list/posts-list';
import {PostDetails} from './post-details/post-details';

export const postsRoutes = [
  { path: "", component: PostsList },
  { path: ":postId", component: PostDetails }
];
