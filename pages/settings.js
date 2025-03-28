import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Settings.module.css';
import { useTranslation } from '../translations';

export default function Settings() {
  const router = useRouter();
  const { t, changeLanguage, currentLanguageCode } = useTranslation();
  
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    notifications: true,
    language: 'english',
    dataSharing: true,
    aiPersonality: 'friendly',
    parentalControls: false,
    parentalPassword: ''
  });
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [parentalPassword, setParentalPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        if (!session || !session.isLoggedIn) {
          router.push('/');
          return;
        }
        
        // Load settings from localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedFontSize = localStorage.getItem('fontSize') || 'medium';
        const savedNotifications = localStorage.getItem('notifications') !== 'false';
        const savedLanguage = localStorage.getItem('language') || 'english';
        const savedDataSharing = localStorage.getItem('dataSharing') !== 'false';
        const savedAiPersonality = localStorage.getItem('aiPersonality') || 'friendly';
        const savedParentalControls = localStorage.getItem('parentalControls') === 'true';
        
        setSettings({
          theme: savedTheme,
          fontSize: savedFontSize,
          notifications: savedNotifications,
          language: savedLanguage,
          dataSharing: savedDataSharing,
          aiPersonality: savedAiPersonality,
          parentalControls: savedParentalControls,
          parentalPassword: localStorage.getItem('parentalPassword') || ''
        });
      } catch (error) {
        console.error('Error loading settings:', error);
        router.push('/');
      }
    };
    
    checkSession();
  }, [router]);
  
  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Save to localStorage
    localStorage.setItem(setting, value);
    
    // If language is changed, update the app language
    if (setting === 'language') {
      changeLanguage(value);
    }
  };
  
  const handleToggleParentalControls = () => {
    if (!settings.parentalControls) {
      // Turning on parental controls
      setShowPasswordModal(true);
    } else {
      // Turning off parental controls
      handleSettingChange('parentalControls', false);
    }
  };
  
  const handleSetParentalPassword = () => {
    if (parentalPassword.length < 4) {
      setPasswordError('Password must be at least 4 characters');
      return;
    }
    
    if (parentalPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Save password and enable parental controls
    handleSettingChange('parentalPassword', parentalPassword);
    handleSettingChange('parentalControls', true);
    
    // Close modal and reset fields
    setShowPasswordModal(false);
    setParentalPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };
  
  const handleNavigateToChat = () => {
    router.push('/chat');
  };
  
  const handleNavigateToProfile = () => {
    router.push('/profile');
  };
  
  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('session');
    
    // Redirect to login page
    router.push('/');
  };
  
  return (
    <div className={styles.container}>
      <Head>
        <title>EduAI - {t('settings')}</title>
        <meta name="description" content={t('settings')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.settingsContainer}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>{t('appName')}</div>
          <nav className={styles.navigation}>
            <button 
              className={styles.navButton}
              onClick={handleNavigateToProfile}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {t('profile')}
            </button>
            <button 
              className={`${styles.navButton} ${styles.active}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              {t('settings')}
            </button>
            <button 
              className={styles.navButton}
              onClick={handleNavigateToChat}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              {t('chat')}
            </button>
            <button 
              className={styles.navButton}
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              {t('logout')}
            </button>
          </nav>
        </div>
        
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{t('settings')}</h1>
          </div>
          
          <div className={styles.settingsSection}>
            <div className={styles.settingGroup}>
              <h3>{t('appearance')}</h3>
              
              <div className={styles.setting}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>{t('theme')}</span>
                  <span className={styles.settingDescription}>{t('themeDescription')}</span>
                </div>
                <div className={styles.settingControl}>
                  <select 
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                  >
                    <option value="light">{t('light')}</option>
                    <option value="dark">{t('dark')}</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.setting}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>{t('fontSize')}</span>
                  <span className={styles.settingDescription}>{t('fontSizeDescription')}</span>
                </div>
                <div className={styles.settingControl}>
                  <select 
                    value={settings.fontSize}
                    onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                  >
                    <option value="small">{t('small')}</option>
                    <option value="medium">{t('medium')}</option>
                    <option value="large">{t('large')}</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className={styles.settingGroup}>
              <h3>{t('preferences')}</h3>
              
              <div className={styles.setting}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>{t('notifications')}</span>
                  <span className={styles.settingDescription}>{t('notificationsDescription')}</span>
                </div>
                <div className={styles.settingControl}>
                  <label className={styles.toggle}>
                    <input 
                      type="checkbox" 
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
              
              <div className={styles.setting}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>{t('language')}</span>
                  <span className={styles.settingDescription}>{t('languageDescription')}</span>
                </div>
                <div className={styles.settingControl}>
                  <select 
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                  >
                    <option value="english">{t('english')}</option>
                    <option value="hebrew">{t('hebrew')}</option>
                    <option value="arabic">{t('arabic')}</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className={styles.settingGroup}>
              <h3>{t('aiAssistant')}</h3>
              
              <div className={styles.setting}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>{t('aiPersonality')}</span>
                  <span className={styles.settingDescription}>{t('aiPersonalityDescription')}</span>
                </div>
                <div className={styles.settingControl}>
                  <select 
                    value={settings.aiPersonality}
                    onChange={(e) => handleSettingChange('aiPersonality', e.target.value)}
                  >
                    <option value="friendly">{t('friendly')}</option>
                    <option value="professional">{t('professional')}</option>
                    <option value="encouraging">{t('encouraging')}</option>
                    <option value="concise">{t('concise')}</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.setting}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>{t('dataSharing')}</span>
                  <span className={styles.settingDescription}>{t('dataSharingDescription')}</span>
                </div>
                <div className={styles.settingControl}>
                  <label className={styles.toggle}>
                    <input 
                      type="checkbox" 
                      checked={settings.dataSharing}
                      onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className={styles.settingGroup}>
              <h3>{t('accountSettings')}</h3>
              
              <div className={styles.setting}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>Parental Controls</span>
                  <span className={styles.settingDescription}>Restrict access to certain features</span>
                </div>
                <div className={styles.settingControl}>
                  <label className={styles.toggle}>
                    <input 
                      type="checkbox" 
                      checked={settings.parentalControls}
                      onChange={handleToggleParentalControls}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showPasswordModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Set Parental Controls Password</h3>
            <p>Create a password to protect parental control settings.</p>
            
            <div className={styles.formGroup}>
              <label htmlFor="parentalPassword">Password</label>
              <input 
                type="password" 
                id="parentalPassword"
                value={parentalPassword}
                onChange={(e) => setParentalPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="confirmParentalPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmParentalPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </div>
            
            {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
            
            <div className={styles.modalButtons}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.saveButton}
                onClick={handleSetParentalPassword}
              >
                Set Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
