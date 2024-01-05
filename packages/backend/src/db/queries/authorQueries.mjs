export const createAuthorQuery =
  "INSERT INTO authors(username, password) VALUES($1, $2) RETURNING *";

export const updateAuthorQuery =
  "UPDATE authors SET username=$1 WHERE id=$2 RETURNING *";

export const deleteAuthorQuery = "DELETE FROM authors WHERE id=$1 RETURNING *";

export const getAuthorsQuery = "SELECT * FROM authors";

export const getAuthorByIdQuery = "SELECT * FROM authors WHERE id = $1";

export const getAuthorByUsernameQuery =
  "SELECT * FROM authors WHERE username = $1";
