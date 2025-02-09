// Constants
const PROGRAMMING_TIPS = [
  "Use fetch API in javascript",
  "Use local storage in javascript", 
  "Use session storage in javascript",
  "Use cookies in javascript",
  "Use web workers in javascript"
];

const MIN_PASSING_GRADE = 60;
const EXCELLENT_GRADE_MIN = 90;
const EXCELLENT_GRADE_MAX = 100;

/**
* Returns a random tip from the tips array
* @returns {string} Random programming tip
*/
const getRandomTip = () => {
  const randomIndex = Math.floor(Math.random() * PROGRAMMING_TIPS.length);
  return PROGRAMMING_TIPS[randomIndex];
};

/**
* Validates an email address
* @param {string} email - Email address to validate
* @returns {boolean} True if email is valid
*/
const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
* Student class to manage student data
*/
class Student {
  constructor(name, degree) {
      this.name = name;
      this.degree = degree;
  }

  isPassing() {
      return this.degree >= MIN_PASSING_GRADE;
  }

  isExcellent() {
      return this.degree >= EXCELLENT_GRADE_MIN && this.degree <= EXCELLENT_GRADE_MAX;
  }
}

/**
* StudentManager class to handle student operations
*/
class StudentManager {
  constructor(students = []) {
      this.students = students.map(s => new Student(s.name, s.degree));
  }

  addStudent(name, degree) {
      this.students.push(new Student(name, degree));
  }

  removeLastStudent() {
      return this.students.pop();
  }

  getExcellentStudents() {
      return this.students.filter(student => student.isExcellent());
  }

  getFailingStudents() {
      return this.students.filter(student => !student.isPassing());
  }

  sortByName() {
      return this.students.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDegreeDescending() {
      return this.students.sort((a, b) => b.degree - a.degree);
  }
}

// Implementation
try {
  // Task 1: Display random tip
  console.log('Daily Tip:', getRandomTip());

  // Task 2: Email validation
  const userEmail = prompt("Enter your email");
  console.log('Email is valid:', isValidEmail(userEmail));

  // Task 3: Grades handling
  const grades = [60, 100, 10, 15, 82];
  const sortedGrades = [...grades].sort((a, b) => b - a);
  const failingGrades = grades.filter(grade => grade < MIN_PASSING_GRADE);

  console.log('Sorted grades:', sortedGrades);
  console.log('Failing grades:', failingGrades);

  // Task 4: Student management
  const initialStudents = [
      { name: "Tarek", degree: 100 },
      { name: "Ahmed", degree: 60 },
      { name: "Ali", degree: 10 },
      { name: "Osama", degree: 15 }
  ];

  const studentManager = new StudentManager(initialStudents);

  // Add and remove students
  studentManager.addStudent("Mohamed", 80);
  studentManager.removeLastStudent();

  // Display various student lists
  console.log('Excellent students:', studentManager.getExcellentStudents());
  console.log('Failing students:', studentManager.getFailingStudents());
  console.log('Students sorted by name:', studentManager.sortByName());

  // Insert new students at specific position
  studentManager.students.splice(2, 0, 
      new Student("Sara", 70),
      new Student("Nada", 50)
  );

  // Remove student at specific position
  studentManager.students.splice(3, 1);

  console.log('Final student list:', studentManager.students);

} catch (error) {
  console.error('An error occurred:', error.message);
}