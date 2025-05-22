import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import arrow from '../assets/icons/arrow.png';
import { useAuth } from "../context/AuthContext"; 

export const API_URL = import.meta.env.VITE_API_URL;

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        
        if (res.ok) {
            login(data.token)
            navigate("/Login");
        } else {
            setErrorMessage(data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
            <img
                src="/images/wallpaper.png"
                alt="Fondo"
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            />
            
            <div className="max-w-md w-full space-y-8 bg-gray-800 bg-opacity-80 p-10 rounded-2xl border-2 border-yellow-400 shadow-2xl relative z-10">
                <div>
                    <Link to="/" className="absolute top-4 left-10">
                        <img src={arrow} alt="Flecha para volver" className="w-10 h-10" />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Bienvenido
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300">
                        Registrate para poder clasificar tu partida
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Nombre de usuario
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                maxLength={10}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                placeholder="Nombre de usuario"
                            />
                            </div>

                            <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                required
                                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                placeholder="Correo electrónico"
                            />
                            </div>

                            <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                minLength={8}
                                maxLength={30}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                placeholder="Contraseña"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center mb-4 z-20">{errorMessage}</p>
                    )}

                    <div>
                        <button
                        type="submit"
                        className="cursor-pointer group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                        Registrarse
                        </button>
                    </div>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-300">
                            ¿Ya tienes cuenta? 
                            <Link to="/Login" className="font-medium text-yellow-400 hover:text-yellow-300 ml-1">Iniciar sesión</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default Register;
