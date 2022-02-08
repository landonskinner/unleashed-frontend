import {useNavigate} from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function NavBar({handleLogoutClick}) {

  const navigate = useNavigate()

  return (
    <BottomNavigation>
        <BottomNavigationAction label="Home" onClick={() => navigate('/home')} icon={<HomeIcon color="primary"/>} />
        <BottomNavigationAction label="Matches" onClick={() => navigate('/matches')} icon={<PetsIcon color="primary"/>} />
        <BottomNavigationAction label="Profile" onClick={() => navigate('/profile')} icon={<AccountCircleIcon color="primary"/>} />
        <BottomNavigationAction label="Logout" onClick={handleLogoutClick} icon={<ExitToAppIcon color="primary"/>} />
    </BottomNavigation>
  )
}

export default NavBar;
