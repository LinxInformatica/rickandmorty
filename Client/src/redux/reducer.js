import { ADD_FAV, REMOVE_FAV, FILTER, ORDER, SET_USERID, GET_FAV } from "./action-types";
import { CHARACTERGENDER } from "../helpers/character.helpers";

const initialState = {
  myFavorites: [],
  allCharacters: [],
  userId: 0,
  userName: ''
}

export default (state = initialState, { type, payload }) => {
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
      return { ...state, myFavorites: payload, allCharacters: payload };
    // sin express
    // return {
    //   ...state,
    //   myFavorites: state.myFavorites.filter((myFavorite) => myFavorite.id !== parseInt(payload)),
    //   allCharacters: state.allCharacters.filter((char) => char.id !== parseInt(payload))
    // }
    case FILTER:
      let favs = []
      payload === CHARACTERGENDER.ALL
        ? favs = [...state.allCharacters]
        : favs = [...state.allCharacters].filter((char) => char.gender === payload)

      return {
        ...state,
        myFavorites: favs
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
    case GET_FAV:
      return { ...state, myFavorites: payload, allCharacters: payload };

    case SET_USERID:
      const { userId, email } = payload
      return { ...state, userId: userId, userName: email };

    default:
      return { ...state }
  }
}
