import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import AlbumDisplay from "../components/AlbumDisplay";
import { testAlbum } from "./test-utils";

describe('AlbumDisplay tests', () => {
  test('AlbumDisplay renders correctly', () => {
    const component = render(<AlbumDisplay album={testAlbum} />);
    screen.debug();
    expect(component.container);
  });
  test('AlbumDisplay renders artist and album name', () => {
    render(<AlbumDisplay album={testAlbum} />);
    expect(screen.getByText(`${testAlbum.album.artist} - ${testAlbum.album.name}`));
  });
  test('AlbumDisplay tags are rendered correctly', () => {
    render(<AlbumDisplay album={testAlbum} />);
    const albumDisplayTags = screen.getAllByTestId('albumdisplay-tag');
    expect(albumDisplayTags).toHaveLength(2);
  });
  test('AlbumDisplay cover is rendered correctly', () => {
    render(<AlbumDisplay album={testAlbum} />);
    const albumDisplayCover = screen.getByTestId('albumdisplay-cover');
    expect(albumDisplayCover).toHaveAttribute('src', testAlbum.album.image?.[3]?.["#text"]);
  });
  /* render(<AlbumDisplay album={testAlbum} />);
  screen.debug(); */
});