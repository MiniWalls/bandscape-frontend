import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import TrackDisplay from '../components/TrackDisplay';
import { testTrack } from './test-utils';

describe('TrackDisplay tests', () => {
  test('TrackDisplay renders with correct props', () => {
    const component = render(<TrackDisplay track={testTrack}/>);
    /* screen.debug(); */
    expect(component.container);
  });
  test('TrackDisplay renders artist and track name', () => {
    render(<TrackDisplay track={testTrack}/>);
    expect(screen.getByText(`${testTrack.track.artist.name} - ${testTrack.track.name}`));
  });
  test('TrackDisplay tags are rendered', () => {
    render(<TrackDisplay track={testTrack}/>);
    const trackDisplayTags = screen.queryAllByTestId('trackdisplay-tag');
    expect(trackDisplayTags).toHaveLength(2);
  });
  test('Trakdisplay cover is rendered', () => {
    render(<TrackDisplay track={testTrack}/>);
    const trackDisplayCover = screen.getByTestId('trackdisplay-cover');
    expect(trackDisplayCover).toHaveAttribute('src', testTrack.track.album?.image?.[3]['#text']);
  });
});