/** Global counter for tracking number of courses */
let courseCount = 1;

/** Constants for course validation */
const COURSE_LIMITS = {
  MIN_GPA: 0,
  MAX_GPA: 4,
  MIN_CREDITS: 1,
  MAX_CREDITS: 6,
};

/**
 * Creates HTML template for a new course row
 * @param {number} id - Course counter value
 * @returns {string} HTML template string
 */
const createCourseTemplate = (id) => `
  <label for="course-name-${id}">اسم المادة</label>
  <input
    type="text"
    id="course-name-${id}"
    name="course-name-${id}"
    placeholder="مثال: مادة جديدة"
    required
  >
  <label for="gpa-${id}">GPA</label>
  <input
    type="number"
    id="gpa-${id}"
    name="gpa-${id}"
    min="${COURSE_LIMITS.MIN_GPA}"
    max="${COURSE_LIMITS.MAX_GPA}"
    step="0.01"
    required
  >
  <label for="credits-${id}">الساعات</label>
  <input
    type="number"
    id="credits-${id}"
    name="credits-${id}"
    min="${COURSE_LIMITS.MIN_CREDITS}"
    max="${COURSE_LIMITS.MAX_CREDITS}"
    step="1"
    required
  >
  <button type="button" onclick="removeCourse(this)">-</button>
`;

/**
 * Adds a new course row to the form
 */
const addCourse = () => {
  courseCount++;
  const courseContainer = document.getElementById("course-container");
  const newCourse = document.createElement("div");
  newCourse.className = "course";
  newCourse.innerHTML = createCourseTemplate(courseCount);
  courseContainer.appendChild(newCourse);
};

/**
 * Removes a course row from the form
 * @param {HTMLElement} button - Button element that triggered the removal
 */
const removeCourse = (button) => {
  const courseContainer = document.getElementById("course-container");
  if (courseContainer.children.length > 1) {
    courseContainer.removeChild(button.parentElement);
  }
};

/**
 * Determines grade and color based on percentage
 * @param {number} percentage - Calculated percentage
 * @returns {[string, string]} Grade and color tuple
 */
const getGrade = (percentage) => {
  if (percentage >= 90) return ["A+", "green"];
  if (percentage >= 85) return ["A", "lime"];
  if (percentage >= 80) return ["B+", "yellow"];
  if (percentage >= 75) return ["B", "orange"];
  if (percentage >= 70) return ["C+", "coral"];
  if (percentage >= 65) return ["C", "salmon"];
  if (percentage >= 60) return ["D", "pink"];
  return ["F", "red"];
};

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 1; i <= courseCount; i++) {
    const gpaElement = document.getElementById(`gpa-${i}`);
    const creditsElement = document.getElementById(`credits-${i}`);

    if (gpaElement && creditsElement) {
      const gpa = parseFloat(gpaElement.value);
      const credits = parseInt(creditsElement.value);
      totalPoints += gpa * credits;
      totalCredits += credits;
    }
  }

  const overallGPA = totalPoints / totalCredits;
  const result = document.getElementById("result");
  result.innerHTML = `Overall GPA: ${overallGPA.toFixed(2)}`;

  const percentage = (overallGPA / 4) * 100;
  const percentageElement = document.getElementById("percentage");
  percentageElement.innerHTML = `Percentage: ${percentage.toFixed(2)}%`;

  const [grade, color] = getGrade(percentage);
  const gradeElement = document.getElementById("grade");
  gradeElement.innerHTML = `Grade: <span class='${grade}'>${grade}</span>`;

  const celebration = document.getElementById("celebration");
  celebration.style.display = overallGPA > 2 ? "block" : "none";
});
