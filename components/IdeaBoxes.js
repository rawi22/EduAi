import React from 'react';
import styles from '../styles/IdeaBoxes.module.css';

const IdeaBoxes = ({ onSelectIdea }) => {
  const ideas = [
    {
      id: 'homework',
      title: 'Homework Help',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      description: 'Get help with your homework assignments',
      prompt: "I need help with my homework assignment. Can you help me understand how to solve it?"
    },
    {
      id: 'exam',
      title: 'Exam Prep',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      ),
      description: 'Prepare for upcoming exams and tests',
      prompt: "I have an exam coming up. Can you help me prepare and review the key concepts?"
    },
    {
      id: 'math',
      title: 'Math Problems',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="5" x2="5" y2="19"></line>
          <circle cx="6.5" cy="6.5" r="2.5"></circle>
          <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>
      ),
      description: 'Solve math problems step by step',
      prompt: "I'm struggling with this math problem. Can you walk me through how to solve it step by step?"
    },
    {
      id: 'essay',
      title: 'Essay Writing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      ),
      description: 'Get help with essay structure and writing',
      prompt: "I need to write an essay about a topic. Can you help me structure it and provide some key points to include?"
    },
    {
      id: 'science',
      title: 'Science Concepts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 2H5.5C4.12 2 3 3.12 3 4.5V9C3 10.38 4.12 11.5 5.5 11.5H8.5C9.88 11.5 11 10.38 11 9V4.5C11 3.12 9.88 2 8.5 2Z"></path>
          <path d="M18.5 2H15.5C14.12 2 13 3.12 13 4.5V9C13 10.38 14.12 11.5 15.5 11.5H18.5C19.88 11.5 21 10.38 21 9V4.5C21 3.12 19.88 2 18.5 2Z"></path>
          <path d="M8.5 12.5H5.5C4.12 12.5 3 13.62 3 15V19.5C3 20.88 4.12 22 5.5 22H8.5C9.88 22 11 20.88 11 19.5V15C11 13.62 9.88 12.5 8.5 12.5Z"></path>
          <path d="M18.5 12.5H15.5C14.12 12.5 13 13.62 13 15V19.5C13 20.88 14.12 22 15.5 22H18.5C19.88 22 21 20.88 21 19.5V15C21 13.62 19.88 12.5 18.5 12.5Z"></path>
        </svg>
      ),
      description: 'Understand complex science topics',
      prompt: "I'm trying to understand a science concept. Can you explain it in simple terms?"
    },
    {
      id: 'history',
      title: 'History Facts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      description: 'Learn about historical events and figures',
      prompt: "Can you tell me about this historical event/figure and why it's important?"
    }
  ];

  const handleIdeaClick = (idea) => {
    if (onSelectIdea) {
      onSelectIdea(idea.prompt);
    }
  };

  return (
    <div className={styles.ideaBoxesContainer}>
      <h2 className={styles.ideaBoxesTitle}>What would you like help with?</h2>
      <div className={styles.ideaBoxesGrid}>
        {ideas.map((idea) => (
          <div 
            key={idea.id} 
            className={styles.ideaBox}
            onClick={() => handleIdeaClick(idea)}
          >
            <div className={styles.ideaBoxIcon}>
              {idea.icon}
            </div>
            <div className={styles.ideaBoxContent}>
              <h3 className={styles.ideaBoxTitle}>{idea.title}</h3>
              <p className={styles.ideaBoxDescription}>{idea.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaBoxes;
