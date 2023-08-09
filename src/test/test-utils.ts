import { Track, Album } from "../api/lastfmTypes";

export const testTrack: Track = {
  track:{
    name: "testTrack",
    mbid: "testTrackMbid",
    url: "testTrackUrl",
    duration: "testDuration",
    streamable: {
      "#text": "testText",
      fulltrack: "testFullTrack"
    },
    listeners: "testListeners",
    playcount: "testPlaycount",
    artist: {
      name: "testArtist",
      mbid: "testMbid",
      url: "testUrl"
    },
    album: {
      artist: "testAlbumArtist",
      title: "testAlbum",
      mbid: "testAlbumMbid",
      url: "testAlbumUrl",
      image: [
        {
          "#text": "https://placehold.co/600x400",
          size: "small"
        },
        {
          "#text": "https://placehold.co/600x400",
          size: "medium"
        },
        {
          "#text": "https://placehold.co/600x400",
          size: "large"
        },
        {
          "#text": "https://placehold.co/600x400",
          size: "extralarge"
        }
      ],
    },
    userplaycount: "testUserPlaycount",
    userloved: "testUserLoved",
    toptags: {
      tag: [
        {
          name: "testTag",
          url: "testTagUrl"
        },
        {
          name: "testTag2",
          url: "testTagUrl2"
        }
      ]
    },
    wiki: {
      published: "testWikiPublished",
      summary: "testWikiSummary",
      content: "testWikiContent"
    }
  }
};

export const testAlbum : Album = {
  album: {
    artist: "testAlbumArtist",
    mbid: "testMbid",
    tags: {
      tag: [
        {
          name: "testTag",
          url: "testTagUrl"
        },
        {
          name: "testTag2",
          url: "testTagUrl2"
        }
      ]
    },
    playcount: "testPlaycount",
    image: [
      {
        "#text": "https://placehold.co/600x400",
        size: "small"
      },
      {
        "#text": "https://placehold.co/600x400",
        size: "medium"
      },
      {
        "#text": "https://placehold.co/600x400",
        size: "large"
      },
      {
        "#text": "https://placehold.co/600x400",
        size: "extralarge"
      }
    ],
    tracks: {
      track: [
        {
          streamable: {
            "#text": "testText",
            fulltrack: "testFullTrack"
          },
          duration: 120,
          url: "testUrl",
          name: "testTrackName1",
          "@attr": {
            rank: 1
          },
          artist: {
            url: "testUrl",
            name: "testName"
          }
        },
        {
          streamable: {
            "#text": "testText",
            fulltrack: "testFullTrack"
          },
          duration: 135,
          url: "testUrl",
          name: "testTrackName2",
          "@attr": {
            rank: 2
          },
          artist: {
            url: "testUrl",
            name: "testName"
          }
        }
      ]
    },
    url: "testAlbumUrl",
    name: "testAlbumName",
    listeners: "testAlbumListeners",
    userplaycount: "testAlbumUserPlaycount",
    wiki: {
      published: "testWikiPublished",
      summary: "testWikiSummary",
      content: "testWikiContent"
    }
  }
};