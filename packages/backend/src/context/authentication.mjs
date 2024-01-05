import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "your_secret_key";

const createContext = async ({ req }) => {
  const authorization = req.headers.authorization || "";

  // Check if the request is for introspection query or registerAuthor mutation
  if (
    req.body.operationName === "IntrospectionQuery" ||
    req.body.operationName === "RegisterAuthor" ||
    req.body.operationName === "LoginAuthor" ||
    req.body.operationName === "GetAuthors"
  ) {
    // If it is, don't verify the JWT
    return {};
  }

  try {
    // Verify the JWT for all other queries/mutations
    const user = jwt.verify(authorization.replace("Bearer ", ""), secretKey);

    // Access the decoded payload
    return { user };
  } catch (error) {
    // Handle token verification error
    console.error("JWT verification failed:", error.message);
    throw new Error("Invalid token");
  }
};

export { createContext };
