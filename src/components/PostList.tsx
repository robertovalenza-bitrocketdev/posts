import { useEffect, useState } from "react";

export const PostList = () => {
  const [postList, setPostList] = useState<any[]>([]);
  const [commentList, setCommentList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    const fetchPostList = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const responseJSON = await response.json();
      setPostList(responseJSON);
    };

    fetchPostList();
  }, []);

  useEffect(() => {
    const fetchDescription = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const responseJSON = await response.json();
      setCommentList(responseJSON);
    };

    fetchDescription();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const responseJSON = await response.json();
      setUserList(responseJSON);
    };

    fetchUser();
  }, []);

  return (
    <>
      {postList.map((post) => {
        const username = userList.filter((user) => user.id === post.userId);
        const description = commentList.filter(
          (comment) => comment.postId === post.id
        );

        return (
          <div className="wrapContainer">
            <p className="username">{username.map((el) => el.name)}</p>
            <p className="postTitle" key={post.userId}>
              {post.title}
            </p>
            <p className="postBody">{post.body}</p>
            <h2>Commenti:</h2>
            {description.map((el) => (
              <p className="comment">- {el.body}</p>
            ))}
          </div>
        );
      })}
    </>
  );
};
