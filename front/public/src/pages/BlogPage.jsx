import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  const URL = 'https://jsonplaceholder.typicode.com/posts';

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response =  await fetch(URL);
  //     const posts = await response.json();
  //     setPosts(posts);
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    fetch(URL).then(res => res.json()).then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Our NEWS</h1>
      {
        posts.map(post => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <li>{post.title}</li>
          </Link>
        ))
      }
    </div>
  );
}

export default BlogPage;

