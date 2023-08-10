import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { Provider } from 'react-redux';
import store from '../store/store';
import '@testing-library/jest-dom/extend-expect';

describe('Navbar tests', () => {
  test('Navbar should have title', () => {
    render(<Provider store={store}><NavBar /></Provider>);
    const loginElement = screen.getByText(/Bandscape/i);
    expect(loginElement).toHaveTextContent("Bandscape");
  });
  test('Navbar renders login', () => {
    render(<Provider store={store}><NavBar /></Provider>);
    const loginElement = screen.getByText(/Login/i);
    expect(loginElement).toHaveTextContent("Login");
  });
  test('Navbar should have 2 navbar-icons', () => {
    render(<Provider store={store}><NavBar /></Provider>);
    const navbarIcons = screen.queryAllByTestId('navbar-icon');
    expect(navbarIcons.length).toBe(2);
  });
  /* render(<Provider store={store}><NavBar /></Provider>);
  screen.debug(); */
});
