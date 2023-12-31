function addStudentData() {
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var midterm = document.getElementById('midterm').value;
    var final = document.getElementById('final').value;

   
    if (midterm === '' || final === '') {
        alert('PLEASE FIIL IN THE BLANCK.');
        return;
    }

    midterm = parseFloat(midterm);
    final = parseFloat(final);

    if (midterm < 0 || midterm > 100 || final < 0 || final > 100) {
        alert('PLEASE WRITE LOGICAL MARK ');
        return;
    }

    var courseSelector = document.getElementById('courseSelector');
    var selectedCourseName = courseSelector.options[courseSelector.selectedIndex].text;
    var selectedCourseId = courseSelector.value;
    var grade;
    var calc = document.querySelector('input[name="calculationgrade"]:checked').value;

    if (calc === "10scale") {
        grade = calculateTenPointLetterGrade(midterm, final);
    } else if (calc === "7scale") {
        grade = calculateSevenPointLetterGrade(midterm, final);
    }


    if (!studentExists(name, surname, selectedCourseName)) {
        addToStudentTable(name, surname, midterm, final, selectedCourseName, selectedCourseId, grade);
    } else {
        alert('THIS STUDENT RECORDED THIS COURSE.');
    }

    document.getElementById('studentForm').reset();
}

function studentExists(name, surname, courseName) {
    var table = document.getElementById('dataTableStudent');
    var rows = table.getElementsByTagName('tr');
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        if (cells[0].innerHTML === name && cells[1].innerHTML === surname && cells[4].innerHTML === courseName) {
            return true; 
        }
    }
    return false; 
}

