import React, { useState } from 'react';
import userService from '../services/userService';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Register Form State
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: 'Essen'
  });

  const ruhrCities = [
    'Essen', 'Dortmund', 'Bochum', 'Duisburg', 'Gelsenkirchen',
    'Oberhausen', 'Hagen', 'Bottrop', 'Recklinghausen', 'Herne',
    'Mülheim an der Ruhr', 'Witten', 'Castrop-Rauxel', 'Lünen'
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await userService.loginUser(loginData);
      
      if (result.success) {
        onAuthSuccess(result.user);
        onClose();
        setLoginData({ email: '', password: '' });
      } else {
        setError(result.error || 'Login fehlgeschlagen');
      }
    } catch (err) {
      setError('Verbindungsfehler');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein');
      setLoading(false);
      return;
    }

    try {
      const result = await userService.registerUser({
        name: `${registerData.firstName} ${registerData.lastName}`,
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
        city: registerData.city
      });
      
      if (result.success) {
        onAuthSuccess(result.user);
        onClose();
        setRegisterData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          city: 'Essen'
        });
      } else {
        setError(result.error || 'Registrierung fehlgeschlagen');
      }
    } catch (err) {
      setError('Verbindungsfehler');
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = () => {
    setLoginData({
      email: 'demo@ruhrpott.de',
      password: 'demo123'
    });
    setError('Demo-Account - Klicken Sie "Anmelden"');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 rounded-xl border border-orange-500/30 p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-400">
            {isLogin ? 'Anmelden' : 'Registrieren'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-orange-400 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Toggle Buttons */}
        <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              isLogin 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Anmelden
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              !isLogin 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Registrieren
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-Mail
              </label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                placeholder="ihre@email.de"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Passwort
              </label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? 'Wird angemeldet...' : 'Anmelden'}
            </button>

            <button
              type="button"
              onClick={demoLogin}
              className="w-full py-2 text-sm text-orange-400 hover:text-orange-300 border border-orange-500/30 hover:border-orange-500/50 rounded-lg transition-colors"
            >
              Demo-Account ausprobieren
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vorname
                </label>
                <input
                  type="text"
                  required
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                  placeholder="Max"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nachname
                </label>
                <input
                  type="text"
                  required
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                  placeholder="Mustermann"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-Mail
              </label>
              <input
                type="email"
                required
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                placeholder="ihre@email.de"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stadt
              </label>
              <select
                value={registerData.city}
                onChange={(e) => setRegisterData({...registerData, city: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              >
                {ruhrCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Passwort
              </label>
              <input
                type="password"
                required
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Passwort bestätigen
              </label>
              <input
                type="password"
                required
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? 'Wird registriert...' : 'Registrieren'}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            Mit der Registrierung stimmen Sie unseren{' '}
            <a href="#" className="text-orange-400 hover:text-orange-300">
              Nutzungsbedingungen
            </a>{' '}
            zu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
