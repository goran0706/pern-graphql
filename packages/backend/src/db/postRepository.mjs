import pool from "./index.mjs";
import * as postQueries from "./queries/postQueries.mjs";

const unauthorizedResponse = (user, id) => {
  if (user.id !== parseInt(id)) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
};

const createPost = async (title, authorId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(postQueries.createPostQuery, [
      title,
      authorId,
    ]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updatePost = async (user, id, title) => {
  unauthorizedResponse(user, id);
  const client = await pool.connect();
  try {
    const result = await client.query(postQueries.updatePostQuery, [title, id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deletePost = async (user, id) => {
  unauthorizedResponse(user, id);
  const client = await pool.connect();
  try {
    const result = await client.query(postQueries.deletePostQuery, [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const getPosts = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(postQueries.getPostsQuery);
    return result.rows;
  } finally {
    client.release();
  }
};

const getPostByAuthorId = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(postQueries.getPostByAuthorIdQuery, [id]);
    return result.rows;
  } finally {
    client.release();
  }
};

export default {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostByAuthorId,
};
