const courses = [
  { name: 'WDD 130', credits: 3, subject: 'WDD', completed: false },
  { name: 'WDD 131', credits: 3, subject: 'WDD', completed: false },
  { name: 'WDD 231', credits: 3, subject: 'WDD', completed: false },
  { name: 'CSE 110', credits: 4, subject: 'CSE', completed: false },
  { name: 'CSE 121', credits: 4, subject: 'CSE', completed: false },
  { name: 'CSE 210', credits: 4, subject: 'CSE', completed: false },
];

const coursesContainer = document.getElementById('courses');
const showAllBtn = document.getElementById('show-all');
const showWddBtn = document.getElementById('show-wdd');
const showCseBtn = document.getElementById('show-cse');

function displayCourses(filterFn) {
  coursesContainer.innerHTML = '';
  const filteredCourses = courses.filter(filterFn);
  let totalCredits = 0;

  filteredCourses.forEach(course => {
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-card';
    if (course.completed) {
      courseDiv.classList.add('completed');
    }

    courseDiv.innerHTML = `
      <h3>${course.name}</h3>
      <p>Credits: ${course.credits}</p>
    `;
    coursesContainer.appendChild(courseDiv);
    totalCredits += course.credits;
  });

  // Display total credits
  let totalDiv = document.getElementById('total-credits');
  if (!totalDiv) {
    totalDiv = document.createElement('div');
    totalDiv.id = 'total-credits';
    coursesContainer.appendChild(totalDiv);
  }
  totalDiv.innerHTML = `<p>Total Credits: ${totalCredits}</p>`;
}

// Event listeners
showAllBtn.addEventListener('click', () => displayCourses(() => true));
showWddBtn.addEventListener('click', () => displayCourses(c => c.subject === 'WDD'));
showCseBtn.addEventListener('click', () => displayCourses(c => c.subject === 'CSE'));

// Initialize display
displayCourses(() => true);