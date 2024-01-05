import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "./index.mjs";
import * as authorQueries from "./queries/authorQueries.mjs";

const secretKey = process.env.JWT_SECRET_KEY || "your_secret_key";

const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (plainText, hash) => {
  return await bcrypt.compare(plainText, hash);
};

const authenticateUser = async (username, password) => {
  const user = await getAuthorByUsername(username);
  if (!user || !(await comparePassword(password, user.password))) {
    return null;
  }
  return user;
};

const generateAuthToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "1h",
  });
};

const unauthorizedResponse = (user, id) => {
  if (user.id !== parseInt(id)) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
};

const registerAuthor = async (username, password) => {
  try {
    const hashedPassword = await hashPassword(password);
    authorQueries.createAuthor(username, hashedPassword);
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Error registering user:", error.message);
    return { success: false, message: "Registration failed" };
  }
};

const loginAuthor = async (username, password) => {
  try {
    const user = await authenticateUser(username, password);
    if (!user) {
      return { success: false, message: "Unauthenticated" };
    }
    return {
      success: true,
      message: "User logged in successfully",
      accessToken: generateAuthToken(user),
    };
  } catch (error) {
    console.error("Error logging user:", error.message);
    return { success: false, message: "Login failed" };
  }
};

const createAuthor = async (username, password) => {
  const client = await pool.connect();
  try {
    const result = await client.query(authorQueries.createAuthorQuery, [
      username,
      password,
    ]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateAuthor = async (user, id, username) => {
  unauthorizedResponse(user, id);
  const client = await pool.connect();
  try {
    const result = await client.query(authorQueries.updateAuthorQuery, [
      username,
      id,
    ]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteAuthor = async (user, id) => {
  unauthorizedResponse(user, id);
  const client = await pool.connect();
  try {
    const result = await client.query(authorQueries.deleteAuthorQuery, [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const getAuthors = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(authorQueries.getAuthorsQuery);
    return result.rows;
  } finally {
    client.release();
  }
};

const getAuthorById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(authorQueries.getAuthorByIdQuery, [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const getAuthorByUsername = async (username) => {
  const client = await pool.connect();
  try {
    const result = await client.query(authorQueries.getAuthorByUsernameQuery, [
      username,
    ]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

export default {
  registerAuthor,
  loginAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthors,
  getAuthorById,
  getAuthorByUsername,
};
