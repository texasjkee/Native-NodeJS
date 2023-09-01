import { useLoaderData, useNavigation } from 'react-router-dom';

const HomePage = () => {
  const { name, id } = useLoaderData();
  const { state } = useNavigation();

  console.log(state, 'HomePage');
  return (
    <div>
      <h1>Home</h1>
      {state === 'loading' ? 'Loading...' : null}
      <h2> {name} </h2>
      <h3>{id}</h3>
    </div>
  )
}

export default HomePage;