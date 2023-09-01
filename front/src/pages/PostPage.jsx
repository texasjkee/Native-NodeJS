import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const URL = 'https://jsonplaceholder.typicode.com/posts';

  const ORDER_TYPE = {
    asc: '0',
    desc: '1'
  };

  //? So long :(
  // useEffect(() => {
  //   const fetchPosts = async () => {
  // const response =  await fetch(URL);
  //     const posts = await response.json();
  //     setPosts(posts);
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    fetch(URL).then(res => res.json()).then(data => setPosts(data))
  }, []);

  const handlerOnChange = (event) => {
    const { value } = event.target;

    searchParams.set('order', value);
    setSearchParams(searchParams);
  };
  
  const ordering = searchParams.get('order') ?? 'asc';
 
  const sorter = (posts, sortType) => {
    return posts.sort((a, b) => {
     return sortType === ORDER_TYPE.asc ? a.id - b.id : b.id - a.id
    });
  };

  const sortedPosts = sorter(posts, ordering);

  return (
    <div>
      <NavLink to='/posts/new'>Add new post</NavLink>

      <label htmlFor="order">Ordering</label>
      <select style={{ marginLeft: '2rem' }} name="order" id="Order"
        onChange={handlerOnChange}
      >
        <option value={ORDER_TYPE.desc}>Descending</option>
        <option value={ORDER_TYPE.asc}>Ascending</option>
      </select>

      <h1>Our NEWS</h1>
      {
        posts.map(post => (
          <NavLink key={post.id} to={`/posts/${post.id}`}>
            <li>Data:{post.id} {post.title}</li>
          </NavLink>
        ))
      }
    </div>
  );
}

export default PostPage;