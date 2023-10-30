import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SITEROUTES from "../../helpers/siteroutes.helpers";

import styles from "./Detail.module.scss"


export default function Detail() {
   const [character, setCharacter] = useState({});

   const { id } = useParams();



   useEffect(() => {
      axios(`${SITEROUTES.URL}/character/${id}`)
         .then(({ data }) => {
            if (data.name) {
               setCharacter(data);
            } else {
               window.alert('No hay personajes con ese ID');
            }
         });
      return setCharacter({});
   }, [id]);

   return (
      <div >
         {character.name && (
            <Link to={SITEROUTES.HOME}>
               <div className={styles.Detail}>
                  <div className={styles.img}>
                     <img src={character.image} alt='{image}' />
                  </div>
                  <div classname={styles.data}>
                     <div>Nombre:
                        {character.name}
                     </div>
                     <div>Estado:
                        {character.status}
                     </div>
                     <div>Especie:
                        {character.species}
                     </div>
                     <div>Genero:
                        {character.gender}
                     </div>
                     <div>Origen:
                        {character.origin}
                     </div>
                  </div>
               </div>
            </Link>

         )}
      </div>
   );
}
