export interface Tag {
  url: string;
  name: string;
}

interface Toptags {
  tag: Tag[];
}

export interface Image {
  size: string;
  "#text": string;
}

interface Streamable {
  fulltrack: string;
  "#text": string;
}

interface Artist {
  url: string;
  name: string;
  mbid?: string;
}

//This is for track which are returned from the album api
interface AlbumTrack {
  streamable: Streamable;
  duration: number;
  url: string;
  name: string;
  "@attr": {
    rank: number;
  };
  artist: Artist;
}

interface AlbumTracks {
  track: AlbumTrack[];
}

interface Wiki {
  published: string;
  summary: string;
  content: string;
}

//For the whole album json
export interface Album {
  album: {
    artist: string;
    mbid?: string;
    tags?: {
      tag: Tag[];
    };
    playcount: string;
    image?: Image[];
    tracks: AlbumTracks;
    url: string;
    name: string;
    listeners: string;
    userplaycount: string;
    wiki?: Wiki;
  };
}

//For the whole track json
export interface Track {
	track: {
		name: string;
		mbid?: string;
		url: string;
		duration: string;
		streamable: Streamable;
		listeners: string;
		playcount: string;
		artist: Artist;
		album?: {
			artist: string;
			title: string;
			mbid?: string;
			url: string;
			image?: Image[];
		};
		userplaycount: string;
		userloved: string;
		toptags?: Toptags;
		wiki?: Wiki;
	};
}