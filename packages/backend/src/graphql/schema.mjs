const typeDefs = `#graphql
  type Query {
    authors: [Author]
    posts: [Post]
  }

  type Mutation {
    registerAuthor(username: String!, password: String!): AuthResponse
    loginAuthor(username: String!, password: String!): AuthResponse
    createAuthor(username: String!): Author
    updateAuthor(id: ID!, username: String!): Author
    deleteAuthor(id: ID!): Author
    createPost(title: String!, authorId: ID!): Post
    updatePost(id: ID!, title: String!): Post
    deletePost(id: ID!): Post
  }

  type Author {
    id: ID!
    username: String
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    author: Author
  }

  type AuthResponse {
    success: Boolean!
    message: String!
    accessToken: String
  }
`;

export default typeDefs;
