import { Outlet } from 'react-router-dom';
import CustomLink from './CustomLink';

const Layout = () => {
  return (
    <>
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