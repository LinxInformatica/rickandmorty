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
        password: "",
        register: false,
        validatePassword: ""
    })
    // estados de error
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        register: "",
        validatePassword: ""
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

    const handleRegister = (event) => {
        if (!userData.register) {
            setUserData({ ...userData, register: true });
            validation({ ...userData, register: true }, errors, setErrors);
        } else {
            event.preventDefault();
            login(userData);
            setUserData({ ...userData, register: false });
        }
    }

    useEffect(() => {
        validation(userData, errors, setErrors)
    }, [userData])
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

                {userData.register ? (
                    <section className={styles.section}>
                        <label htmlFor="validatePassword">Repeat Password:</label>
                        <input type="password" name="validatePassword" value={userData.validatePassword} onChange={handleChange} />
                        <Tooltip text={errors.validatePassword}>
                            <div class="divTooltip">{errors.validatePassword ? "❌" : "✅"}</div>
                        </Tooltip>
                    </section>
                ) : null}

                <button className={styles.buttonSubmit} onClick={handleSubmit}>Login </button>
                <button className={styles.buttonRegister} onClick={handleRegister}>New User</button>

                <Tooltip text={errors.password}>
                    <div class="divTooltip"></div>
                </Tooltip>
            </div>
        </form>

    )
}
