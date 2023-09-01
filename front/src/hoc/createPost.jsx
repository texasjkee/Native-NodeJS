import { useNavigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';

export const createPost = () => {
  // const { signout } = useAuth();
  // const navigate = useNavigate();

  // const handlerClick = () => {
    // signout(() => navigate('/', { replace: true }));
  // };

  return (
    <div>
      <h1>Create post</h1>
      {/* <button onClick={handlerClick}>Log out</button> */}
    </div>
  )
};