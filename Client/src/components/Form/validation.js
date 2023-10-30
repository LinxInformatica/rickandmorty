import React from 'react'
import REGEXP from '../../helpers/regexp.helpers'

const validation = (userData, errors, setErrors) => {
    const newErrors=errors

    // validar email
    if (!userData.email) {
        newErrors.email='Ingrese el Mail';
    } else {
        if (!REGEXP.MAIL.test(userData.email)) {
            newErrors.email= 'El email no es valido';
        } else {
            if (userData.email.length > 35) {
                newErrors.email='El email no debe exceder los 35 caracteres' ;
            } else newErrors.email='' ;
        }
    }
    //validar password
    if (!userData.password) {
        newErrors.password='Ingrese la Contraseña' ;
    } else {
        if (userData.password.length < 6 || userData.password.length > 10) {
            newErrors.password='La contraseña debe tener entre 6 y 10 caracteres' ;
        } else {
            if (!REGEXP.TIENENUMERO.test(userData.password)) {
                newErrors.password='La contraseña deberia tener por lo menos un numero' ;
            } else newErrors.password='';
        }
    }
    
    setErrors(newErrors);
}

export default validation;