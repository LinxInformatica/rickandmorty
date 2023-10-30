import Card from '../Card/Card';
import styles from './Cards.module.scss'

export default function Cards(props) {

   const { characters, onClose} = props;

   return (
      <div>
          <div className={styles.Cards}>
            {  
               characters.map(character => (
                  <Card key={character.id}
                     id={character.id}
                     name={character.name}
                     status={character.status}
                     species={character.species}
                     gender={character.gender}
                     origin={character.origin}
                     image={character.image}
                     onClose={onClose}
                  />)
               )
            }
         </div>
      </div>
   );
}
