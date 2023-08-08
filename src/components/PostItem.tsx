import { Album, Track } from "../api/lastfmTypes";
import PostItemAttachment from "./PostitemAttachment";
import PostItemDialog from "./PostitemDialog";

interface ComponentProps {
  title: string;
  body: string;
  datetime: string;
  userid: number;
  lastfmattachment: null | Album | Track;
}

const PostItem = (props: ComponentProps): JSX.Element => {
  return (
    <div className="">
      <PostItemDialog {...props}>
        <div className="post-item group border-grey-300 border-x-2 border-y-2">
          <div>
            {props.lastfmattachment != null && (
              <PostItemAttachment lastfmattachment={props.lastfmattachment} />
            )}
          </div>
          <h1 className="bg-orange-100 line-clamp-1">{props.title}</h1>
          <p className="line-clamp-2">{props.body}</p>
          <p>{props.datetime}</p>
          <p>{props.userid}</p>
        </div>
      </PostItemDialog>
    </div>
  );
};

export default PostItem;