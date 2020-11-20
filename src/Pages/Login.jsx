import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ContextAPI from '../Context/ContextAPI';

const Login = () => {
  const { setEmail } = useContext(ContextAPI);

  const [username, setUsername] = useState('');

  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleInput = (value) => {
    const regex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}.[A-Z0-9]{2,}/i;
    if (regex.test(value.toLowerCase())) {
      setEmailValid(true);
      setUsername(value);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (value) => {
    if (value.length > 6) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const buttonClick = () => {
    setEmail(username);

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: username }));
    setRedirect(true);
  };

  return redirect ? (
    <Redirect to="comidas" />
  ) : (
    <div>
      <label htmlFor="email">
        <input
          type="text"
          id="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={(e) => handleInput(e.target.value)}
        />
      </label>
      <label htmlFor="senha">
        <input
          type="password"
          id="senha"
          placeholder="Senha"
          data-testid="password-input"
          onChange={(e) => handlePassword(e.target.value)}
        />
      </label>
      <button data-testid="login-submit-btn" disabled={!(isEmailValid && isPasswordValid)} onClick={() => buttonClick()} type="button">Entrar</button>
    </div>
  );
};

export default Login;