function addToStudentTable(name, surname, midterm, final, courseName, courseId, letterGrade) {
    var table = document.getElementById('dataTableStudent').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    cell1.innerHTML = name;
    cell2.innerHTML = surname;
    cell3.innerHTML = midterm;
    cell4.innerHTML = final;
    cell5.innerHTML = courseName;
    cell6.innerHTML = courseId;
    cell7.innerHTML = letterGrade;
}


    function viewAllStudentScores() {
          // Display all student scores in a separate table
        var table = document.getElementById('dataTableStudent').getElementsByTagName('tbody')[0];
        var allStudentScoresTableBody = document.getElementById('allStudentScoresTableBody');

       
        clearTable(allStudentScoresTableBody);
         // Copy data from main student table to all student scores table

        for (var i = 0; i < table.rows.length; i++) {
            
            var name = table.rows[i].cells[0].innerHTML;
            var surname = table.rows[i].cells[1].innerHTML;
            var midterm = table.rows[i].cells[2].innerHTML;
            var final = table.rows[i].cells[3].innerHTML;
            var courseName = table.rows[i].cells[4].innerHTML;
            var courseId= table.rows[i].cells[5].innerHTML;
            var letterGrade = table.rows[i].cells[6].innerHTML;

           
            

           
            var newRow = allStudentScoresTableBody.insertRow(allStudentScoresTableBody.rows.length);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);
            var cell6 = newRow.insertCell(5);
            var cell7 = newRow.insertCell(6);

            cell1.innerHTML = name;
            cell2.innerHTML = surname;
            cell3.innerHTML = midterm;
            cell4.innerHTML = final;
            cell5.innerHTML = courseName;
            cell6.innerHTML = courseId; 
            cell7.innerHTML = letterGrade;
        }
    }


    
    function listby() {

        // Filter rows in a table based on a selected course
      var selectedCourse = document.getElementById("courseSelector2").value;
      

      var tbody = document.getElementById("nazli");
      

      var rows = tbody.getElementsByTagName("tr");

      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        
 
        var courseName = cells[4].textContent || cells[4].innerText;
        

        if (courseName === selectedCourse || selectedCourse === "") {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }

   

    function addCourseData() {
        var courseName = document.getElementById('courseName').value;
        var courseCode = document.getElementById('courseCode').value;
        var courseCredit = document.getElementById('courseCredit').value;

        
          addToCourseTable(courseName, courseCode,courseCredit);
          updateCourseSelector();
          updateCourseSelector2();
          updateCourseSelector3();
          updateCourseSelector4();
          updateCourseSelector5();

         
       

        
        
        document.getElementById('courseForm').reset();
    }
    function addToCourseTable(courseName, courseCode, courseCredit) {
    var table = document.getElementById('dataTableCourse').getElementsByTagName('tbody')[0];

   // Loop to check existing course codes
    var existingRows = table.rows;
    for (var i = 0; i < existingRows.length; i++) {
        if (existingRows[i].cells[1].textContent === courseCode) {
           
            alert('Course already exist: ' + courseCode);
            return; // end of the function
        }
    }

   // If the course code is new, add it to the table
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = courseName;
    cell2.innerHTML = courseCode;
    cell3.innerHTML = courseCredit;
}

   
function calculateTenPointLetterGrade(midterm, final) {
    var totalGrade = 0.4 * midterm + 0.6 * final;

    if (totalGrade >= 90) {
        return 'AA';
    } else if (totalGrade >= 85) {
        return 'BA';
    } else if (totalGrade >= 80) {
        return 'BB';
    } else if (totalGrade >= 75) {
        return 'CB';
    } else if (totalGrade >= 70) {
        return 'CC';
    } else if (totalGrade >= 65) {
        return 'DC';
    } else if (totalGrade >= 60) {
        return 'DD';
    } else if (totalGrade <= 59) {
        return 'FF';
    } 
    
}

function calculateSevenPointLetterGrade(midterm,final) {
    var percentage = 0.4 * midterm + 0.6 * final;
    if (percentage >= 93) {
        return 'AA';
    } else if (percentage >= 85 && percentage <= 92) {
        return 'BA';
    } else if (percentage >= 77 && percentage <= 84) {
        return 'BB';
    } else if (percentage >= 70 && percentage <= 76) {
        return 'CB';
    } else if (percentage >= 65 && percentage <= 69) {
        return 'DC';
    } else if (percentage >= 60 && percentage <= 64) {
        return 'DD';
    } else if (percentage<59){
        return 'F'; 
    }
}

    
    
function updateCourseSelector() {
    var courseSelector = document.getElementById('courseSelector');
    var courseTable = document.getElementById('dataTableCourse').getElementsByTagName('tbody')[0];

    for (var i = 0; i < courseTable.rows.length; i++) {
        var courseId = courseTable.rows[i].cells[1].innerHTML;
        var courseName = courseTable.rows[i].cells[0].innerHTML;

        // Check if the option already exists
        var exists = false;
        for (var j = 0; j < courseSelector.options.length; j++) {
            if (courseSelector.options[j].value === courseId) {
                exists = true;
                break;
            }
        }

        // Add the option if it doesn't exist
        if (!exists) {
            var option = document.createElement('option');
            option.value = courseId;
            option.text = courseName;
            courseSelector.add(option);
        }
    }
   } 


function updateCourseSelector2() {
    var courseSelector = document.getElementById('courseSelector2');
    var courseTable = document.getElementById('dataTableCourse').getElementsByTagName('tbody')[0];

    for (var i = 0; i < courseTable.rows.length; i++) {
        var courseId = courseTable.rows[i].cells[1].innerHTML;
        var courseName = courseTable.rows[i].cells[0].innerHTML;

        // Check if the option already exists
        var exists = false;
        for (var j = 0; j < courseSelector.options.length; j++) {
            if (courseSelector.options[j].value === courseId) {
                exists = true;
                break;
            }
        }

        // Add the option if it doesn't exist
        if (!exists) {
            var option = document.createElement('option');
            option.value = courseId;
            option.text = courseName;
            courseSelector.add(option);
        }
    }
    }
 
   
     function searchcourses() {
          // Get the input from the search field and convert it to lower case
        var searchInput = document.getElementById('searchInput').value.toLowerCase();
        var studentTableBody = document.getElementById('studentTableBody');
        
        var table = document.getElementById('dataTableStudent').getElementsByTagName('tbody')[0];

        
        clearTable(studentTableBody);

        for (var i = 0; i < table.rows.length; i++) {
           
            var name = table.rows[i].cells[0].innerHTML.toLowerCase();
            var surname = table.rows[i].cells[1].innerHTML.toLowerCase();
            var courseName = table.rows[i].cells[4].innerHTML.toLowerCase();
            
              // If the course name includes the search input, add the row to the student table body
            if ( courseName.includes(searchInput)) {
                var newRow = studentTableBody.insertRow(studentTableBody.rows.length);

                for (var j = 0; j < 7; j++) {
                    var cell = newRow.insertCell(j);
                    cell.innerHTML = table.rows[i].cells[j].innerHTML;
                }
            }
           
        }
        
    }   
    


    function clearTable(table) {

        while (table.rows.length > 0) {
            table.deleteRow(0);
        }
    }


  

    function updateLectureSelector() {
        var lectureSelector = document.getElementById('lectureSelector');
        var courseTable = document.getElementById('dataTableCourse').getElementsByTagName('tbody')[0];

        for (var i = 0; i < courseTable.rows.length; i++) {
            var courseId = courseTable.rows[i].cells[1].innerHTML;
            var courseName = courseTable.rows[i].cells[0].innerHTML;
            // Create a new option element with the course ID and name
            var option = document.createElement('option');
            option.value = courseId;
            option.text = courseName;
            lectureSelector.add(option);
        }
    }

   


function deleteStudent() {
    var nameToDelete = document.getElementById('name').value;
    var surnameToDelete = document.getElementById('surname').value;
    // Get the student data table
    var table = document.getElementById('dataTableStudent').getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        var currentName = table.rows[i].cells[0].innerHTML;
        var currentSurname = table.rows[i].cells[1].innerHTML;

     
        if (currentName === nameToDelete && currentSurname === surnameToDelete) {
            table.deleteRow(i);
            break;
        }
    }
}

