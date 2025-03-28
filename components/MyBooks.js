import React, { useState, useEffect } from 'react';
import styles from '../styles/MyBooks.module.css';
import { israeliCurriculumBooks } from './IsraeliCurriculumBooks';
import BookSelector from './BookSelector';
import { useTranslation } from '../translations';

const MyBooks = ({ grade, selectedBooks, onBooksChange }) => {
  const { t } = useTranslation();
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  
  useEffect(() => {
    // Find books that match the user's selected books
    if (selectedBooks && selectedBooks.length > 0) {
      const userBooks = israeliCurriculumBooks.filter(book => 
        selectedBooks.includes(book.id)
      );
      setFilteredBooks(userBooks);
    } else {
      setFilteredBooks([]);
    }
  }, [selectedBooks]);

  const toggleBookSelector = () => {
    setShowBookSelector(!showBookSelector);
  };

  const handleBooksSelected = (newSelectedBooks) => {
    if (onBooksChange) {
      onBooksChange(newSelectedBooks);
    }
  };

  return (
    <div className={styles.myBooksContainer}>
      <div className={styles.myBooksHeader}>
        <h2>{t('myBooks')}</h2>
        <button 
          className={styles.manageButton}
          onClick={toggleBookSelector}
        >
          {showBookSelector ? t('hideBookSelector') : t('manageBooks')}
        </button>
      </div>

      {showBookSelector ? (
        <div className={styles.bookSelectorWrapper}>
          <BookSelector 
            grade={grade}
            selectedBooks={selectedBooks || []}
            onBooksSelected={handleBooksSelected}
          />
        </div>
      ) : (
        <div className={styles.booksDisplay}>
          {filteredBooks.length > 0 ? (
            <div className={styles.bookGrid}>
              {filteredBooks.map(book => (
                <div key={book.id} className={styles.bookCard}>
                  <div className={styles.bookImage}>
                    <img 
                      src={book.imageUrl} 
                      alt={book.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/book-placeholder.png";
                      }}
                    />
                  </div>
                  <div className={styles.bookInfo}>
                    <h3 className={styles.bookTitle}>{book.title}</h3>
                    <p className={styles.bookSubject}>{book.subject}</p>
                    <p className={styles.bookGrade}>Grade {book.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>{t('noBooksSelected')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
