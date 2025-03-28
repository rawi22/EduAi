import React, { useState, useEffect } from 'react';
import styles from '../styles/SubjectChat.module.css';
import subjectTeachers from './SubjectTeachers';
import FeatureButtons from './FeatureButtons';

const SubjectChat = ({ subject = 'general', onChangeSubject }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  
  useEffect(() => {
    // Find the teacher for the current subject
    const teacher = subjectTeachers.find(t => t.id === subject) || subjectTeachers.find(t => t.id === 'general');
    setCurrentTeacher(teacher);
    
    // Initialize chat with a welcome message from the teacher
    setChatHistory([
      {
        role: 'assistant',
        content: teacher.greeting,
        teacher: teacher
      }
    ]);
  }, [subject]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: message
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // In a real app, this would call the API with the current subject/teacher context
      const response = await simulateAIResponse(message, currentTeacher);
      
      // Add AI response to chat
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: response,
        teacher: currentTeacher
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message to chat
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        teacher: currentTeacher
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureSelect = (prompt) => {
    setMessage(prompt);
  };

  const simulateAIResponse = (userMessage, teacher) => {
    // This is a placeholder for the actual API call to DeepSeek AI
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowercaseMessage = userMessage.toLowerCase();
        const subject = teacher.subject.toLowerCase();
        
        if (lowercaseMessage.includes('homework') || lowercaseMessage.includes('assignment')) {
          resolve(`As your ${subject} teacher, I'd be happy to help with your homework! Let's work through it step by step.`);
        } else if (lowercaseMessage.includes('exam') || lowercaseMessage.includes('test')) {
          resolve(`I can definitely help you prepare for your ${subject} exam! Let's review the key concepts and practice some questions.`);
        } else if (lowercaseMessage.includes('flashcard')) {
          resolve(`Here are some flashcards for ${subject} concepts:\n\n1. Term: [Key Concept]\n   Definition: [Explanation]\n\n2. Term: [Another Concept]\n   Definition: [Explanation]\n\n3. Term: [Important Formula/Idea]\n   Definition: [Explanation]`);
        } else if (lowercaseMessage.includes('quiz') || lowercaseMessage.includes('test me')) {
          resolve(`Let's test your ${subject} knowledge with a quick quiz:\n\n1. [Question about a key concept]\n2. [Application question]\n3. [Analysis question]\n\nLet me know when you're ready for the answers!`);
        } else if (lowercaseMessage.includes('tutor') || lowercaseMessage.includes('explain')) {
          resolve(`I'll tutor you through this ${subject} concept step by step. First, let's understand the basic principles, then we'll build on that foundation with examples.`);
        } else if (lowercaseMessage.includes('grade') || lowercaseMessage.includes('feedback')) {
          resolve(`I'd be happy to grade your work and provide constructive feedback. Please share what you've done so far, and I'll help identify strengths and areas for improvement.`);
        } else if (lowercaseMessage.includes('recap') || lowercaseMessage.includes('summary')) {
          resolve(`Here's a recap of what we've covered in ${subject} so far: [Summary of key points discussed]. Is there anything specific from this you'd like to review further?`);
        } else {
          resolve(`As your ${subject} teacher, I'm here to help you understand the material better. Could you tell me more specifically what you're working on or what questions you have?`);
        }
      }, 1500);
    });
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.teacherInfo}>
          <div className={styles.teacherAvatar}>
            {currentTeacher && (
              <img 
                src={currentTeacher.avatar} 
                alt={currentTeacher.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatars/default-teacher.png";
                }}
              />
            )}
          </div>
          <div className={styles.teacherDetails}>
            <div className={styles.teacherName}>{currentTeacher?.name}</div>
            <div className={styles.teacherSubject}>{currentTeacher?.subject} Teacher</div>
          </div>
        </div>
        {onChangeSubject && (
          <div className={styles.subjectSelector}>
            <select 
              value={subject} 
              onChange={(e) => onChangeSubject(e.target.value)}
              className={styles.subjectDropdown}
            >
              {subjectTeachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.subject}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <div className={styles.chatMessages}>
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
          >
            {msg.role === 'assistant' && (
              <div className={styles.messageAvatar}>
                <img 
                  src={msg.teacher?.avatar} 
                  alt={msg.teacher?.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/avatars/default-teacher.png";
                  }}
                />
              </div>
            )}
            <div className={styles.messageContent}>
              {msg.role === 'assistant' && (
                <div className={styles.messageSender}>{msg.teacher?.name}</div>
              )}
              <div className={styles.messageText}>{msg.content}</div>
            </div>
            {msg.role === 'user' && (
              <div className={styles.messageAvatar}>
                <img src="/profile-placeholder.png" alt="You" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <div className={styles.messageAvatar}>
              <img 
                src={currentTeacher?.avatar} 
                alt={currentTeacher?.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatars/default-teacher.png";
                }}
              />
            </div>
            <div className={styles.messageContent}>
              <div className={styles.messageSender}>{currentTeacher?.name}</div>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.chatInputContainer}>
        <FeatureButtons onSelectFeature={handleFeatureSelect} />
        
        <form onSubmit={handleSendMessage} className={styles.chatInputWrapper}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Ask ${currentTeacher?.name} anything about ${currentTeacher?.subject}...`}
            className={styles.chatInput}
          />
          <button 
            type="submit" 
            className={styles.sendButton}
            disabled={!message.trim() || isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
        
        <div className={styles.inputActions}>
          <button className={styles.actionButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Upload
          </button>
          <button className={styles.actionButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            Voice
          </button>
          <button className={styles.actionButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectChat;
