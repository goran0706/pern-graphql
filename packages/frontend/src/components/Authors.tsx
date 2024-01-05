import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import AuthorDetails from "./AuthorDetails";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      username
      posts {
        id
        title
      }
    }
  }
`;

const LOGIN_AUTHOR = gql`
  mutation LoginAuthor($username: String!, $password: String!) {
    loginAuthor(username: $username, password: $password) {
      success
      message
      accessToken
    }
  }
`;

type Author = {
  id: number;
  username: string;
  posts: Post[];
};

type Post = {
  id: number;
  title: string;
  authorId: number;
};

const Authors = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [authToken, setAuthToken] = useState<string>("");
  const [loginAuthor] = useMutation(LOGIN_AUTHOR);

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const { data } = await loginAuthor({
          variables: { username: "username", password: "password" },
        });

        if (data && data.loginAuthor && data.loginAuthor.accessToken) {
          setAuthToken(data.loginAuthor.accessToken);
        }
      } catch (error) {
        let msg = "";
        if (typeof error === "string") msg = error;
        if (error instanceof Error) msg = error.message;
        console.error("Error fetching auth token:", msg);
      }
    };
    fetchAuthToken();
  }, [loginAuthor]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data?.authors.map(({ id, username, posts }: Author) => (
    <div key={id}>
      <h3>{username}</h3>
      <br />
      <b>About this author: </b>
      <p>This author has {posts.length} post(s).</p>
      <br />
      {posts.map((post) => (
        <b key={post.id}>{post.title}</b>
      ))}
      <AuthorDetails userId={id} authToken={authToken} />
    </div>
  ));
};

export default Authors;
