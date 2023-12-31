import { BsYinYang, BsSuitHeartFill/* , BsFillGearFill */ } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, login, logout } from '../store/store';

const NavBar = (): JSX.Element => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();

    function handleClick() {
        if(auth.isLoggedIn) {
            dispatch(logout());
            document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
            dispatch(login(["token", "userid"]));
            location.href= process.env.REACT_APP_SERVER_URL as string + "auth/login";
        }
    }

    return(
        <div className="fixed top-0 w-screen h-16 m-0
        flex flex-row
        text-3xl bg-gray-400 text-white shadow-lg">
            <h1 className="font-bold text-gray-800 mr-5 ml-4 
            relative flex items-center hover:cursor-pointer" onClick={() => window.location.href="/"}>
                Bandscape</h1>
            <NavBarIcon icon={<BsSuitHeartFill size="28"/>} url="home" />
            <NavBarIcon icon={<BsYinYang size="28"/>} url="post" />
            {/* <NavBarIcon icon={<BsFillGearFill size="28"/>} url="settings" /> */}
            <button className="ml-auto mr-4 text-left text-xl" onClick={() => handleClick()}>
                {auth.isLoggedIn ? `Logout(${auth.username})` : 'Login'}
            </button>
        </div>
    );
};

const NavBarIcon = ({ icon, url }: { icon: JSX.Element, url: string }): JSX.Element => {
    const handleClick = () => {
        window.location.href = url;
    };

    return(
        <div className="navbar-icon group" data-testid="navbar-icon" id={url} onClick={handleClick}>
            {icon}
        </div>
    );
};

export default NavBar;