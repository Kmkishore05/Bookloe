document.addEventListener('DOMContentLoaded', function() {
    // Create the sparkle effect on mousemove
    document.body.addEventListener('mousemove', function(e) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Set sparkle position to mouse cursor
        sparkle.style.left = `${e.pageX - 5}px`;
        sparkle.style.top = `${e.pageY - 5}px`;

        // Append to body
        document.body.appendChild(sparkle);

        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var overlay = document.querySelector(".overlay");
    var popupbox = document.querySelector(".popup-box");
    var addbutton = document.getElementById("popup-button");
    var cancelbutton = document.getElementById("cancel-book");
    var addBookButton = document.getElementById("add-book");
    var booksContainer = document.querySelector(".container");

    if (overlay && popupbox && addbutton && cancelbutton && addBookButton && booksContainer) {

        // Show popup
        addbutton.addEventListener("click", function() {
            popupbox.style.display = "block";
            overlay.style.display = "block";
        });

        // Close popup
        cancelbutton.addEventListener("click", function() {
            popupbox.style.display = "none";
            overlay.style.display = "none";
        });

        overlay.addEventListener("click", function() {
            popupbox.style.display = "none";
            overlay.style.display = "none";
        });

        // Add book to the list without redirecting
        addBookButton.addEventListener("click", function(e) {
            e.preventDefault();

            // Get the values from the form
            var bookTitle = document.getElementById("book-title-input").value;
            var bookAuthor = document.getElementById("book-author-input").value;
            var bookDescription = document.getElementById("book-description").value;
            var imageUpload = document.getElementById("imageUpload").files[0];

            if (bookTitle && bookAuthor && bookDescription && imageUpload) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    var imageSrc = event.target.result;

                    // Create a new book container
                    var newBook = document.createElement('div');
                    newBook.classList.add('box-container');
                    newBook.innerHTML = `
                        <h2>Title: ${bookTitle}</h2>
                        <h3>Author: ${bookAuthor}</h3>
                        <img src="${imageSrc}" alt="${bookTitle}">
                        <p>${bookDescription}</p>
                        <button>Remove</button>
                    `;

                    // Append the new book to the books container
                    booksContainer.appendChild(newBook);

                    // Close the popup
                    popupbox.style.display = "none";
                    overlay.style.display = "none";

                    // Clear the form inputs
                    document.getElementById("book-title-input").value = '';
                    document.getElementById("book-author-input").value = '';
                    document.getElementById("book-description").value = '';
                    document.getElementById("imageUpload").value = '';
                };

                reader.readAsDataURL(imageUpload);
            } else {
                alert('Please fill in all fields and upload an image.');
            }
        });

    } else {
        console.error("Required elements not found in the DOM.");
    }
});
