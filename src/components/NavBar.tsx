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
        }
    }

    return(
        <div className="fixed top-0 w-screen h-16 m-0
        flex flex-row
        text-3xl bg-gray-400 text-white shadow-lg">
            <h1 className="font-bold text-gray-800 mr-5 ml-1 
            relative flex items-center">
                Bandscape</h1>
            <NavBarIcon icon={<BsYinYang size="28"/>} />
            <NavBarIcon icon={<BsSuitHeartFill size="28"/>} />
            <NavBarIcon icon={<BsFillGearFill size="28"/>} />
            <button className="ml-auto mr-4 text-left" onClick={() => handleClick()}>
                {auth.isLoggedIn ? 'Logout' : 'Login'}
            </button>
        </div>
    );
};

const NavBarIcon = ({ icon }: { icon: JSX.Element }): JSX.Element => {
    return(
        <div className="navbar-icon group">
            {icon}
        </div>
    );
};

export default NavBar;