function deleteCourse() {
    var courseNameToDelete = document.getElementById('courseName').value;
    var courseIdToDelete = document.getElementById('courseCode').value;
    var creditToDelete = document.getElementById('courseCredit').value;

    // Get the course data table
    var table = document.getElementById('dataTableCourse').getElementsByTagName('tbody')[0];
    var courseFound = false;

    for (var i = 0; i < table.rows.length; i++) {
        var currentCourseName = table.rows[i].cells[0].innerHTML;
        var currentCourseId = table.rows[i].cells[1].innerHTML;
        var currentCredit = table.rows[i].cells[2].innerHTML;

        if (currentCourseName === courseNameToDelete && currentCourseId === courseIdToDelete && currentCredit === creditToDelete) {
            table.deleteRow(i);
            courseFound = true;
            break;
        }
    }

    if (!courseFound) {
        alert('DOES NOT EXIST COURSE.');
    }
}
function updateStudentScores() {
    var nameToUpdate = document.getElementById('name').value;
    var surnameToUpdate = document.getElementById('surname').value;
    var newMidterm = parseFloat(document.getElementById('midterm').value);
    var newFinal = parseFloat(document.getElementById('final').value);
    if (nameToUpdate === '' || surnameToUpdate === '' || newMidterm === '' || newFinal === '') {
        alert('PLEASE FIIL IN THE BLANCK.');
        return;
    }
    
  
        var table = document.getElementById('dataTableStudent').getElementsByTagName('tbody')[0];
    
        for (var i = 0; i < table.rows.length; i++) {
            var currentName = table.rows[i].cells[0].innerHTML;
            var currentSurname = table.rows[i].cells[1].innerHTML;
            
            
    
          
            if (currentName === nameToUpdate && currentSurname === surnameToUpdate) {
                table.rows[i].cells[2].innerHTML = newMidterm;
                table.rows[i].cells[3].innerHTML = newFinal;
            
                var grade;
    
               
                grade = calculateTenPointLetterGrade(newMidterm, newFinal);
                
               
         
                table.rows[i].cells[6].innerHTML = grade;
                break;
            }
        }
    
   
}
function searchStudentsByNameAndSurname() {
    var searchInput = document.getElementById('searchInputname').value.toLowerCase();
    var studentTableBody = document.getElementById('sttable');
    
    
    var table = document.getElementById('dataTableStudent').getElementsByTagName('tbody')[0];

  
    clearTable(studentTableBody);

    for (var i = 0; i < table.rows.length; i++) {
    
        var name = table.rows[i].cells[0].innerHTML.toLowerCase();
        var surname = table.rows[i].cells[1].innerHTML.toLowerCase();

      
        if (name.includes(searchInput)|| surname.includes(searchInput)) {
            var newRow = studentTableBody.insertRow(studentTableBody.rows.length);

            for (var j = 0; j < 7; j++) {
                var cell = newRow.insertCell(j);
                cell.innerHTML = table.rows[i].cells[j].innerHTML;
            }
        }
    }
}

