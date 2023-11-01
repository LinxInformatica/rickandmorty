import './App.scss';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav.jsx';
import Detail from './components/Detail/Detail.jsx'
import About from './components/About/About.jsx'
import Form from './components/Form/Form.jsx'
import Favorites from './components/Favorites/Favorites';

import SITEROUTES from './helpers/siteroutes.helpers'
import { TOTALCHARACTERS } from './helpers/character.helpers';

export default function App() {
   //const EMAIL = 'diegolepore01@gmail.com'
   //const PASSWORD = '987654'

   // estado para los characters
   const [characters, setCharacters] = useState([]);

   //estado para simular seguridad
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);

   async function login(userData) {

      const { email, password } = userData;
      const URL = SITEROUTES.URL + '/login';

      try {
         const { data } = await axios(URL + `?email=${email}&password=${password}`)
         setAccess(data.access);
         data.access && navigate('/home') 

      } catch (error) {
         window.alert('Error de acceso')
      }
   };

   // von promesas
   // function login(userData) {
   //    const { email, password } = userData;
   //    const URL = SITEROUTES.URL + '/login';
   //    axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
   //       const { access } = data;
   //       setAccess(data);
   //       access && navigate('/home');
   //    });
   // }
   // sin Express
   //const login = (userData) => {
   // if (userData.email === EMAIL && userData.password == PASSWORD) {
   //    setAccess(true);
   //    navigate(SITEROUTES.HOME);
   // } else {
   //    window.alert('Datos invalidos')
   // }

   const logout = () => {
      setAccess(false);
      setCharacters([]);
      navigate(SITEROUTES.FORM);
   }

   // devuelve si el caracter existe      
   const characterExists = (id) => characters.find((character) => character.id === parseInt(id))

   //con async await
   async function onFetch(id) {
      try {
         const { data } = await axios(`${SITEROUTES.URL}/character/${id}`)
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         }

      } catch (error) {
         window.alert(error);
      }

   }

   //busca el la api
   // con promesas
   // const onFetch = (id) => {
   //    fetch(`${SITEROUTES.URL}/character/${id}`)
   //       .then((res) => {
   //          if (!res.ok) {
   //             throw new Error('No hay personajes con ese id!')
   //          }
   //          return res.json()
   //       })
   //       .then((data) => {
   //          if (data.name) {
   //             setCharacters((oldChars) => [...oldChars, data]);
   //          } else {
   //             window.alert('¡No hay personajes con este ID!');
   //          }
   //       })
   //       .catch((error) => {
   //          window.alert(error);
   //       })
   // }

   const onSearch = (id) => {
      if (characterExists(id) === undefined) {
         onFetch(id);
      } else {
         window.alert(`¡Personaje ${id} Repetido!`);
      }
   }

   //devuelve un numero random
   const randomId = () => Math.floor(Math.random() * TOTALCHARACTERS + 1);

   const onRandom = () => {

      if (characters.length === TOTALCHARACTERS) {
         window.alert('No quedan mas personajes para seleccionar')
         return
      }
      let id = randomId();
      while (characterExists(id) !== undefined) {
         console.log(id)
         id = randomId();
      }
      console.log(id);
      onFetch(id);
   }

   const onClose = (id) => {
      const filteredCharacters = characters.filter(character => character.id !== parseInt(id));
      setCharacters(filteredCharacters);

   }

   const location = useLocation();

   return (
      <div className='App'>
         {useEffect(() => {
            !access && navigate(SITEROUTES.FORM);
         }, [access])}

         {/* RENDER CONDICIONAL */}
         {location.pathname !== SITEROUTES.FORM &&
            <div>
               <Nav onSearch={onSearch} onRandom={onRandom} logout={logout} />
            </div>
         }
         <Routes>
            <Route path={SITEROUTES.FORM} element={<Form login={login} />} />
            <Route path={SITEROUTES.HOME} element={<Cards characters={characters} onClose={onClose} />} />
            <Route path={SITEROUTES.ABOUT} element={<About />} />
            <Route path={SITEROUTES.DETAIL} element={<Detail />} />
            <Route path={SITEROUTES.FAVORITES} element={<Favorites onClose={onClose} />} />
         </Routes>
      </div>
   );
};



