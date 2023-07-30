import PostItem from "../components/PostItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectAuth } from "../store/store";

type Post = {
  id: number;
  title: string;
  body: string;
  datetime: string;
  userid: number;
};

const Home = (): JSX.Element => {
  const auth = useSelector(selectAuth); //sets auth to be the state from the store
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
    <div className="max-w-6xl  mx-auto justify-center items-center">
      <h1 className="mt-16 text-4xl">Is logged in:{auth.isLoggedIn.toString()} Token:{auth.token} Username:{auth.username}</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-6 list-none">
        {data?.map((item: Post) => ( //Map through the data and display in a list
          <li key={item.id}>
            <PostItem title={item.title} body={item.body} datetime={item.datetime} userid={item.userid} />
          </li>
        ))}
      </div>
    </div>
  );
};

export default Home;