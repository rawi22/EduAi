import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Landing.module.css';
import { useTranslation } from '../translations';

export default function Landing() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // We might still want to clear invalid sessions on load,
    // but we should NOT automatically redirect from here.
    // Redirection should happen after successful login/signup actions.
    try {
      const session = localStorage.getItem('session');
      if (session) {
        // Attempt to parse, clear if invalid JSON
        JSON.parse(session);
      }
    } catch (error) {
      // Clear invalid session data if parsing fails
      console.log("Clearing invalid session from localStorage");
      localStorage.removeItem('session');
    }
  }, []); // Run only once on initial mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      formErrors.email = t('emailRequired');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = t('invalidEmail');
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = t('passwordRequired');
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = t('passwordLength');
      isValid = false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = t('passwordsDoNotMatch');
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrors({});

      try {
        if (isLogin) {
          // Login request
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || t('loginFailed'));
          }

          // Store session data
          localStorage.setItem('session', JSON.stringify(data.session));
          localStorage.setItem('userData', JSON.stringify(data.user));
          
          // Navigate to chat page for existing users
          router.push('/chat');
        } else {
          // Register request
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
          }

          // Store user email for onboarding
          localStorage.setItem('tempUserEmail', formData.email);
          
          // Navigate to onboarding for new users
          router.push('/onboarding');
        }
      } catch (error) {
        setErrors({ general: error.message });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: t('emailRequired') });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send password reset');
      }

      setErrors({ general: 'Password reset link sent to your email' });
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>EduAI - {isLogin ? t('login') : t('signUp')}</title>
        <meta name="description" content={t('appTagline')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h1 className={styles.title}>{t('appName')}</h1>
          <p className={styles.subtitle}>{t('appTagline')}</p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.tabContainer}>
            <button 
              className={`${styles.tabButton} ${isLogin ? styles.activeTab : ''}`}
              onClick={() => setIsLogin(true)}
            >
              {t('login')}
            </button>
            <button 
              className={`${styles.tabButton} ${!isLogin ? styles.activeTab : ''}`}
              onClick={() => setIsLogin(false)}
            >
              {t('signUp')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {errors.general && (
              <div className={styles.errorGeneral}>{errors.general}</div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="email">{t('email')}</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={errors.email ? styles.inputError : ''}
                disabled={isLoading}
              />
              {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">{t('password')}</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={errors.password ? styles.inputError : ''}
                disabled={isLoading}
              />
              {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
            </div>

            {!isLogin && (
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.confirmPassword ? styles.inputError : ''}
                  disabled={isLoading}
                />
                {errors.confirmPassword && <div className={styles.errorMessage}>{errors.confirmPassword}</div>}
              </div>
            )}

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : isLogin ? t('login') : t('signUp')}
            </button>

            {isLogin && (
              <button 
                type="button" 
                className={styles.forgotPasswordButton}
                onClick={handleForgotPassword}
                disabled={isLoading}
              >
                {t('forgotPassword')}
              </button>
            )}
          </form>

          <div className={styles.switchContainer}>
            {isLogin ? (
              <p>{t('dontHaveAccount')} <button onClick={() => setIsLogin(false)} className={styles.switchButton}>{t('signUp')}</button></p>
            ) : (
              <p>{t('alreadyHaveAccount')} <button onClick={() => setIsLogin(true)} className={styles.switchButton}>{t('login')}</button></p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
