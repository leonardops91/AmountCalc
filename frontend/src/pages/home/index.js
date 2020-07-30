import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './style.css';

export default function Home() {
    return(
        <div className="container-home">
            <div className="container-menu">
                <img src={logo} alt="Amount calc"/>
                <h1>Calculadora de juros compostos</h1>
                <h2>escolha o tipo de cálculo</h2>
                <div className="container-buttons">
                    <Link to="/simple">Juros simples</Link>
                    <Link to="/compound">Juros compostos</Link>
                </div>
            </div>
        </div>
    )
}