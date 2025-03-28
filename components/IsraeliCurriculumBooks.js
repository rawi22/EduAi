// Israeli Curriculum Books Data with images
const israeliCurriculumBooks = [
  // Math Books
  {
    id: "math-5-1",
    title: "Mathematics for 5th Grade - Part 1",
    subject: "Mathematics",
    grade: "5",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Zymoq7UnL._SY445_SX342_.jpg",
    description: "Core mathematics textbook covering arithmetic, geometry, and problem solving for 5th grade students."
  },
  {
    id: "math-5-2",
    title: "Mathematics for 5th Grade - Part 2",
    subject: "Mathematics",
    grade: "5",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51IVBjiPgQL._SY445_SX342_.jpg",
    description: "Advanced mathematics concepts for 5th grade including fractions, decimals, and basic algebra."
  },
  {
    id: "math-6-1",
    title: "Mathematics for 6th Grade - Part 1",
    subject: "Mathematics",
    grade: "6",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51r1oPOoyNL._SY445_SX342_.jpg",
    description: "Core mathematics textbook covering arithmetic, geometry, and problem solving for 6th grade students."
  },
  {
    id: "math-6-2",
    title: "Mathematics for 6th Grade - Part 2",
    subject: "Mathematics",
    grade: "6",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51IJ719jCHL._SY445_SX342_.jpg",
    description: "Advanced mathematics concepts for 6th grade including ratios, proportions, and pre-algebra."
  },
  {
    id: "math-7-1",
    title: "Mathematics for 7th Grade - Algebra",
    subject: "Mathematics",
    grade: "7",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51xQh9BJTFL._SY445_SX342_.jpg",
    description: "Introduction to algebraic concepts, equations, and functions for 7th grade students."
  },
  {
    id: "math-7-2",
    title: "Mathematics for 7th Grade - Geometry",
    subject: "Mathematics",
    grade: "7",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51KHcCSJVGL._SY445_SX342_.jpg",
    description: "Introduction to geometric concepts, shapes, and spatial reasoning for 7th grade students."
  },
  {
    id: "math-8-1",
    title: "Mathematics for 8th Grade - Algebra",
    subject: "Mathematics",
    grade: "8",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Vfwe7+N1L._SY445_SX342_.jpg",
    description: "Advanced algebraic concepts, linear equations, and systems for 8th grade students."
  },
  {
    id: "math-8-2",
    title: "Mathematics for 8th Grade - Geometry",
    subject: "Mathematics",
    grade: "8",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51bCNvP0VuL._SY445_SX342_.jpg",
    description: "Advanced geometric concepts, proofs, and theorems for 8th grade students."
  },
  {
    id: "math-9-1",
    title: "Mathematics for 9th Grade - Algebra",
    subject: "Mathematics",
    grade: "9",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Vfwe7+N1L._SY445_SX342_.jpg",
    description: "Advanced algebraic concepts, quadratic equations, and functions for 9th grade students."
  },
  {
    id: "math-9-2",
    title: "Mathematics for 9th Grade - Geometry",
    subject: "Mathematics",
    grade: "9",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51bCNvP0VuL._SY445_SX342_.jpg",
    description: "Advanced geometric concepts, trigonometry, and coordinate geometry for 9th grade students."
  },
  // Adding Math Books for Grades 10-12
  {
    id: "math-10-1",
    title: "Mathematics for 10th Grade - Algebra II",
    subject: "Mathematics",
    grade: "10",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Advanced algebra concepts including functions, logarithms, and complex numbers for 10th grade students."
  },
  {
    id: "math-10-2",
    title: "Mathematics for 10th Grade - Trigonometry",
    subject: "Mathematics",
    grade: "10",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Comprehensive trigonometry concepts, identities, and applications for 10th grade students."
  },
  {
    id: "math-11-1",
    title: "Mathematics for 11th Grade - Pre-Calculus",
    subject: "Mathematics",
    grade: "11",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Pre-calculus concepts including functions, limits, and analytical geometry for 11th grade students."
  },
  {
    id: "math-11-2",
    title: "Mathematics for 11th Grade - Statistics",
    subject: "Mathematics",
    grade: "11",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Introduction to statistical methods, probability, and data analysis for 11th grade students."
  },
  {
    id: "math-12-1",
    title: "Mathematics for 12th Grade - Calculus",
    subject: "Mathematics",
    grade: "12",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Comprehensive calculus concepts including derivatives, integrals, and applications for 12th grade students."
  },
  {
    id: "math-12-2",
    title: "Mathematics for 12th Grade - Advanced Topics",
    subject: "Mathematics",
    grade: "12",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Advanced mathematical topics including linear algebra, discrete mathematics, and mathematical modeling for 12th grade students."
  },
  
  // Science Books
  {
    id: "science-5",
    title: "Science and Technology for 5th Grade",
    subject: "Science",
    grade: "5",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Introduction to scientific concepts, experiments, and technology for 5th grade students."
  },
  {
    id: "science-6",
    title: "Science and Technology for 6th Grade",
    subject: "Science",
    grade: "6",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Advanced scientific concepts, experiments, and technology for 6th grade students."
  },
  {
    id: "biology-7",
    title: "Biology for 7th Grade",
    subject: "Science",
    grade: "7",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Introduction to biological concepts, cells, and living organisms for 7th grade students."
  },
  {
    id: "chemistry-8",
    title: "Chemistry for 8th Grade",
    subject: "Science",
    grade: "8",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Introduction to chemical concepts, elements, and reactions for 8th grade students."
  },
  {
    id: "physics-9",
    title: "Physics for 9th Grade",
    subject: "Science",
    grade: "9",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Introduction to physical concepts, forces, and energy for 9th grade students."
  },
  // Adding Science Books for Grades 10-12
  {
    id: "biology-10",
    title: "Biology for 10th Grade",
    subject: "Science",
    grade: "10",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Advanced biological concepts, genetics, and ecology for 10th grade students."
  },
  {
    id: "chemistry-10",
    title: "Chemistry for 10th Grade",
    subject: "Science",
    grade: "10",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Advanced chemical concepts, organic chemistry, and biochemistry for 10th grade students."
  },
  {
    id: "physics-10",
    title: "Physics for 10th Grade",
    subject: "Science",
    grade: "10",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Advanced physical concepts, mechanics, and thermodynamics for 10th grade students."
  },
  {
    id: "biology-11",
    title: "Advanced Biology for 11th Grade",
    subject: "Science",
    grade: "11",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Specialized biology topics including molecular biology and biotechnology for 11th grade students."
  },
  {
    id: "chemistry-11",
    title: "Advanced Chemistry for 11th Grade",
    subject: "Science",
    grade: "11",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Specialized chemistry topics including analytical chemistry and electrochemistry for 11th grade students."
  },
  {
    id: "physics-11",
    title: "Advanced Physics for 11th Grade",
    subject: "Science",
    grade: "11",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Specialized physics topics including waves, optics, and electromagnetism for 11th grade students."
  },
  {
    id: "biology-12",
    title: "Advanced Biology for 12th Grade",
    subject: "Science",
    grade: "12",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Research-focused biology including experimental design and data analysis for 12th grade students."
  },
  {
    id: "chemistry-12",
    title: "Advanced Chemistry for 12th Grade",
    subject: "Science",
    grade: "12",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Research-focused chemistry including laboratory techniques and chemical analysis for 12th grade students."
  },
  {
    id: "physics-12",
    title: "Advanced Physics for 12th Grade",
    subject: "Science",
    grade: "12",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Research-focused physics including modern physics and quantum mechanics for 12th grade students."
  },
  
  // Hebrew Books
  {
    id: "hebrew-5",
    title: "Hebrew Language for 5th Grade",
    subject: "Hebrew",
    grade: "5",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Hebrew language textbook covering grammar, vocabulary, and reading for 5th grade students."
  },
  {
    id: "hebrew-6",
    title: "Hebrew Language for 6th Grade",
    subject: "Hebrew",
    grade: "6",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Hebrew language textbook covering grammar, vocabulary, and reading for 6th grade students."
  },
  {
    id: "hebrew-7",
    title: "Hebrew Language for 7th Grade",
    subject: "Hebrew",
    grade: "7",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Hebrew language textbook covering grammar, vocabulary, and reading for 7th grade students."
  },
  {
    id: "hebrew-8",
    title: "Hebrew Language for 8th Grade",
    subject: "Hebrew",
    grade: "8",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Hebrew language textbook covering grammar, vocabulary, and reading for 8th grade students."
  },
  {
    id: "hebrew-9",
    title: "Hebrew Language for 9th Grade",
    subject: "Hebrew",
    grade: "9",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Hebrew language textbook covering grammar, vocabulary, and reading for 9th grade students."
  },
  // Adding Hebrew Books for Grades 10-12
  {
    id: "hebrew-10",
    title: "Hebrew Language for 10th Grade",
    subject: "Hebrew",
    grade: "10",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Advanced Hebrew language textbook covering literature, composition, and rhetoric for 10th grade students."
  },
  {
    id: "hebrew-11",
    title: "Hebrew Language for 11th Grade",
    subject: "Hebrew",
    grade: "11",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Advanced Hebrew language textbook covering classical literature, poetry, and advanced composition for 11th grade students."
  },
  {
    id: "hebrew-12",
    title: "Hebrew Language for 12th Grade",
    subject: "Hebrew",
    grade: "12",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Advanced Hebrew language textbook covering modern literature, critical analysis, and research writing for 12th grade students."
  },
  
  // History Books
  {
    id: "history-5",
    title: "History of Israel for 5th Grade",
    subject: "History",
    grade: "5",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Introduction to the history of Israel and Jewish people for 5th grade students."
  },
  {
    id: "history-6",
    title: "History of Israel for 6th Grade",
    subject: "History",
    grade: "6",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Advanced history of Israel and Jewish people for 6th grade students."
  },
  {
    id: "history-7",
    title: "World History for 7th Grade",
    subject: "History",
    grade: "7",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Introduction to world history and civilizations for 7th grade students."
  },
  {
    id: "history-8",
    title: "Modern History for 8th Grade",
    subject: "History",
    grade: "8",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Modern history and contemporary events for 8th grade students."
  },
  {
    id: "history-9",
    title: "Israeli Society for 9th Grade",
    subject: "History",
    grade: "9",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Study of Israeli society, culture, and identity for 9th grade students."
  },
  // Adding History Books for Grades 10-12
  {
    id: "history-10",
    title: "20th Century History for 10th Grade",
    subject: "History",
    grade: "10",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Comprehensive study of 20th century world history and major events for 10th grade students."
  },
  {
    id: "history-11",
    title: "Middle Eastern History for 11th Grade",
    subject: "History",
    grade: "11",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "In-depth study of Middle Eastern history, conflicts, and diplomacy for 11th grade students."
  },
  {
    id: "history-12",
    title: "Historical Research for 12th Grade",
    subject: "History",
    grade: "12",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Advanced historical research methods, historiography, and thesis development for 12th grade students."
  },
  
  // English Books
  {
    id: "english-5",
    title: "English for 5th Grade",
    subject: "English",
    grade: "5",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "English language textbook covering grammar, vocabulary, and reading for 5th grade students."
  },
  {
    id: "english-6",
    title: "English for 6th Grade",
    subject: "English",
    grade: "6",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "English language textbook covering grammar, vocabulary, and reading for 6th grade students."
  },
  {
    id: "english-7",
    title: "English for 7th Grade",
    subject: "English",
    grade: "7",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "English language textbook covering grammar, vocabulary, and reading for 7th grade students."
  },
  {
    id: "english-8",
    title: "English for 8th Grade",
    subject: "English",
    grade: "8",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "English language textbook covering grammar, vocabulary, and reading for 8th grade students."
  },
  {
    id: "english-9",
    title: "English for 9th Grade",
    subject: "English",
    grade: "9",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "English language textbook covering grammar, vocabulary, and reading for 9th grade students."
  },
  // Adding English Books for Grades 10-12
  {
    id: "english-10",
    title: "English for 10th Grade",
    subject: "English",
    grade: "10",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Advanced English language textbook covering literature, composition, and rhetoric for 10th grade students."
  },
  {
    id: "english-11",
    title: "English for 11th Grade",
    subject: "English",
    grade: "11",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Advanced English language textbook covering British and American literature, essay writing, and critical analysis for 11th grade students."
  },
  {
    id: "english-12",
    title: "English for 12th Grade",
    subject: "English",
    grade: "12",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Advanced English language textbook covering world literature, research writing, and public speaking for 12th grade students."
  },
  
  // Civics Books
  {
    id: "civics-5",
    title: "Citizenship for 5th Grade",
    subject: "Civics",
    grade: "5",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Introduction to citizenship and civic responsibilities for 5th grade students."
  },
  {
    id: "civics-6",
    title: "Citizenship for 6th Grade",
    subject: "Civics",
    grade: "6",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Advanced citizenship concepts and community involvement for 6th grade students."
  },
  {
    id: "civics-7",
    title: "Democracy for 7th Grade",
    subject: "Civics",
    grade: "7",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Introduction to Israeli democracy and government for 7th grade students."
  },
  {
    id: "civics-8",
    title: "Rights and Responsibilities for 8th Grade",
    subject: "Civics",
    grade: "8",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Rights and responsibilities of citizens for 8th grade students."
  },
  {
    id: "civics-9",
    title: "Israeli Government for 9th Grade",
    subject: "Civics",
    grade: "9",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51XNBZ9H7QL._SY445_SX342_.jpg",
    description: "Israeli government structure and functions for 9th grade students."
  },
  // Adding Civics Books for Grades 10-12
  {
    id: "civics-10",
    title: "Political Systems for 10th Grade",
    subject: "Civics",
    grade: "10",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51QWMKCNBGL._SY445_SX342_.jpg",
    description: "Comparative study of political systems and governance models for 10th grade students."
  },
  {
    id: "civics-11",
    title: "Law and Justice for 11th Grade",
    subject: "Civics",
    grade: "11",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51Y9H6RLF5L._SY445_SX342_.jpg",
    description: "Introduction to legal systems, constitutional law, and judicial processes for 11th grade students."
  },
  {
    id: "civics-12",
    title: "International Relations for 12th Grade",
    subject: "Civics",
    grade: "12",
    publisher: "Ministry of Education",
    imageUrl: "https://m.media-amazon.com/images/I/51CHWM7YJGL._SY445_SX342_.jpg",
    description: "Study of international organizations, diplomacy, and global governance for 12th grade students."
  }
];

// Function to get books by grade
function getBooksByGrade(grade) {
  return israeliCurriculumBooks.filter(book => book.grade === grade);
}

// Function to get books by subject
function getBooksBySubject(subject) {
  return israeliCurriculumBooks.filter(book => book.subject === subject);
}

// Function to get books by grade and subject
function getBooksByGradeAndSubject(grade, subject) {
  return israeliCurriculumBooks.filter(book => book.grade === grade && book.subject === subject);
}

export { israeliCurriculumBooks, getBooksByGrade, getBooksBySubject, getBooksByGradeAndSubject };
