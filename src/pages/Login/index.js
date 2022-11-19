import React from 'react';
import './styles.css';
import logoImage from '../../assets/login.png';

export default function Login() {
    return (
        <div className="login-container">
          <section className="form">
            <img src={logoImage} alt="Login" id="img1" />

            <form>
                <h1>Cadastro de Tarefas</h1>
                <input placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                {/* <input placeholder="Email" 
                     value={email}
                     onChange={e=>setEmail(e.target.value)}
                /> */}
                {/* <input type="password" placeholder="Password"
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                /> */}
                <button class="button" type="submit">Login</button>
            </form>
            </section>
        </div>
    )
}