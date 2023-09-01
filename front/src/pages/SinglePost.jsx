import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {ROUTE} from '../hoc/route';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const navigate = useNavigate();

  const URL = `https://jsonplaceholder.typicode.com/posts/${id}`;

  useEffect(() => {
    fetch(URL).then(res => res.json()).then(data => setPost(data));
  }, [id]);
  
  const handlerClick = () => navigate(-1);

  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </>
      )}
      <button onClick={handlerClick}> Go back </button>
    </div>
  );
};

export default SinglePost;