import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Chat.module.css';
import FeatureButtons from '../components/FeatureButtons';
import SubjectChat from '../components/SubjectChat';
import subjectTeachers from '../components/SubjectTeachers';

export default function Chat() {
  const router = useRouter();
  const [currentSubject, setCurrentSubject] = useState('general');
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '/profile-placeholder.png'
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/');
      return;
    }

    // Load user info from localStorage
    const firstName = localStorage.getItem('firstName') || 'Student';
    const lastName = localStorage.getItem('lastName') || '';
    const profilePicture = localStorage.getItem('profilePicture') || '/profile-placeholder.png';
    
    setUserInfo({
      firstName,
      lastName,
      profilePicture
    });
  }, [router]);

  const handleSubjectChange = (subject) => {
    setCurrentSubject(subject);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>EduAI - Chat</title>
        <meta name="description" content="Chat with your AI educational assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.chatContainer}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>EduAI</div>
          
          <div className={styles.userInfo} onClick={toggleProfileMenu}>
            <div className={styles.userAvatar}>
              <img 
                src={userInfo.profilePicture} 
                alt="Profile" 
              />
            </div>
            <div className={styles.userName}>
              {userInfo.firstName} {userInfo.lastName}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            
            {showProfileMenu && (
              <div className={styles.profileMenu}>
                <button 
                  className={styles.profileMenuItem}
                  onClick={() => {
                    router.push('/profile');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profile
                </button>
                <button 
                  className={styles.profileMenuItem}
                  onClick={() => {
                    router.push('/settings');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  Settings
                </button>
                <div className={styles.menuDivider}></div>
                <button 
                  className={styles.profileMenuItem}
                  onClick={handleLogout}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
          
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarSection}>
              <h3>Recent Topics</h3>
              <div className={styles.topicList}>
                <div className={styles.topic} onClick={() => setCurrentSubject('math')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  Math Homework
                </div>
                <div className={styles.topic} onClick={() => setCurrentSubject('history')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  History Essay
                </div>
                <div className={styles.topic} onClick={() => setCurrentSubject('science')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  Science Project
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.chatContent}>
          <SubjectChat 
            subject={currentSubject} 
            onChangeSubject={handleSubjectChange} 
          />
        </div>
      </div>
    </div>
  );
}
