import { Link } from "react-router-dom";
import styles from "../Detail/Detail.module.scss"
import SITEROUTES from "../../helpers/siteroutes.helpers";
import IMAGEN from "../../assets/yo.png"


export default function About() {
   return (
      <div >
         <Link to={SITEROUTES.HOME}>
            <div className={styles.Detail}>
               <div className={styles.name}>Nombre: Diego Fernando Lepore</div>
               <div className={styles.img}>
                  <img src={IMAGEN} alt='imagen' />
               </div>
               <div classname={styles.name}>
                  <div>Estado: Vivo</div>
                  <div>Especie: Humano</div>
                  <div>Genero: Masculino </div>
                  <div>Origen: Cordoba - Argentina - Tierra </div>
                  <div>Profesion: Ingeniero en Sistemas </div>
               </div>
            </div> 
         </Link>
      </div>
   );
}
