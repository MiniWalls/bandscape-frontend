import axios from 'axios';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
  creation_time: string;
  userid: number;
};

function App () {
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
    <div className="App">
      <h1>Hello world</h1>
      {data?.map((item: Post) => (
        <li key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </li>
      ))}
    </div>
  );
}

export default App;
