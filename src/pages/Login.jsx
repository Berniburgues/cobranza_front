import React, { useState, useContext, useEffect } from 'react';
import { loginService } from '../services/obtenerData';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { saveUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userData = await loginService(email, password);
      saveUser(userData.user);
      setLoading(false);
      navigate('/home');
    } catch (error) {
      setError('Credenciales inválidas');
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-200 border border-black rounded-lg shadow-lg p-5 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-2 text-center">Acceder</h2>
        <hr className="border-t border-black mb-2 w-1/2 mx-auto" />
        {error && (
          <p className="text-red-500 font-semibold text-center italic text-sm">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold italic">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black rounded p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-semibold italic">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black rounded p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className={`bg-black hover:bg-white text-white hover:text-black p-1 rounded border-2 border-black ${
                loading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
