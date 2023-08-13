import PostItem from "../components/PostItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/store";
import axios from "axios";


type Post = {
  id: number;
  title: string;
  body: string;
  datetime: string;
  userid: number;
  lastfmattachment: null;
};

const Home = (): JSX.Element => {
  const auth = useSelector(selectAuth); //sets auth to be the state from the store
  const [data, setData] = useState<Post[] | null>();

  useEffect(() => {
    axios.get<Post[]>(process.env.REACT_APP_SERVER_URL as string + 'posts').then((response) => {
      setData(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
}, []);

  return (
    <div className="md:max-w-6xl  mx-auto justify-center items-center mb-10">
      <div className="mt-24 grid sm:grid-cols-1 md:grid-cols-3 gap-6 list-none">
        {data?.map((item: Post) => ( //Map through the data and display in a list
          <li key={item.id}>
            <PostItem title={item.title} body={item.body} datetime={item.datetime} userid={item.userid} lastfmattachment={item.lastfmattachment} />
          </li>
        ))}
      </div>
    </div>
  );
};

export default Home;