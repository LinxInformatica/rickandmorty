import styles from './SearchBar.module.scss'
import { useState } from 'react';

export default function SearchBar({onSearch,onRandom}) {
   

   const [id,setId] = useState('')

   const handleChange = (event)=>{
      setId(event.target.value);
   }

   const clickSearch = () => {
      onSearch(id);
      setId("");

   }

   return (
      <nav className={styles.SearchBar}>
         <div>
            <input name='search' 
               type='search' 
               onChange={handleChange}
               value={id}>
            </input>

            <button name='button' 
               type='button'
               onClick={() => clickSearch()}>Agregar
            </button>
            <button name='random' 
               type='button'
               onClick={() => onRandom()}>Random
            </button>
         </div>
      </nav>   
   );
}
