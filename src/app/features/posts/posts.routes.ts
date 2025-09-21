import {PostsList} from './posts-list/posts-list';
import {PostDetails} from './post-details/post-details';
import {postResolver} from './post-details/post-resolver';

export const postsRoutes = [
  { path: "", component: PostsList },
  { path: ":postId", component: PostDetails, resolve: { post: postResolver } }
];
