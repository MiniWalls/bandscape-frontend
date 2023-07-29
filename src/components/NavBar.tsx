import { BsYinYang, BsSuitHeartFill, BsFillGearFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, login, logout } from '../store/store';

const NavBar = (): JSX.Element => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();

    function handleClick() {
        if(auth.isLoggedIn) {
            dispatch(logout());
        } else {
            dispatch(login(["token", "userid"]));
            location.href="http://localhost:3001/login";
        }
    }

    return(
        <div className="fixed top-0 w-screen h-16 m-0
        flex flex-row
        text-3xl bg-gray-400 text-white shadow-lg">
            <h1 className="font-bold text-gray-800 mr-5 ml-1 
            relative flex items-center hover:cursor-pointer" onClick={() => window.location.href="/"}>
                Bandscape</h1>
            <NavBarIcon icon={<BsYinYang size="28"/>} url="explore" />
            <NavBarIcon icon={<BsSuitHeartFill size="28"/>} url="me" />
            <NavBarIcon icon={<BsFillGearFill size="28"/>} url="settings" />
            <button className="ml-auto mr-4 text-left" onClick={() => handleClick()}>
                {auth.isLoggedIn ? 'Logout' : 'Login'}
            </button>
        </div>
    );
};

const NavBarIcon = ({ icon, url }: { icon: JSX.Element, url: string }): JSX.Element => {
    const handleClick = () => {
        window.location.href = url;
    };

    return(
        <div className="navbar-icon group" onClick={handleClick}>
            {icon}
        </div>
    );
};

export default NavBar;