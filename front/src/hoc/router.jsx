import { Navigate, createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import PostPage from '../pages/PostPage';
import AboutPage from '../pages/AboutPage';
import SinglePost from '../pages/SinglePost';

// import CreatePostFail from '../components/CreatePostFail';
import Layout from '../components/Layout';

import RequireAuth from './RequireAuth';
import { fetchPost } from './fetchPost';
import { createPost } from './createPost';

import { ROUTE } from './route';

export const router = createBrowserRouter([
    {
        path: ROUTE.main,
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                //TODO: fix loading
                element: < HomePage />,
                loader: fetchPost
            },

            { path: ROUTE.posts, element: <PostPage />, },
            { path: ROUTE.postId, element: <SinglePost />, },
            {
                path: ROUTE.newPost, loader: createPost, element: <RequireAuth />,
                children: [
                    // { index: true, element: <CreatePostFail /> }
                ]
            },
            {
                path: '/about',
                element: <AboutPage />,
                children: [
                    { path: 'contact', element: <p>Our contact</p> },
                    { path: 'team', element: <p>Our team</p> }
                ]
            },
            { path: '/about-us', element: <Navigate to='/about' /> },
            { path: '/login', element: <LoginPage /> },
        ]
    },
]);

// const router = createBrowserRouter(createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//         <Route path='/' element={<HomePage />} />
//         <Route path='/posts' element={<BlogPage />} />
//         <Route path='/posts/:id' element={<SinglePost />} />
//         <Route path='/about/' element={<AboutPage />}>
//             <Route path='contact' element={<p>Our contact</p>} />
//             <Route path='team' element={<p>Our team</p>} />
//         </Route>
//         <Route path='/about-us' element={<Navigate to='/about' />} />
//         <Route path='/posts/new' element={
//             <RequireAuth>
//                 <CreatePost />
//             </RequireAuth>
//         } />
//         <Route path='login' element={<LoginPage />} />
        // <Route path='*' element={<NotFoundPage />} />
//     </Route>
// ));