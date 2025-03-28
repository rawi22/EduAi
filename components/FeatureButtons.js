import React from 'react';
import styles from '../styles/FeatureButtons.module.css';

const FeatureButtons = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      color: '#4F46E5', // Purple
      prompt: "Can you create some flashcards to help me study this topic?"
    },
    {
      id: 'test-quiz',
      title: 'Test & Quiz',
      color: '#EF4444', // Red
      prompt: "Can you create a quiz to test my knowledge on this subject?"
    },
    {
      id: 'tutor-me',
      title: 'Tutor Me',
      color: '#10B981', // Green
      prompt: "I need step-by-step tutoring on this concept. Can you help me understand it?"
    },
    {
      id: 'grading',
      title: 'Grading',
      color: '#F59E0B', // Amber
      prompt: "Can you grade my work and provide feedback for improvement?"
    },
    {
      id: 'explainer',
      title: 'Explainer',
      color: '#3B82F6', // Blue
      prompt: "Can you explain this concept in simple terms?"
    },
    {
      id: 'recap',
      title: 'Recap',
      color: '#8B5CF6', // Indigo
      prompt: "Can you provide a recap of what we've covered so far?"
    }
  ];

  const handleFeatureClick = (feature) => {
    if (onSelectFeature) {
      onSelectFeature(feature.prompt);
    }
  };

  return (
    <div className={styles.featureButtonsContainer}>
      {features.map((feature) => (
        <button 
          key={feature.id} 
          className={styles.featureButton}
          style={{ backgroundColor: feature.color }}
          onClick={() => handleFeatureClick(feature)}
        >
          {feature.title}
        </button>
      ))}
    </div>
  );
};

export default FeatureButtons;
