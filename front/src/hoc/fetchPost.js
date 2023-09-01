export const fetchPost = ({ params }) => {
 
  return new Promise(res => {
    setTimeout(() =>
        res({
          name: "My post",
          // id: params.postId 
          id: 20
        }),
      500);
  });
};