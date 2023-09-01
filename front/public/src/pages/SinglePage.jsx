import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState();

  const URL = `https://jsonplaceholder.typicode.com/posts/${id}`;

  useEffect(() => {
    fetch(URL).then(res => res.json()).then(data => setPost(data));
  }, [id]);

  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </>
      )}
    </div>
  )
};

export default SinglePage;