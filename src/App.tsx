import NavBar from './components/NavBar';
import { Provider } from 'react-redux';
import store from './store/store';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Ownposts from './pages/Ownposts';
import Explore from './pages/Explore';
import Auth from './pages/Auth';
import InitializationComponent from './components/InitializationComponent';

function App () {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/me" element={<Ownposts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

const AppWrapper = () => (
  <Provider store={store}>
    <InitializationComponent />
    <App />
  </Provider>
);

export default AppWrapper;
