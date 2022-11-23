import React, {useState, useEffect} from 'react';
import './styles.css';
import {FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import {Link, useNavigate, useParams} from 'react-router-dom';
import api from '../../services/api';

export default function NovoCard(){
    const [id,setId] = useState(null);
    const [title, setNome] = useState('');
    const [description, setDescription] = useState('');
    const [date_Preview, setDate] = useState('');
    const {cardId} = useParams();
    const history = useNavigate();
    const token = localStorage.getItem('token');
    const authorization = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }

    useEffect(()=>{
        if(cardId === '0')
          return;
        else
            loadCard();
    },[cardId])

     async function loadCard(){
        try{
          const response = await api.get(`api/Card/${cardId}`,authorization) ;
 
          setId(response.data.id);
          setNome(response.data.title);
          setDescription(response.data.description);
          setDate(response.data.date_Preview);
        }catch(error){
          alert('Erro ao recuperar a tarefa ' + error)
          history('/tarefas');
        }
     }

     async function saveOrUpdate(event) {
        event.preventDefault();
        const data = {
           title,
           description,
           date_Preview
        }

        try{
          if(cardId === '0')
          {
             await api.post('api/Card',data,authorization);
          }
          else
          {
             data.id= id;
             await api.put(`api/Card/${id}`,data,authorization);
          }
        }catch(error){
           alert('Erro ao gravar a tarefa ' + error)
        }
        history('/tarefas');
    }

    return(
        <div className="novo-card-container">
           <div className="content">
            <section className="form"><FiUserPlus size="105" color="#17202a"/>
                <h1>{cardId === '0'? 'Incluir Novo Card' : 'Atualizar Card'}</h1>
                <Link className="back-link" to="/tarefas"><FiCornerDownLeft size="25" color="#17202a"/>Retornar</Link>
            </section>
            
            <form onSubmit={saveOrUpdate}>
               <input  placeholder="Nome" value={title} onChange= {e=> setNome(e.target.value)}/>
               <input  placeholder="Descrição" value={description} onChange= {e=> setDescription(e.target.value)}/>
               <input  placeholder="Data Prevista (dd/mm/aaaa)" value={date_Preview} onChange= {e=> setDate(e.target.value)}/>
               <button className="button" type="submit">{cardId === '0'? 'Incluir ' : 'Atualizar '}</button>
            </form>
           </div>
        </div>
    );
}