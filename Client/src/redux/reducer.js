import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";
import { CHARACTERGENDER } from "../helpers/character.helpers";

const initialState = {
  myFavorites: [],
  allCharacters: []
}

export default (state = initialState, {type,payload}) => {
  switch (type) {
    case ADD_FAV:
      return { ...state, myFavorites: payload, allCharacters: payload };
      //sin express
      // return {
      //   ...state,
      //   myFavorites: [...state.myFavorites, payload],
      //   allCharacters: [...state.allCharacters, payload]
      // }
    case REMOVE_FAV:
      return { ...state, myFavorites: payload };
      // sin express
      // return {
      //   ...state,
      //   myFavorites: state.myFavorites.filter((myFavorite) => myFavorite.id !== parseInt(payload)),
      //   allCharacters: state.allCharacters.filter((char) => char.id !== parseInt(payload))
      // }
    case FILTER:
      return {
        ...state,
        myFavorites: payload === CHARACTERGENDER.ALL ? [...state.allCharacters]
                                                            : [...state.allCharacters].filter((char) => char.gender === payload)
      }
    case ORDER:
      switch (payload) {
        case 'A':
          return {
            ...state,
            myFavorites: [...state.myFavorites].sort((a, b) => a.id - b.id)
          }
        case 'D':
          return {
            ...state,
            myFavorites: [...state.myFavorites].sort((a, b) => b.id - a.id)
          }

        default:
          return {
            ...state
          }
      }
    default:
      return { ...state }
  }
}