function listby(){

     
       var selectedCourse = document.getElementById("courseSelector2").value.toLowerCase();


var studentTableBody = document.getElementById("le");


var rows = document.getElementById("dataTableStudent").getElementsByTagName("tbody")[0].rows;


clearTable(studentTableBody);

for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].cells;
    var courseID = cells[5].textContent || cells[5].innerText;


    if (courseID.toLowerCase() === selectedCourse) {
       
        var newRow = studentTableBody.insertRow(-1);
        for (var j = 0; j < cells.length; j++) {
            var newCell = newRow.insertCell(j);
            newCell.innerHTML = cells[j].innerHTML;
        }
    }
}



}
function listby1() {
    var selectedCourse = document.getElementById("courseSelector3").value.toLowerCase();
    var studentTableBody = document.getElementById("lem");
    var rows = document.getElementById("dataTableStudent").getElementsByTagName("tbody")[0].rows;

    clearTable(studentTableBody);

    var countF = 0; // Counter for students with 'F' grade

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;
        var courseID = cells[5].textContent || cells[5].innerText;
        var letterGrade = cells[6].textContent || cells[6].innerText;

        if (courseID.toLowerCase() === selectedCourse && letterGrade === 'FF') {
            var newRow = studentTableBody.insertRow(-1);
            newRow.style.backgroundColor = "red";
            for (var j = 0; j < cells.length; j++) {
                var newCell = newRow.insertCell(j);
                newCell.innerHTML = cells[j].innerHTML;
            }
            countF++; // Increment counter for each 'F' grade found
        }
    }

    // Check if no students with 'F' grade were found
    if (countF === 0) {
        alert("No students.");
    }
}


function updateCourseSelector3() {
    var courseSelector = document.getElementById('courseSelector3');
    var courseTable = document.getElementById('dataTableCourse').getElementsByTagName('tbody')[0];

    for (var i = 0; i < courseTable.rows.length; i++) {
        var courseId = courseTable.rows[i].cells[1].innerHTML;
        var courseName = courseTable.rows[i].cells[0].innerHTML;

        // Check if the option already exists
        var exists = false;
        for (var j = 0; j < courseSelector.options.length; j++) {
            if (courseSelector.options[j].value === courseId) {
                exists = true;
                break;
            }
        }

        // Add the option if it doesn't exist
        if (!exists) {
            var option = document.createElement('option');
            option.value = courseId;
            option.text = courseName;
            courseSelector.add(option);
        }
    }
}

function listby2() {
    var selectedCourse = document.getElementById("courseSelector4").value.toLowerCase();
    var studentTableBody = document.getElementById("lema");
    var rows = document.getElementById("dataTableStudent").getElementsByTagName("tbody")[0].rows;

    clearTable(studentTableBody);

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;
        var courseID = cells[5].textContent || cells[5].innerText;
        var letterGrade = cells[6].textContent || cells[6].innerText;

        if (courseID.toLowerCase() === selectedCourse && letterGrade !== 'FF') {
            var newRow = studentTableBody.insertRow(-1);
            newRow.style.backgroundColor = "green"; // Set background color of the row to green
            for (var j = 0; j < cells.length; j++) {
                var newCell = newRow.insertCell(j);
                newCell.innerHTML = cells[j].innerHTML;
            }
        }
    }
}    


