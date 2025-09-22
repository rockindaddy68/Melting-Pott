import React, { useState, useEffect } from 'react'
import userService from '../services/userService'

const MemberAuth = ({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) => {
  const [mode, setMode] = useState(initialMode) // 'login' or 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    acceptTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        acceptTerms: false
      })
      setMessage({ type: '', text: '' })
      setMode(initialMode)
    }
  }, [isOpen, initialMode])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear messages on input change
    if (message.text) {
      setMessage({ type: '', text: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      let result
      
      if (mode === 'login') {
        result = await userService.loginUser(formData.email, formData.password)
      } else {
        // Registration validation
        if (!formData.acceptTerms) {
          setMessage({ type: 'error', text: 'Bitte akzeptieren Sie die Nutzungsbedingungen' })
          setLoading(false)
          return
        }
        
        result = await userService.registerUser({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      }

      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        
        // Wait a moment to show success message
        setTimeout(() => {
          onAuthSuccess?.(result.user)
          onClose()
        }, 1000)
      } else {
        setMessage({ type: 'error', text: result.message })
      }

    } catch (error) {
      setMessage({ type: 'error', text: 'Ein unerwarteter Fehler ist aufgetreten' })
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setMessage({ type: '', text: '' })
    setFormData(prev => ({
      ...prev,
      name: '',
      confirmPassword: '',
      acceptTerms: false
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-orange-400/30 rounded-lg shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-orange-400 transition-colors"
          disabled={loading}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-400 mb-2">
              {mode === 'login' ? 'Anmelden' : 'Registrieren'}
            </h2>
            <p className="text-gray-300">
              {mode === 'login' 
                ? 'Willkommen zurück bei Ruhrpott Events!'
                : 'Werden Sie Teil der Ruhrpott Community!'
              }
            </p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg border ${
              message.type === 'error' 
                ? 'bg-red-900/50 border-red-500/50 text-red-200'
                : 'bg-green-900/50 border-green-500/50 text-green-200'
            }`}>
              <div className="flex items-center">
                {message.type === 'error' ? (
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vollständiger Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Max Mustermann"
                  required
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="max@beispiel.de"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Passwort *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Mindestens 6 Zeichen"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Passwort bestätigen *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Passwort wiederholen"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            )}

            {mode === 'register' && (
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 mr-3 w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                  required
                  disabled={loading}
                />
                <label className="text-sm text-gray-300">
                  Ich akzeptiere die{' '}
                  <a href="#" className="text-orange-400 hover:text-orange-300 underline">
                    Nutzungsbedingungen
                  </a>{' '}
                  und{' '}
                  <a href="#" className="text-orange-400 hover:text-orange-300 underline">
                    Datenschutzrichtlinie
                  </a>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {mode === 'login' ? 'Anmelden...' : 'Registrieren...'}
                </>
              ) : (
                mode === 'login' ? 'Anmelden' : 'Registrieren'
              )}
            </button>
          </form>

          {/* Mode Switch */}
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400">
              {mode === 'login' 
                ? 'Noch kein Konto?' 
                : 'Bereits registriert?'
              }
            </p>
            <button
              type="button"
              onClick={switchMode}
              disabled={loading}
              className="mt-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors disabled:opacity-50"
            >
              {mode === 'login' 
                ? 'Jetzt registrieren' 
                : 'Zum Login'
              }
            </button>
          </div>

          {/* Demo Credentials for Development */}
          {mode === 'login' && process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-blue-200 mb-1">Demo Login:</p>
              <p className="text-xs text-blue-300 font-mono">max@ruhrpott.de / password123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemberAuth
