/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Global variables
let ITEMS_PER_PAGE = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(data, page) {
    let studentUL = document.querySelector('.student-list');
    let startIndex = (page * ITEMS_PER_PAGE) - ITEMS_PER_PAGE
    let endIndex = page * ITEMS_PER_PAGE

    // Clear the existing students
    studentUL.innerHTML = ""

    // Iterate over each student in the data
    for (let i = 0; i < data.length; i++) {
        let student = data[i];

        let studentHTML = `
             <li class="student-item cf">
               <div class="student-details">
               <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
               <h3>${student.name.first} ${student.name.last}</h3>
               <span class="email">${student.email}</span>
               </div>
               <div class="joined-details">
               <span class="date">Joined ${student.registered.date}</span>
               </div>
              </li>
              `;

        if (i >= startIndex && i < endIndex) {
            // Append the studentHTML to the studentUL
            studentUL.insertAdjacentHTML('beforeend', studentHTML);
        }


    }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(data) {
    let numPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    let buttonUL = document.querySelector('.link-list');

    buttonUL.innerHTML = "";

    for (let i = 1; i <= numPages; i++) {
        let buttonString = `
             <li>
                <button type="button" data-num="${i}">${i}</button>
             </li>
             `;
        buttonUL.insertAdjacentHTML('beforeend', buttonString);
        }

    if (buttonUL.firstElementChild) {
        // we are updating the first button only as the site is defaulting to page 1
        buttonUL.querySelector('button').className = 'active';
    }

    buttonUL.addEventListener('click', (e) => {
        let clickedButton = e.target;
        if (clickedButton.nodeName === 'BUTTON') {
            let page = Number(clickedButton.dataset.num);

            // resets the class name of the previously active button
            buttonUL.querySelector('.active').className = "";

            // updates the currently clicked button
            clickedButton.className = "active";
            showPage(data, page);
        }
    })
}


// Call functions

showPage(data, 1);
addPagination(data)