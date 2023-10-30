import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";
import axios from "axios"
import SITEROUTES from "../helpers/siteroutes.helpers";

export const addFav = (character) => {
   const endpoint = `${SITEROUTES.URL}/fav`;

   return (dispatch) => {
      axios.post(endpoint, character).then(({ data }) => {
         return dispatch({
            type: 'ADD_FAV',
            payload: data,
         });
      });
   };
};

// sin express
// export const addFav = (character) => {
//     return {
//         type: ADD_FAV,
//         payload: character
//     }
// }
export const removeFav = (id) => {
   const endpoint = `${SITEROUTES.URL}/fav/${id}`
   return (dispatch) => {
      axios.delete(endpoint).then(({ data }) => {
         return dispatch({
            type: 'REMOVE_FAV',
            payload: data,
         });
      });
   };
};


// export const removeFav = (id) => {
//     return {
//         type: REMOVE_FAV,
//         payload: id
//     }
// }

export const filterCards = (gender) => {
   return {
      type: FILTER,
      payload: gender
   }
}

export const orderCards = (orden) => {
   return {
      type: ORDER,
      payload: orden
   }
}
