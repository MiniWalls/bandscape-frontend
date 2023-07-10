import { FC } from "react";

type Props = {
  title: string;
  body: string;
};

const Post: FC<Props> = ({ title, body }) => {
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
};

export default Post;