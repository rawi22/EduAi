import React, { useState, useEffect } from 'react';
import styles from '../styles/BookSelector.module.css';
import { israeliCurriculumBooks, getBooksByGrade } from './IsraeliCurriculumBooks';

const BookSelector = ({ grade, onBooksSelected }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [activeSubject, setActiveSubject] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get unique subjects from the books
  const subjects = ['all', ...new Set(israeliCurriculumBooks.map(book => book.subject))];
  
  useEffect(() => {
    // Filter books by grade when component mounts or grade changes
    setIsLoading(true);
    
    setTimeout(() => {
      if (grade) {
        setAvailableBooks(getBooksByGrade(grade));
      } else {
        setAvailableBooks(israeliCurriculumBooks);
      }
      setIsLoading(false);
    }, 500); // Simulate loading for better UX
  }, [grade]);
  
  const handleSubjectFilter = (subject) => {
    setActiveSubject(subject);
    setIsLoading(true);
    
    setTimeout(() => {
      if (subject === 'all') {
        if (grade) {
          setAvailableBooks(getBooksByGrade(grade));
        } else {
          setAvailableBooks(israeliCurriculumBooks);
        }
      } else {
        if (grade) {
          setAvailableBooks(israeliCurriculumBooks.filter(book => 
            book.grade === grade && book.subject === subject
          ));
        } else {
          setAvailableBooks(israeliCurriculumBooks.filter(book => 
            book.subject === subject
          ));
        }
      }
      setIsLoading(false);
    }, 300);
  };
  
  const handleBookSelection = (bookId) => {
    setSelectedBooks(prev => {
      let updatedSelection;
      
      if (prev.includes(bookId)) {
        // Remove book if already selected
        updatedSelection = prev.filter(id => id !== bookId);
      } else {
        // Add book if not selected
        updatedSelection = [...prev, bookId];
      }
      
      // Call the parent component's callback with the updated selection
      if (onBooksSelected) {
        onBooksSelected(updatedSelection);
      }
      
      return updatedSelection;
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter books based on search term
  const filteredBooks = searchTerm 
    ? availableBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableBooks;
  
  return (
    <div className={styles.bookSelectorContainer}>
      <div className={styles.bookSelectorHeader}>
        <h3 className={styles.bookSelectorTitle}>Select Your Books</h3>
        <p className={styles.bookSelectorInstructions}>
          Click on the books you use in your classes. You can filter by subject or search for specific books.
          {selectedBooks.length > 0 && (
            <span className={styles.selectionCount}> You have selected {selectedBooks.length} book(s).</span>
          )}
        </p>
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search books by title, subject, or description..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </div>
      
      <div className={styles.subjectFilter}>
        {subjects.map(subject => (
          <button 
            key={subject}
            className={`${styles.subjectButton} ${activeSubject === subject ? styles.active : ''}`}
            onClick={() => handleSubjectFilter(subject)}
          >
            {subject === 'all' ? 'All Subjects' : subject}
          </button>
        ))}
      </div>
      
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading books...</p>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className={styles.booksGrid}>
          {filteredBooks.map(book => (
            <div 
              key={book.id}
              className={`${styles.bookCard} ${selectedBooks.includes(book.id) ? styles.selected : ''}`}
              onClick={() => handleBookSelection(book.id)}
            >
              <div className={styles.bookImageContainer}>
                <div className={styles.imageLoader}>
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className={styles.bookImage}
                    key={`book-image-${book.id}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150x200?text=Book+Cover';
                    }}
                  />
                </div>
                {selectedBooks.includes(book.id) && (
                  <div className={styles.checkmark}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookGrade}>Grade {book.grade}</p>
                <p className={styles.bookSubject}>{book.subject}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResultsContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3>No Books Found</h3>
          <p>
            {searchTerm 
              ? `No books match your search "${searchTerm}". Try a different search term or clear the search.` 
              : `No books available for the selected filters. Try selecting a different subject or grade.`
            }
          </p>
          {searchTerm && (
            <button 
              className={styles.clearSearchButton}
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookSelector;
