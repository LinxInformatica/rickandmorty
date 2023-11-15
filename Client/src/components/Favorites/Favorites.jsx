import { useDispatch, connect } from "react-redux"
import { useState, useEffect } from "react";

import { filterCards, orderCards } from "../../redux/actions"
import Card from "../Card/Card"
import styles from './Favorites.module.scss'


import { CHARACTERGENDER } from "../../helpers/character.helpers";

const Favorites = (props) => {

    const { characters, onClose } = props;
    const { myFavorites } = props;
    const [myFavs, setMyFavs] = useState([])
    const dispatch = useDispatch()

    const [aux, setAux] = useState(false);

    useEffect(() => {
        dispatch(orderCards('A'))
        dispatch(filterCards(CHARACTERGENDER.ALL))
    }, [])
    // console.log('fav', characters)
    // if (characters && myFavorites) {
    //     const newFavorites = characters.filter((char) => myFavorites.includes(char.id))
    //     console.log(newFavorites)
    //     setMyFavs(newFavorites);
    // }
    // }, [characters, myFavorites]);

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
        setAux(!aux) //seteo al valor opuesto
    }

    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }

    return (
        <div>
            <div className={styles.Favorites}>
                <section>
                    <button value='A' onClick={handleOrder}>Ascendente</button>
                    <button value='D' onClick={handleOrder}>Descendente</button>
                </section>
                <section>
                    <button value={CHARACTERGENDER.ALL} onClick={handleFilter}>{CHARACTERGENDER.ALL}</button>
                    <button value={CHARACTERGENDER.MALE} onClick={handleFilter}>{CHARACTERGENDER.MALE}</button>
                    <button value={CHARACTERGENDER.FEMALE} onClick={handleFilter}>{CHARACTERGENDER.FEMALE}</button>
                    <button value={CHARACTERGENDER.GENDERLESS} onClick={handleFilter}>{CHARACTERGENDER.GENDERLESS}</button>
                    <button value={CHARACTERGENDER.UNKNOWN} onClick={handleFilter}>{CHARACTERGENDER.UNKNOWN}</button>
                </section>
                {/* <select onChange={handleOrder}>
                    <option value={CHARACTERORDER.A}>Ascendente</option>
                    <option value={CHARACTERORDER.D}>Descendente</option>
                </select>
                <select onChange={handleFilter}>
                    <option value={CHARACTERGENDER.ALL}>{CHARACTERGENDER.ALL}</option>
                    <option value={CHARACTERGENDER.MALE}>{CHARACTERGENDER.MALE}</option>
                    <option value={CHARACTERGENDER.FEMALE}>{CHARACTERGENDER.FEMALE}</option>
                    <option value={CHARACTERGENDER.GENDERLESS}>{CHARACTERGENDER.GENDERLESS}</option>
                    <option value={CHARACTERGENDER.UNKNOWN}>{CHARACTERGENDER.UNKNOWN}</option>
                </select> */}
            </div>
            <div className={styles.Favorites}>
                {
                    myFavorites.map(character => (
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

const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites,
        allCharacters: state.allCharacters
    }
}

export default connect(mapStateToProps, null)(Favorites)

//card con class
// import { connect } from 'react-redux';
// import Card from '../Card/Card';
// import styles from '../Cards/Cards.module.scss'
// import React from 'react';
// import { useState, useEffect } from 'react';

// class Favorites extends React.Component {
//     constructor(props) {
//         super(props);
//         //stados locales
//         this.state = {
//             myFavs: []
//         }
//     }
//     componentDidMount() {
//         this.updateFavorites();
//     }

//     componentDidUpdate(oldProps) {
//         if (this.props.characters !== oldProps.characters || this.props.myFavorites !== oldProps.myFavorites) {
//             this.updateFavorites()
//         }
//     }

//     updateFavorites() {

//         const { myFavorites } = this.props
//         this.setState({ myFavs: myFavorites })
//     }

//     render() {
//         const { onClose } = this.props;
//         const { myFavs } = this.state

//         return (
//             <div>
//                 <select>
//                     <option value="A">Ascendente</option>
//                     <option value="D">Descendente</option>
//                 </select>
//                 <select>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Genderless">Genderless</option>
//                     <option value="unknown">Unknounn</option>
//                 </select>
//                 <div className={styles.Cards}>
//                     {
//                         myFavs.map(character => (
//                             <Card key={character.id}
//                                 id={character.id}
//                                 name={character.name}
//                                 status={character.status}
//                                 species={character.species}
//                                 gender={character.gender}
//                                 origin={character.origin.name}
//                                 image={character.image}
//                                 onClose={onClose}
//                             />)
//                         )
//                     }
//                 </div>
//             </div>
//         );
//     }

// }

// const mapStateToProps = (state) => {
//     return {
//         myFavorites: state.myFavorites
//     }
// }

// export default connect(mapStateToProps, null)(Favorites)

