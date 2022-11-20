import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import logoCadastro from '../../assets/cadastro1.png';
import {FiXCircle, FiEdit, FiUserX} from 'react-icons/fi'
import api from '../../services/api';

export default function Cards() {
  const [searchInput,setSearchInput]  = useState('');
  const [filtro, setFiltro] = useState([]);
  const [cards, setCards] = useState([]);
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const history = useNavigate();

  const authorization = {
      headers : {
        Authorization : `Bearer ${token}`
      }
  }

  const searchCards = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
        const dadosFiltrados = cards.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        });
        setFiltro(dadosFiltrados);
    }
    else{
        setFiltro(cards);
    }
  }

  useEffect( ()=> {
      api.get('api/Card',authorization).then(
        response=> {setCards(response.data);
        }, token)
    })

  async function logout(){
      try{
          localStorage.clear();
          localStorage.setItem('token','');
          authorization.headers ='';
          history('/'); 
      }catch(err){
        alert('Não foi possível fazer o logout' + err);
      }
    }
    
  async function editCard(id){
    try{
      history(`/tarefa/novo/${id}`);
    }catch(error){
      alert('Não foi possível editar a tarefa')
    }
  }

  async function deleteCard(id){
    try{
        if(window.confirm('Deseja excluir a tarefa de id = ' + id + ' ?'))
        {
              await api.delete(`api/Card/${id}`, authorization);
              setCards(cards.filter(card => card.id !== id));
        }
    }catch(error){
      alert('Não foi possível excluir a tarefa.')
    }
  }

    return(
        <div className="card-container">
            <header>
            <img src={logoCadastro} alt="Cadastro" />
               <span>Bem-Vindo, <strong>{email}</strong>!</span>
               <Link className="button" to="/tarefa/novo/0">Nova tarefa</Link>
               <button onClick={logout} type="button"><FiXCircle size={30}  color="#17202a"/></button>
            </header>

            <form>
              <input type='text' placeholder='Filtrar por nome...' onChange={(e) => searchCards(e.target.value)}/>
            </form>

            <h1>Relação de Tarefas</h1>
            {searchInput.length > 1 ? (
            <ul>
            {filtro.map(card => (
                <li key={card.id}>
                    <b>Nome:</b> {card.title}<br/><br/>
                    <b>Descrição:</b> {card.description}<br/><br/>
                    <b>Data Prevista:</b> {card.date_Preview}<br/><br/>

                    <button onClick={()=> editCard(card.id)} type="button"><FiEdit size="25" color="#17202a" /></button>
                    <button type="button" onClick= {()=> deleteCard(card.id)}><FiUserX size="25" color="#17202a" /></button>
                </li>
            ))}
            </ul>
            ) : (
            <ul>
            {cards.map(card => (
                <li key={card.id}>
                    <b>Nome:</b> {card.title}<br/><br/>
                    <b>Descrição:</b> {card.description}<br/><br/>
                    <b>Data Prevista:</b> {card.date_Preview}<br/><br/>

                    <button onClick={()=> editCard(card.id)} type="button"><FiEdit size="25" color="#17202a" /></button>
                    <button type="button" onClick= {()=> deleteCard(card.id)}><FiUserX size="25" color="#17202a" /></button>
                </li>
            ))}
            </ul>
            )}
        </div>
    );
}