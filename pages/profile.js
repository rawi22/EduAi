import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css';
import { israeliCities, getSchoolsForCity } from '../components/IsraeliSchoolsData';
import MyBooks from '../components/MyBooks';
import { useTranslation } from '../translations';

export default function Profile() {
  const router = useRouter();
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    grade: '',
    city: '',
    school: '',
    curriculum: '',
    email: '',
    profilePicture: '/profile-placeholder.png',
    books: []
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [schools, setSchools] = useState([]);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        if (!session || !session.isLoggedIn) {
          router.push('/');
          return;
        }
        
        // Load user data from localStorage or API
        const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        setUserData({
          firstName: storedUserData.firstName || '',
          lastName: storedUserData.lastName || '',
          age: storedUserData.age || '',
          grade: storedUserData.grade || '',
          city: storedUserData.city || '',
          school: storedUserData.school || '',
          curriculum: storedUserData.curriculum || 'israeli',
          email: storedUserData.email || session.email || '',
          profilePicture: storedUserData.profilePicture || '/profile-placeholder.png',
          books: storedUserData.books || []
        });
        
        setEditData({
          firstName: storedUserData.firstName || '',
          lastName: storedUserData.lastName || '',
          age: storedUserData.age || '',
          grade: storedUserData.grade || '',
          city: storedUserData.city || '',
          school: storedUserData.school || '',
          curriculum: storedUserData.curriculum || 'israeli',
          email: storedUserData.email || session.email || '',
          books: storedUserData.books || []
        });
      } catch (error) {
        console.error('Error loading user data:', error);
        router.push('/');
      }
    };
    
    checkSession();
  }, [router]);
  
  useEffect(() => {
    if (editData.city) {
      setSchools(getSchoolsForCity(editData.city));
    }
  }, [editData.city]);
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        grade: userData.grade,
        city: userData.city,
        school: userData.school,
        curriculum: userData.curriculum,
        email: userData.email,
        books: userData.books
      });
    }
    setIsEditing(!isEditing);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
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
    
    if (!editData.firstName.trim()) {
      formErrors.firstName = t('firstNameRequired');
      isValid = false;
    }
    
    if (!editData.lastName.trim()) {
      formErrors.lastName = t('lastNameRequired');
      isValid = false;
    }
    
    if (!editData.age) {
      formErrors.age = t('ageRequired');
      isValid = false;
    } else if (isNaN(editData.age) || parseInt(editData.age) < 10 || parseInt(editData.age) > 18) {
      formErrors.age = t('ageRange');
      isValid = false;
    }
    
    if (!editData.grade) {
      formErrors.grade = t('gradeRequired');
      isValid = false;
    }
    
    if (!editData.city) {
      formErrors.city = t('cityRequired');
      isValid = false;
    }
    
    if (!editData.school) {
      formErrors.school = t('schoolRequired');
      isValid = false;
    }
    
    if (editData.email && !/\S+@\S+\.\S+/.test(editData.email)) {
      formErrors.email = t('invalidEmail');
      isValid = false;
    }
    
    setErrors(formErrors);
    return isValid;
  };
  
  const handleSave = async () => {
    if (validateForm()) {
      try {
        // Get user ID from session
        const session = JSON.parse(localStorage.getItem('session') || '{}');
        
        if (session.id) {
          // Update user data via API
          const response = await fetch('/api/auth/update-user', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: session.id,
              userData: {
                firstName: editData.firstName,
                lastName: editData.lastName,
                age: editData.age,
                grade: editData.grade,
                city: editData.city,
                school: editData.school,
                curriculum: editData.curriculum,
                books: editData.books
              }
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to update user data');
          }
          
          const data = await response.json();
          
          // Update session with user data
          session.firstName = editData.firstName;
          session.lastName = editData.lastName;
          localStorage.setItem('session', JSON.stringify(session));
          
          // Store user data
          localStorage.setItem('userData', JSON.stringify(data.user));
        } else {
          // Fallback to localStorage only
          localStorage.setItem('userData', JSON.stringify(editData));
        }
        
        // Update userData state
        setUserData({
          ...userData,
          ...editData
        });
        
        // Exit edit mode
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving user data:', error);
        setErrors({ general: 'Failed to save changes. Please try again.' });
      }
    }
  };
  
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfilePicture = reader.result;
        setUserData(prev => ({
          ...prev,
          profilePicture: newProfilePicture
        }));
        
        // Update user data with new profile picture
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.profilePicture = newProfilePicture;
        localStorage.setItem('userData', JSON.stringify(userData));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNavigateToChat = () => {
    router.push('/chat');
  };
  
  const handleNavigateToSettings = () => {
    router.push('/settings');
  };

  const handleBooksChange = async (selectedBooks) => {
    setEditData(prev => ({
      ...prev,
      books: selectedBooks
    }));
    
    // If not in edit mode, save immediately
    if (!isEditing) {
      try {
        // Get user ID from session
        const session = JSON.parse(localStorage.getItem('session') || '{}');
        
        if (session.id) {
          // Update user data via API
          const response = await fetch('/api/auth/update-user', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: session.id,
              userData: {
                books: selectedBooks
              }
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to update books');
          }
          
          const data = await response.json();
          
          // Store updated user data
          localStorage.setItem('userData', JSON.stringify(data.user));
        } else {
          // Fallback to localStorage only
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          userData.books = selectedBooks;
          localStorage.setItem('userData', JSON.stringify(userData));
        }
        
        setUserData(prev => ({
          ...prev,
          books: selectedBooks
        }));
      } catch (error) {
        console.error('Error updating books:', error);
      }
    }
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
        <title>EduAI - {t('profile')}</title>
        <meta name="description" content={t('profile')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.profileContainer}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>{t('appName')}</div>
          <nav className={styles.navigation}>
            <button 
              className={`${styles.navButton} ${activeTab === 'profile' ? styles.active : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {t('profile')}
            </button>
            <button 
              className={`${styles.navButton} ${activeTab === 'books' ? styles.active : ''}`}
              onClick={() => setActiveTab('books')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              {t('myBooks')}
            </button>
            <button 
              className={styles.navButton}
              onClick={handleNavigateToSettings}
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
          {activeTab === 'profile' && (
            <div className={styles.profileTab}>
              <div className={styles.header}>
                <h1>{t('yourProfile')}</h1>
                {isEditing ? (
                  <div className={styles.editButtons}>
                    <button 
                      className={styles.cancelButton}
                      onClick={handleEditToggle}
                    >
                      {t('cancel')}
                    </button>
                    <button 
                      className={styles.saveButton}
                      onClick={handleSave}
                    >
                      {t('saveChanges')}
                    </button>
                  </div>
                ) : (
                  <button 
                    className={styles.editButton}
                    onClick={handleEditToggle}
                  >
                    {t('editProfile')}
                  </button>
                )}
              </div>
              
              <div className={styles.profileContent}>
                <div className={styles.profileImageSection}>
                  <div className={styles.profileImage}>
                    <img 
                      src={userData.profilePicture} 
                      alt={`${userData.firstName} ${userData.lastName}`} 
                    />
                    <div className={styles.imageOverlay}>
                      <label htmlFor="profile-picture-upload" className={styles.uploadButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>{t('upload')}</span>
                      </label>
                      <input 
                        id="profile-picture-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleProfilePictureChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                  <h2 className={styles.userName}>{userData.firstName} {userData.lastName}</h2>
                  <p className={styles.userEmail}>{userData.email}</p>
                </div>
                
                <div className={styles.profileDetails}>
                  <div className={styles.detailsSection}>
                    <h3>{t('personalInformation')}</h3>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="firstName">{t('firstName')}</label>
                        {isEditing ? (
                          <>
                            <input 
                              type="text" 
                              id="firstName" 
                              name="firstName"
                              value={editData.firstName}
                              onChange={handleChange}
                              className={errors.firstName ? styles.inputError : ''}
                            />
                            {errors.firstName && <div className={styles.errorMessage}>{errors.firstName}</div>}
                          </>
                        ) : (
                          <p className={styles.fieldValue}>{userData.firstName}</p>
                        )}
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="lastName">{t('lastName')}</label>
                        {isEditing ? (
                          <>
                            <input 
                              type="text" 
                              id="lastName" 
                              name="lastName"
                              value={editData.lastName}
                              onChange={handleChange}
                              className={errors.lastName ? styles.inputError : ''}
                            />
                            {errors.lastName && <div className={styles.errorMessage}>{errors.lastName}</div>}
                          </>
                        ) : (
                          <p className={styles.fieldValue}>{userData.lastName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="age">{t('age')}</label>
                        {isEditing ? (
                          <>
                            <input 
                              type="number" 
                              id="age" 
                              name="age"
                              value={editData.age}
                              onChange={handleChange}
                              min="10"
                              max="18"
                              className={errors.age ? styles.inputError : ''}
                            />
                            {errors.age && <div className={styles.errorMessage}>{errors.age}</div>}
                          </>
                        ) : (
                          <p className={styles.fieldValue}>{userData.age}</p>
                        )}
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="grade">{t('grade')}</label>
                        {isEditing ? (
                          <>
                            <select 
                              id="grade" 
                              name="grade"
                              value={editData.grade}
                              onChange={handleChange}
                              className={errors.grade ? styles.inputError : ''}
                            >
                              <option value="" disabled>{t('selectGrade')}</option>
                              <option value="5">5th Grade</option>
                              <option value="6">6th Grade</option>
                              <option value="7">7th Grade</option>
                              <option value="8">8th Grade</option>
                              <option value="9">9th Grade</option>
                              <option value="10">10th Grade</option>
                              <option value="11">11th Grade</option>
                              <option value="12">12th Grade</option>
                            </select>
                            {errors.grade && <div className={styles.errorMessage}>{errors.grade}</div>}
                          </>
                        ) : (
                          <p className={styles.fieldValue}>{userData.grade ? `${userData.grade}th Grade` : ''}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.detailsSection}>
                    <h3>{t('schoolInformation')}</h3>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="city">{t('city')}</label>
                        {isEditing ? (
                          <>
                            <select 
                              id="city" 
                              name="city"
                              value={editData.city}
                              onChange={handleChange}
                              className={errors.city ? styles.inputError : ''}
                            >
                              <option value="" disabled>{t('selectCity')}</option>
                              {israeliCities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                              ))}
                            </select>
                            {errors.city && <div className={styles.errorMessage}>{errors.city}</div>}
                          </>
                        ) : (
                          <p className={styles.fieldValue}>{userData.city}</p>
                        )}
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="school">{t('school')}</label>
                        {isEditing ? (
                          <>
                            <select 
                              id="school" 
                              name="school"
                              value={editData.school}
                              onChange={handleChange}
                              disabled={!editData.city}
                              className={errors.school ? styles.inputError : ''}
                            >
                              <option value="" disabled>{t('selectSchool')}</option>
                              {schools.map((school, index) => (
                                <option key={index} value={school}>{school}</option>
                              ))}
                            </select>
                            {errors.school && <div className={styles.errorMessage}>{errors.school}</div>}
                          </>
                        ) : (
                          <p className={styles.fieldValue}>{userData.school}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="curriculum">{t('curriculum')}</label>
                        {isEditing ? (
                          <select 
                            id="curriculum" 
                            name="curriculum"
                            value={editData.curriculum}
                            onChange={handleChange}
                          >
                            <option value="israeli">{t('israeliCurriculum')}</option>
                            <option value="international">{t('internationalCurriculum')}</option>
                          </select>
                        ) : (
                          <p className={styles.fieldValue}>
                            {userData.curriculum === 'israeli' ? t('israeliCurriculum') : t('internationalCurriculum')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'books' && (
            <div className={styles.booksTab}>
              <div className={styles.header}>
                <h1>{t('myBooks')}</h1>
              </div>
              
              <MyBooks 
                grade={userData.grade}
                selectedBooks={isEditing ? editData.books : userData.books}
                onBooksChange={handleBooksChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
