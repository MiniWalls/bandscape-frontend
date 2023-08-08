import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/store";
import { Album, Track } from "../api/lastfmTypes";
import { getAlbum, getTrack } from "../api/apiUtils";
import AlbumDisplay from "./AlbumDisplay";
import TrackDisplay from "./TrackDisplay";
import { postPost } from "../api/serverUtils";

const NewPostForm = (): JSX.Element => {
  const [isTrack, setIsTrack] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [artist, setArtist] = useState("");
  const [trackOrAlbum, setTrackOrAlbum] = useState("");
  const [lastfmAttachment, setLastfmAttachment] = useState<null | Album | Track>(null);
  const auth = useSelector(selectAuth);
  const username: string = auth.username;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    //Clear attachment or program crashes
    setLastfmAttachment(null);
    
    //False if attach track isnt selected, true if it is
    setIsTrack(value === "Attach track");
  };

  const handleCancelClick = () => {
    setLastfmAttachment(null);
  };

  const handlePostSubmit = () => {
    const postBody = {
      title: title,
      body: body,
      userid: username,
      lastfmattachment: lastfmAttachment != null ? lastfmAttachment : null
    };

    postPost(postBody)
    .then((result: string | Error) => {
      console.log(result);
    })
    .catch((error: Error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    setArtist("");
    setTrackOrAlbum("");
    }, [isTrack]);

  const handleLastFMSubmit = () => {
    setIsSubmitting(true);

    if (isTrack) {
      //Get track
      getTrack(artist, trackOrAlbum, username)
      .then((result: Track | Error) => {
        if ("track" in result) {
          setLastfmAttachment(result);
        } else {
          // It's an Error
          const error: Error = result;
          console.log(error);
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
    } else {
      //Get album
      getAlbum(artist, trackOrAlbum, username)
      .then((result: Album | Error) => {
        if ("album" in result) {
          setLastfmAttachment(result);
        } else {
          // It's an Error
          const error: Error = result;
          console.log(error);
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000); //2 seconds
  };

  //To refactor or not to refactor?
  if(username === ""){
    return(
      <div>Please log in</div>
    );
  } else {
    return(
      <form className="w-full max-w-3xl">
        <div className="flex flex-wrap -mx-3 my-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-post-title">
              Title
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
            py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
            id="grid-post-title" type="text" placeholder="New title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-post-body">
              Body
            </label>
            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
            py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-post-body" placeholder="Post body" value={body} onChange={(e) => setBody(e.target.value)}/>
              <p className="text-gray-600 text-xs italic">Make it as long as you'd like</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 justify-center">
          <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              Add from LastFM
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 
              py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              id="grid-state" onChange={handleSelectChange}>
                <option>Attach track</option>
                <option>Attach album</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 justify-center">
          <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              Artist name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
            py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-city" type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)}/>
          </div>
          <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
              {isTrack ? "Track name" : "Album name"}
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
            py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-zip" type="text" placeholder={isTrack ? "track name" : "album name"} value={trackOrAlbum} onChange={(e) => setTrackOrAlbum(e.target.value)}/>
          </div>
        </div>
        <div className="flex w-full px-3 mb-6 md:mb-0 justify-center">
          <button className="block appearance-none w-2/5 bg-lime-300 border border-gray-200 text-gray-700 
              py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mx-2
              disabled:cursor-not-allowed"
          type="button" onClick={handleLastFMSubmit} disabled={isSubmitting}>Add to post</button>
          {lastfmAttachment != null && (
            <button className="block appearance-none w-2/5 bg-red-400 border border-gray-200 text-gray-700 
            py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mx-2
            disabled:cursor-not-allowed"
            type="button" onClick={handleCancelClick}>Cancel</button>
          )}
        </div>
        <div>
          {lastfmAttachment != null && (
            isTrack ? <TrackDisplay track={lastfmAttachment as Track} /> :
            <AlbumDisplay album={lastfmAttachment as Album} />
          )}
        </div>
        <div className="flex w-full px-3 my-6 md:mb-0 justify-center">
          <button className="block appearance-none w-3/5 bg-lime-500 border border-gray-200 text-gray-700 
              py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mx-1
              disabled:cursor-not-allowed disabled:bg-lime-500 disabled:bg-opacity-20"
              type="button" disabled={title === "" || body === ""} onClick={handlePostSubmit}>Submit post</button>
        </div>
      </form>
    );
  }
};

export default NewPostForm;