export const createPostQuery =
  "INSERT INTO posts(title, author_id) VALUES($1, $2) RETURNING *";

export const updatePostQuery =
  "UPDATE posts SET title=$1 WHERE id=$2 RETURNING *";

export const deletePostQuery = "DELETE FROM posts WHERE id=$1 RETURNING *";

export const getPostsQuery = "SELECT * FROM posts";

export const getPostByAuthorIdQuery =
  "SELECT * FROM posts WHERE author_id = $1";
