var courseCount = 1;

function addCourse() {
    courseCount++;
    var courseContainer = document.getElementById("course-container");
    var newCourse = document.createElement("div");
    newCourse.className = "course";
    newCourse.innerHTML = `
        <label for="course-name-${courseCount}">اسم المادة</label>
        <input type="text" id="course-name-${courseCount}" name="course-name-${courseCount}" placeholder="مثال: مادة جديدة" required>
        <label for="gpa-${courseCount}">GPA</label>
        <input type="number" id="gpa-${courseCount}" name="gpa-${courseCount}" min="0" max="4" step="0.01" required>
        <label for="credits-${courseCount}">الساعات</label>
        <input type="number" id="credits-${courseCount}" name="credits-${courseCount}" min="1" max="6" step="1" required>
        <button type="button" onclick="removeCourse(this)">-</button>
    `;
    courseContainer.appendChild(newCourse);
}

function removeCourse(button) {
    var courseContainer = document.getElementById("course-container");
    if (courseContainer.children.length > 1) {
        courseContainer.removeChild(button.parentElement);
    }
}
function createStars() {
    const starsContainer = document.getElementById("stars-container");
    for (let i = 0; i < 20; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.innerHTML = "⭐";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 2}s`;
        starsContainer.appendChild(star);
    }
}

function createFireworks() {
    const fireworksContainer = document.getElementById("fireworks-container");
    for (let i = 0; i < 20; i++) {
        const firework = document.createElement("div");
        firework.className = "firework";
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.top = `${Math.random() * 100}vh`;
        firework.style.animationDelay = `${Math.random() * 1}s`;
        fireworksContainer.appendChild(firework);
    }
}
function clearCelebration() {
    const starsContainer = document.getElementById("stars-container");
    const fireworksContainer = document.getElementById("fireworks-container");
    starsContainer.innerHTML = ""; 
    fireworksContainer.innerHTML = "";
}
function stopAllSounds() {
    const sounds = document.querySelectorAll("audio");
    sounds.forEach(sound => {
        sound.pause(); 
        sound.currentTime = 0; 
    });
}

function playSound(grade) {
    stopAllSounds(); 

    const soundMap = {
        "A+": "sound-a-plus",
        "A": "sound-a",
        "B+": "sound-b-plus",
        "B": "sound-b",
        "C+": "sound-c-plus",
        "C": "sound-c",
        "D": "sound-d",
        "F": "sound-f",
    };
    const soundId = soundMap[grade];
    if (soundId) {
        const sound = document.getElementById(soundId);
        sound.play();
    }
}

var form = document.getElementById("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    var totalPoints = 0;
    var totalCredits = 0;
    for (var i = 1; i <= courseCount; i++) {
        var gpaElement = document.getElementById("gpa-" + i);
        var creditsElement = document.getElementById("credits-" + i);
        if (gpaElement && creditsElement) {
            var gpa = parseFloat(gpaElement.value);
            var credits = parseInt(creditsElement.value);
            totalPoints += gpa * credits;
            totalCredits += credits;
        }
    }
    var overallGPA = totalPoints / totalCredits;
    var result = document.getElementById("result");
    result.innerHTML = "Overall GPA: " + overallGPA.toFixed(2);
    var percentage = (overallGPA / 4) * 100;
    var percentageElement = document.getElementById("percentage");
    percentageElement.innerHTML = "Percentage: " + percentage.toFixed(2) + "%";

    function getGrade(overallGPA) {
        if (overallGPA > 3.667 && overallGPA <= 4) {
            return ["A+", "green"];
        } else if (overallGPA > 3.333 && overallGPA <= 3.667) {
            return ["A", "lime"];
        } else if (overallGPA >= 3.000 && overallGPA <= 3.333) {
            return ["B+", "yellow"];
        } else if (overallGPA > 2.667 && overallGPA <= 3.000) {
            return ["B", "orange"];
        } else if (overallGPA > 2.333 && overallGPA <= 2.667) {
            return ["C+", "coral"];
        } else if (overallGPA > 2.000 && overallGPA <= 2.333) {
            return ["C", "salmon"];
        } else if (overallGPA === 2) {  
            return ["D", "pink"];
        } else {
            return ["F", "red"];
        }
    }
    
    var grade = getGrade(overallGPA)[0]; 
    var color = getGrade(overallGPA)[1];
    
    var gradeElement = document.getElementById("grade");
    gradeElement.innerHTML = "Grade: <span style='color:" + color + "'>" + grade + "</span>";
    

    var celebration = document.getElementById("celebration");
    if (overallGPA > 2) {
        celebration.style.display = "block";
        createStars(); 
        createFireworks(); 
        playSound(grade); 
        setTimeout(() => {
            celebration.style.display = "none";
            clearCelebration(); 
        }, 5000); 
    } else {
        celebration.style.display = "none";
        playSound(grade);
    }
});
/*مارك بيمسي عليك*/ 