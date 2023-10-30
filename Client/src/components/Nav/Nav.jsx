import SearchBar from '../SearchBar/SearchBar.jsx';
import styles from './Nav.module.scss'
import SITEROUTES from '../../helpers/siteroutes.helpers.jsx';

import { Link } from 'react-router-dom';

export default function Nav(props) {
   const { onSearch, onRandom ,logout} = props;

   return (
      <nav className={styles.Nav}>
         <div>
            <img src={SITEROUTES.LOGO}/>
         </div>
         <div className={styles.SearchBar}>
            <SearchBar onSearch={onSearch} onRandom={onRandom} />
         </div>   
         <div>
            <Link to={SITEROUTES.HOME}>
               <button>Home</button>
            </Link>
            <Link to={SITEROUTES.FAVORITES}>
               <button>Favorites</button>
            </Link>
            <Link to={SITEROUTES.ABOUT}>
               <button>About</button>
            </Link>
            <button onClick={logout}>Logout</button>
         </div>
      </nav>
   );
}

