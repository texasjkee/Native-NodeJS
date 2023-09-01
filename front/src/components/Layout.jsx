import { Outlet, useNavigation } from 'react-router-dom';
import CustomLink from './CustomLink';

const Layout = () => {
  const { state } = useNavigation();

  return (
    <>
    {state === 'loading' ? <h1 role='loading'>Loading...</h1> : null}
      <header>
        <ul>
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
          <li>
            <CustomLink to="/posts">Blog</CustomLink>
          </li>
          <li>
            <CustomLink to="/about">About</CustomLink>
          </li>
        </ul>
      </header>
      <Outlet />
      <footer>2021</footer>
    </>
  );
};

export default Layout;