function updateCourseSelector4() {
    var courseSelector = document.getElementById('courseSelector4');
    var courseTable = document.getElementById('dataTableCourse').getElementsByTagName('tbody')[0];

    for (var i = 0; i < courseTable.rows.length; i++) {
        var courseId = courseTable.rows[i].cells[1].innerHTML;
        var courseName = courseTable.rows[i].cells[0].innerHTML;

        // Check if the option already exists
        var exists = false;
        for (var j = 0; j < courseSelector.options.length; j++) {
            if (courseSelector.options[j].value === courseId) {
                exists = true;
                break;
            }
        }

        // Add the option if it doesn't exist
        if (!exists) {
            var option = document.createElement('option');
            option.value = courseId;
            option.text = courseName;
            courseSelector.add(option);
        }
    }
}

    function listby3() {
    var selectedCourse = document.getElementById("courseSelector5").value.toLowerCase();
    var studentTableBody = document.getElementById("leman");
    var rows = document.getElementById("dataTableStudent").getElementsByTagName("tbody")[0].rows;

    clearTable(studentTableBody);

    var passedCount = 0;
    var failedCount = 0;
    var studentCount = 0;

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;
        var courseID = cells[5].textContent.toLowerCase(); 
        var letterGrade = cells[6].textContent;

        if (courseID === selectedCourse) {
            studentCount++;
            if (letterGrade === 'FF') {
                failedCount++;
            } else {
                passedCount++;
            }
        }
    }

   
    var newRow = studentTableBody.insertRow(-1);
    var courseCell = newRow.insertCell(0);
    var passedCell = newRow.insertCell(1);
    var failedCell = newRow.insertCell(2);

    courseCell.innerHTML = selectedCourse; 
    passedCell.innerHTML = passedCount;   
    failedCell.innerHTML = failedCount;    
}

function updateCourseSelector5() {
    var courseSelector = document.getElementById('courseSelector5');
    var courseTable = document.getElementById('dataTableCourse').getElementsByTagName('tbody')[0];

    for (var i = 0; i < courseTable.rows.length; i++) {
        var courseId = courseTable.rows[i].cells[1].innerHTML;
        var courseName = courseTable.rows[i].cells[0].innerHTML;

        // Check if the option already exists
        var exists = false;
        for (var j = 0; j < courseSelector.options.length; j++) {
            if (courseSelector.options[j].value === courseId) {
                exists = true;
                break;
            }
        }

        // Add the option if it doesn't exist
        if (!exists) {
            var option = document.createElement('option');
            option.value = courseId;
            option.text = courseName;
            courseSelector.add(option);
        }
    }
}



function toggleNav() {
    var sidebar = document.getElementById('sidebar');
    var currentWidth = sidebar.style.width;
    
    if (currentWidth === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

// Event listener for the open/close button
document.getElementById('openBtn').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from being registered on the document
    toggleNav();
});

// Event listener to close the sidebar if the user clicks outside of it
document.addEventListener('click', function(event) {
    var isClickInsideSidebar = document.getElementById('sidebar').contains(event.target);
    
    if (!isClickInsideSidebar) {
        document.getElementById('sidebar').style.width = '0';
    }
});

// Optional: Prevent clicks inside the sidebar from closing it
document.getElementById('sidebar').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from being registered on the document
});
function calculateAndDisplayGPA() {
    const studentRows = document.querySelectorAll('#dataTableStudent tbody tr');
    const courseRows = document.querySelectorAll('#dataTableCourse tbody tr');

    let courseCredits = {};
    courseRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const courseID = cells[1].textContent;
        const credit = parseInt(cells[2].textContent);
        courseCredits[courseID] = credit;
    });

    let studentGPAs = {};
    studentRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const name = cells[0].textContent;
        const surname = cells[1].textContent;
        const grade = convertGradeToFourPointScale((parseInt(cells[2].textContent) + parseInt(cells[3].textContent)) / 2);
        const courseID = cells[5].textContent;
        const credit = courseCredits[courseID] || 0;

        const weightedScore = grade * credit;

        if (!studentGPAs[name + surname]) {
            studentGPAs[name + surname] = { totalWeightedScore: 0, totalCredits: 0 };
        }
        studentGPAs[name + surname].totalWeightedScore += weightedScore;
        studentGPAs[name + surname].totalCredits += credit;
    });

    const resultsTableBody = document.querySelector('#resultsTable tbody');
    resultsTableBody.innerHTML = '';

    for (const [key, value] of Object.entries(studentGPAs)) {
        const finalGPA = value.totalCredits > 0 ? value.totalWeightedScore / value.totalCredits : 0;
        const row = document.createElement('tr');
        const nameSurname = key.split(' ');
        row.innerHTML = `<td>${nameSurname[0]}</td><td>${finalGPA.toFixed(2)}</td>`;
        resultsTableBody.appendChild(row);
    }
}
function convertGradeToFourPointScale(grade) {
    // Example conversion, adjust according to your grading system
    if (grade >= 90) return 4.0;
    if (grade >= 80) return 3.0;
    if (grade >= 70) return 2.0;
    if (grade >= 60) return 1.0;
    return 0;
}
