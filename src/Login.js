import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        // Sign up a new user
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Sign-up successful! You can now log in.');
        setIsSignUp(false); // Switch to login form after sign-up
      } else {
        // Log in an existing user
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/'); // Redirect to Home page after login
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-3xl font-bold mb-4">
        {isSignUp ? 'Sign Up for HaritaHive' : 'Log In to HaritaHive'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <p className="mt-4 text-lg">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:underline"
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default Login;