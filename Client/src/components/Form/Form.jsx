import React from 'react'
import styles from './Form.module.scss'
import { useState, useEffect } from 'react'

import validation from './validation.js'
import Tooltip from '../Tooltip/Tooltip'

export default function Form(props) {
    const { login } = props;

    // Estado de los campos del form
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    // estados de error
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })
    //cambios en el form
    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setUserData({ ...userData, [property]: value });
        validation({ ...userData, [property]: value }, errors, setErrors);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }

    useEffect(() => {
        validation(userData, errors, setErrors)
    }, [])
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.Form}>
                <section className={styles.section}>
                    <label htmlFor="email">Mail:</label>
                    <input type="text" name="email" value={userData.email} onChange={handleChange} />
                    <Tooltip text={errors.email}>
                        <div class="divTooltip">{errors.email ? "❌" : "✅"}</div>
                    </Tooltip>
                </section>
                <section className={styles.section}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} />
                    <Tooltip text={errors.password}>
                        <div class="divTooltip">{errors.password ? "❌" : "✅"}</div>
                    </Tooltip>    
                </section>
                <button>Submit </button>
                <Tooltip text={errors.password}>
                    <div class="divTooltip"></div>
                </Tooltip>    
            </div>
        </form>

    )
}
