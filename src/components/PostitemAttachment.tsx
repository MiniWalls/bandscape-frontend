import { Album, Track } from "../api/lastfmTypes";

interface ComponentProps {
  lastfmattachment: Album | Track;
}

const PostItemAttachment = (props: ComponentProps): JSX.Element => {
  const { lastfmattachment } = props;

  if("track" in lastfmattachment){
    return(
      <div>
        <div>
          <img className="h-16 w-full object-cover text-red-400" src={lastfmattachment.track.album?.image?.[3]?.["#text"]} alt="Track cover not found" />
        </div>
        <div>
          {lastfmattachment.track.name}
          &nbsp;-&nbsp;
          {lastfmattachment.track.artist.name}
        </div>
      </div>
    );
  } else if ("album" in lastfmattachment){
    return(
      <div>
        <div>
          <img className="h-16 w-full object-cover" src={lastfmattachment.album.image?.[3]["#text"]} alt="Album cover not found" />
        </div>
        <div>
          {lastfmattachment.album.name}
          &nbsp;-&nbsp;
          {lastfmattachment.album.artist}
        </div>
      </div>
    );
  } else {
    return(
      <div>Invalid album or track</div>
    );
  }
};

export default PostItemAttachment;