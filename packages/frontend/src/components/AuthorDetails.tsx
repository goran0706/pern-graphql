import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";

const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($updateAuthorId: ID!, $username: String!) {
    updateAuthor(id: $updateAuthorId, username: $username) {
      id
      username
    }
  }
`;

const AuthorDetails = ({
  userId,
  authToken,
}: {
  userId: number;
  authToken: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateAuthor, { data, loading, error }] = useMutation(UPDATE_AUTHOR);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateAuthor({
            variables: {
              updateAuthorId: userId,
              username: inputRef.current?.value,
            },
            context: {
              headers: {
                authorization: `Bearer ${authToken}`,
              },
            },
          });
        }}
      >
        <input ref={inputRef} />
        <button type="submit">Update Author</button>
      </form>
      {data && <p>Updated username: {data.updateAuthor.username}</p>}
    </div>
  );
};

export default AuthorDetails;
