import authorRepo from "../db/authorRepository.mjs";
import postRepo from "../db/postRepository.mjs";

const resolvers = {
  Query: {
    posts: () => postRepo.getPosts(),
    authors: () => authorRepo.getAuthors(),
  },
  Mutation: {
    registerAuthor: (_, { username, password }) =>
      authorRepo.registerAuthor(username, password),
    loginAuthor: (_, { username, password }) =>
      authorRepo.loginAuthor(username, password),
    createAuthor: (_, { username, password }) =>
      authorRepo.createAuthor(username, password),
    updateAuthor: (_, { id, username }, context) =>
      authorRepo.updateAuthor(context.user, id, username),
    deleteAuthor: (_, { id }, context) =>
      authorRepo.deleteAuthor(context.user, id),
    createPost: (_, { title, authorId }) =>
      postRepo.createPost(title, authorId),
    updatePost: (_, { id, title }, context) =>
      postRepo.updatePost(context.user, id, title),
    deletePost: (_, { id }, context) => postRepo.deletePost(context.user, id),
  },
  Post: { author: (_) => authorRepo.getAuthorById(_.author_id) },
  Author: { posts: (_) => postRepo.getPostByAuthorId(_.id) },
};

export default resolvers;
