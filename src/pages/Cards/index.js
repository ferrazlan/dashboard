import React from "react";
import { Link } from "react-router-dom";
import './styles.css';
import logoCadastro from '../../assets/cadastro1.png';
import {FiXCircle} from 'react-icons/fi'

export default function Cards() {
    return(
        <div className="aluno-container">
            <header>
            <img src={logoCadastro} alt="Cadastro" />
               <span>Bem-Vindo, <strong>Fábio Ferraz</strong>!</span>
               <Link className="button" to="card/novo">Novo Card</Link>
               <button type="button">
                   <FiXCircle size={35}  color="#17202a" />
               </button>
            </header>
            <form>
              <input type='text' placeholder="Nome"/>
              <button type="button" class='button'>
                Filtrar card por nome (parcial)
                </button>
              
            </form>
        </div>
    )
}