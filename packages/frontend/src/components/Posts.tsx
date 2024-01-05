import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query GetAuthors {
    posts {
      id
      title
    }
  }
`;

type Post = {
  id: number;
  title: string;
  authorId: number;
};

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <ul>
      {data.posts.map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default Posts;
