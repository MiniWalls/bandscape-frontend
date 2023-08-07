import { Album } from "../api/lastfmTypes";

const AlbumDisplay = ({ album }: { album: Album }) => {
  const { name, artist, image, tags, userplaycount } = album.album as {
    name: string;
    artist: string;
    image?: { size: string; "#text": string }[];
    tags?: { tag?: { name: string; url: string }[] };
    userplaycount: string;
  };

  return(
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3 flex flex-col items-center">
        <h1>{artist} - {name}</h1>
        <div className="flex flex-wrap">
          <p className="mr-1">Tags:</p>
          {/* I apologize for everyone reading this code. In this loop the tags are looped and shown with commas.
          I have also cheated whitespace with inline css by giving right margin to the span elements with , in them */}
          {tags?.tag?.slice(0, 3).map((tag: { name: string; url: string }, index: number) => (
            <p key={tag.name} className="inline">
              {tag.name}
              {index < 3 - 1 ? <span className="mr-1">,</span> : ''}
            </p>
          ))}
        </div>
        <img src={image?.[3]?.["#text"]} alt="Album cover" />
        <p className="mt-2">User plays: {userplaycount}</p>
      </div>
    </div>
  );
};

export default AlbumDisplay;