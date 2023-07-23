import axios from 'axios';
import { useEffect, useState } from 'react';
import PostItem from './components/PostItem';
import NavBar from './components/NavBar';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { selectAuth, login, logout } from './store/store';

type Post = {
  id: number;
  title: string;
  body: string;
  datetime: string;
  userid: number;
};

function App () {
  const auth = useSelector(selectAuth);
  const [data, setData] = useState<Post[] | null>();

  useEffect(() => {
      axios.get<Post[]>('http://localhost:3001/posts').then((response) => {
        setData(response.data);
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="max-w-6xl  mx-auto justify-center items-center">
        <h1 className="mt-16 text-4xl">Is logged in:{auth.isLoggedIn.toString()} Token:{auth.token} Userid:{auth.userId}</h1>
        <div className="mt-8 grid md:grid-cols-3 gap-6 list-none">
          {data?.map((item: Post) => ( //Map through the data and display in a list
            <li key={item.id}>
              <PostItem title={item.title} body={item.body} datetime={item.datetime} userid={item.userid} />
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
