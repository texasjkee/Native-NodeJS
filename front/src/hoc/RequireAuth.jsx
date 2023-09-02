import { Navigate, useActionData, useLoaderData, useLocation } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';

const RequireAuth = () => {
  const { children } = useLoaderData().props;
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} />
  };

  return children;
}

export default RequireAuth
