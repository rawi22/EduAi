import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Onboarding.module.css';
import { israeliCities, getSchoolsForCity } from '../components/IsraeliSchoolsData';
import BookSelector from '../components/BookSelector';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    grade: '',
    city: '',
    school: '',
    curriculum: 'israeli',
    books: []
  });
  const [errors, setErrors] = useState({});
  const [schools, setSchools] = useState([]);
  const [isStepVisible, setIsStepVisible] = useState({
    1: true,
    2: false,
    3: false,
    4: false
  });
  const [bookSelectionComplete, setBookSelectionComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if user is coming from registration
    const tempUserEmail = localStorage.getItem('tempUserEmail');
    if (!tempUserEmail) {
      // Redirect to login if no email is found
      router.push('/');
      return;
    }

    // Fetch user data if available
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/auth/user?email=${encodeURIComponent(tempUserEmail)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        if (data.user) {
          setUserId(data.user.id);
          // Ensure the user is redirected only if specifically required
          router.push('/chat');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Provide user feedback
        setErrors('Failed to fetch user data. Please try again.');
      }
    };

    fetchUserData();
  }, [router, setUserId, setError]);

  React.useEffect(() => {
    if (formData.city) {
      setSchools(getSchoolsForCity(formData.city));
    }
  }, [formData.city]);

  const validateStep = (stepNumber) => {
    let stepErrors = {};
    let isValid = true;

    switch(stepNumber) {
      case 1:
        if (!formData.firstName.trim()) {
          stepErrors.firstName = 'First name is required';
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          stepErrors.lastName = 'Last name is required';
          isValid = false;
        }
        if (!formData.age) {
          stepErrors.age = 'Age is required';
          isValid = false;
        } else if (isNaN(formData.age) || parseInt(formData.age) < 10 || parseInt(formData.age) > 18) {
          stepErrors.age = 'Age must be between 10 and 18';
          isValid = false;
        }
        if (!formData.grade) {
          stepErrors.grade = 'Grade is required';
          isValid = false;
        }
        break;
      case 2:
        if (!formData.city) {
          stepErrors.city = 'City is required';
          isValid = false;
        }
        if (!formData.school) {
          stepErrors.school = 'School is required';
          isValid = false;
        }
        break;
      case 3:
        // Books selection is optional, but we'll show a confirmation if no books are selected
        if (formData.books.length === 0 && !bookSelectionComplete) {
          stepErrors.books = 'No books selected. Are you sure you want to continue?';
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return isValid;
  };

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

  const handleNext = () => {
    if (validateStep(step)) {
      const nextStep = step + 1;
      setStep(nextStep);
      
      // Make the next step visible
      setIsStepVisible(prev => ({
        ...prev,
        [nextStep]: true
      }));
    } else if (step === 3 && errors.books) {
      // Special case for book selection - allow proceeding with confirmation
      setBookSelectionComplete(true);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!userId) {
        throw new Error('User ID not found');
      }

      // Update user data via API
      const response = await fetch('/api/auth/update-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          userData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            age: formData.age,
            grade: formData.grade,
            city: formData.city,
            school: formData.school,
            curriculum: formData.curriculum,
            books: formData.books
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user data');
      }

      // Update session with user data
      const session = JSON.parse(localStorage.getItem('session') || '{}');
      session.firstName = formData.firstName;
      session.lastName = formData.lastName;
      localStorage.setItem('session', JSON.stringify(session));
      
      // Store user data
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      // Clear temporary email
      localStorage.removeItem('tempUserEmail');
      
      // Set login status
      const updatedSession = {
        ...session,
        isLoggedIn: true
      };
      localStorage.setItem('session', JSON.stringify(updatedSession));
      
      // Navigate to the chat interface
      router.push('/chat');
    } catch (error) {
      console.error('Error updating user data:', error);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooksSelected = (selectedBooks) => {
    setFormData(prev => ({
      ...prev,
      books: selectedBooks
    }));
    
    // Clear any book selection errors when books are selected
    if (errors.books) {
      setErrors(prev => ({
        ...prev,
        books: null
      }));
    }
  };

  const confirmNoBookSelection = () => {
    setBookSelectionComplete(true);
    setErrors(prev => ({
      ...prev,
      books: null
    }));
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>Personal Information</h2>
            <p>Let's get started by setting up your profile. This information helps us personalize your learning experience.</p>
            
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name" 
                required
                className={errors.firstName ? styles.inputError : ''}
              />
              {errors.firstName && <div className={styles.errorMessage}>{errors.firstName}</div>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name" 
                required
                className={errors.lastName ? styles.inputError : ''}
              />
              {errors.lastName && <div className={styles.errorMessage}>{errors.lastName}</div>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="age">Age</label>
              <input 
                type="number" 
                id="age" 
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age" 
                required
                min="10"
                max="18"
                className={errors.age ? styles.inputError : ''}
              />
              {errors.age && <div className={styles.errorMessage}>{errors.age}</div>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="grade">Grade</label>
              <select 
                id="grade" 
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className={errors.grade ? styles.inputError : ''}
              >
                <option value="" disabled>Select your grade</option>
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
            </div>
            
            <div className={styles.buttons}>
              <button type="button" className={styles.btnPrimary} onClick={handleNext}>Next Step</button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>School Details</h2>
            <p>Tell us about your school so we can customize your learning experience.</p>
            
            <div className={styles.formGroup}>
              <label htmlFor="city">City</label>
              <select 
                id="city" 
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={errors.city ? styles.inputError : ''}
              >
                <option value="" disabled>Select your city</option>
                {israeliCities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <div className={styles.errorMessage}>{errors.city}</div>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="school">School Name</label>
              <select 
                id="school" 
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                disabled={!formData.city}
                className={errors.school ? styles.inputError : ''}
              >
                <option value="" disabled>Select your school</option>
                {schools.map((school, index) => (
                  <option key={index} value={school}>{school}</option>
                ))}
              </select>
              {errors.school && <div className={styles.errorMessage}>{errors.school}</div>}
            </div>
            
            <div className={styles.buttons}>
              <button type="button" className={styles.btnSecondary} onClick={handleBack}>Back</button>
              <button type="button" className={styles.btnPrimary} onClick={handleNext}>Next Step</button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>Your Books</h2>
            <p>Select the books you use in your classes. This helps us provide relevant examples and explanations.</p>
            
            <BookSelector 
              grade={formData.grade}
              onBooksSelected={handleBooksSelected}
            />
            
            {errors.books && !bookSelectionComplete && (
              <div className={styles.confirmationBox}>
                <p>{errors.books}</p>
                <div className={styles.confirmationButtons}>
                  <button type="button" className={styles.btnSecondary} onClick={confirmNoBookSelection}>
                    Yes, continue without books
                  </button>
                  <button type="button" className={styles.btnPrimary} onClick={() => setErrors({...errors, books: null})}>
                    No, I'll select books
                  </button>
                </div>
              </div>
            )}
            
            <div className={styles.buttons}>
              <button type="button" className={styles.btnSecondary} onClick={handleBack}>Back</button>
              <button 
                type="button" 
                className={styles.btnPrimary} 
                onClick={handleNext}
              >
                Next Step
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className={styles.stepContent}>
            <h2>Study Materials (Optional)</h2>
            <p>Upload past exams or study materials to help personalize your learning experience. This step is optional.</p>
            
            <div className={styles.uploadArea}>
              <div className={styles.uploadBox}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>Drag and drop files here, or click to browse</p>
                <input type="file" multiple className={styles.fileInput} />
              </div>
              <p className={styles.uploadNote}>Supported file types: PDF, DOC, DOCX, JPG, PNG (Max 5MB per file)</p>
            </div>
            
            <div className={styles.buttons}>
              <button type="button" className={styles.btnSecondary} onClick={handleBack}>Back</button>
              <button 
                type="button" 
                className={styles.btnPrimary} 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Complete Setup'}
              </button>
            </div>
            
            {errors.general && <div className={styles.errorGeneral}>{errors.general}</div>}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>EduAI - Complete Your Profile</title>
        <meta name="description" content="Complete your EduAI profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.onboardingContainer}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>EduAI</div>
          <div className={styles.progressContainer}>
            <div className={styles.progressSteps}>
              <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''} ${step > 1 ? styles.completed : ''}`}>
                <div className={styles.stepNumber}>1</div>
                <span className={styles.stepLabel}>Personal Info</span>
              </div>
              <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''} ${step > 2 ? styles.completed : ''}`}>
                <div className={styles.stepNumber}>2</div>
                <span className={styles.stepLabel}>School Details</span>
              </div>
              <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''} ${step > 3 ? styles.completed : ''}`}>
                <div className={styles.stepNumber}>3</div>
                <span className={styles.stepLabel}>Your Books</span>
              </div>
              <div className={`${styles.progressStep} ${step >= 4 ? styles.active : ''} ${step > 4 ? styles.completed : ''}`}>
                <div className={styles.stepNumber}>4</div>
                <span className={styles.stepLabel}>Study Materials</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.content}>
          <form className={styles.onboardingForm}>
            {renderStep()}
          </form>
        </div>
      </div>
    </div>
  );
}
