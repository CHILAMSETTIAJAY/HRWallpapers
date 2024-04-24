// Function to reload the page
function reloadPage(event) {
  event.preventDefault(); // Prevent the default behavior (page reload)
  // Add any custom logic here if needed
}
function alertmsg(e , msg){
  e.preventDefault();
  document.getElementById("fullscreenAlert").style.display = "flex";
  document.getElementById("alert-msg").innerHTML=msg;
  // Close the alert after 3 seconds (adjust the time as needed)
  setTimeout(function() {
    document.getElementById("fullscreenAlert").style.display = "none";
  }, 2000);
}
// Your Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAnyYghvHYwHY2Rbi5F1d6DuxVcnnAHEzI",
  authDomain: "hrwallpapers04.firebaseapp.com",
  projectId: "hrwallpapers04",
  storageBucket: "hrwallpapers04.appspot.com",
  messagingSenderId: "648756107215",
  appId: "1:648756107215:web:c8f135ceecb6d8443f64ba",
  measurementId: "G-4WBGN554DS"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Reference to the storage service
const storage = firebase.storage();

// Reference to the folder where your images are stored
const imageswal = storage.ref().child('TopWallpaper');
const imagesdown = storage.ref().child('downloads');
const wishlist = storage.ref().child('wishlist/Ajay');
let imagesRef;
localStorage.setItem('lastClickedValue', "on");
// Get the current URL
const currentUrl = window.location.href;
if (currentUrl.includes('bookmarks.html')) {
  imagesRef = wishlist;
} else if (currentUrl.includes('index.html')) {
  // User is on index.html
  imagesRef = imageswal;
} else {
  // User is on a different page
  imagesRef = imagesdown;
}

// Get download URLs for all images in the folder
imagesRef.listAll().then((result) => {
  result.items.forEach((imageRef) => {
    // Create a placeholder loading image
    const loadingImg = document.createElement('img');
    loadingImg.className = 'topimg';
    loadingImg.alt=imageRef.name;
    loadingImg.src = './Images/load2.gif'; // Set the loading image source

    // Append the loading image to the top container
    const link = document.createElement('a');
    link.href = "image.html"; // Set the href attribute of the link
    link.appendChild(loadingImg); // Append the loading image to the link
    document.querySelector('.top-container').appendChild(link);

    // Get the download URL for each image
    imageRef.getDownloadURL().then((url) => {
      // Create an image element and set its source to the URL
      const img = document.createElement('img');
      img.className = 'topimg';

      // Once the actual image is loaded, replace the loading image with it
      img.onload = function () {
        // Replace the loading image with the actual image
        link.removeChild(loadingImg); // Remove the loading image
        link.appendChild(img); // Append the actual image to the link
      };

      img.src = url; // Set the source of the actual image

      // Add click event listener to dynamically created images
      img.addEventListener('click', function () {
        // Store the clicked image URL in localStorage
        localStorage.setItem('clickedImageUrl', url);
      });
    }).catch((error) => {
      // Handle any errors
      console.error(error);
    });
  });
}).catch((error) => {
  // Handle any errors
  console.error(error);
});

var anchorTags = document.querySelectorAll('.fetchtag');
anchorTags.forEach(function(anchorTag) {
  anchorTag.addEventListener('click', function(event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();
    
    // Retrieve the inner HTML value of the clicked p tag
    var innerHTMLValue = this.querySelector('.fetch').textContent.trim();
    
    // Store the value in local storage
    localStorage.setItem('lastClickedValue', innerHTMLValue);
    window.location.href = "catdisplay.html";
  });
});




const dp = document.getElementById('dp');
const singupcancle = document.getElementById('singupcancle');
const singincancle = document.getElementById('singincancle');
const singup = document.getElementById('singup');
const singinlink = document.getElementById('singinlink');
const singuplink = document.getElementById('singuplink');
const accountcontainer = document.getElementById('accountcontainer');
const back = document.getElementById('back');
let displayname = document.getElementById('name');
let homename = document.getElementById('homename');
const displaydate = document.getElementById('date');
const currentDate = new Date();
// Options for formatting the date
const options = { 
  month: 'long', // Display the full name of the month
  day: 'numeric', // Display the day of the month
  year: 'numeric' // Display the year
};

// Format the date
const formattedDate = currentDate.toLocaleString('en-US', options);


singinlink.addEventListener('click', function(event) {
  singup.style.display = 'none';
  singin.style.display = 'flex';

});

singuplink.addEventListener('click', function(event) {
  singin.style.display = 'none';
  singup.style.display = 'flex';

});

back.addEventListener('click', function(event) {
  event1.style.display = 'none';
});

singupcancle.addEventListener('click', function(event) {
  singup.style.display = 'none'; 
});
singincancle.addEventListener('click', function(event) {
  singin.style.display = 'none'; 
});

const db = firebase.database(); // Initialize database directly from the Firebase app instance



// Retrieve the value of event1 from localStorage
let event1 = singup;
// Set event1 to 'accountcontainer' if it's not already set
if (localStorage.getItem('event1') === 'accountcontainer') {
  event1 = accountcontainer;
} 

dp.addEventListener('click', function(event) {
  event1.style.display = 'flex';
  // Update profile display elements
});


const singupbtn = document.getElementById('singupbtn');

singupbtn.addEventListener('click', function(e){
  e.preventDefault();

});





// Event listener for signing in
const singinbtn = document.getElementById('singinbtn');
singinbtn.addEventListener('click', function(e){
  e.preventDefault();
  
  const username = document.getElementById('loginusername').value;
  const password = document.getElementById('loginpassword').value;
  
  // Retrieve user details from Firebase
  db.ref('user/' + username).once('value').then((snapshot) => {
    const user = snapshot.val();
    
    if (user && user.password === password) {
      // Sign in successful
      singup.style.display = 'none';
      singin.style.display = 'none';
      
      // Update the value of event1 to 'accountcontainer' in localStorage
      localStorage.setItem('event1', 'accountcontainer');
      // Update localStorage with user details
      localStorage.setItem('storedUsername', user.username);
      localStorage.setItem('storedProfileImageURL', user.profileImageURL);
      localStorage.setItem('joineddate', user.joined);
      
      alertmsg(e, 'Signed in successfully');
      // Refresh the page
location.reload();

    } else {
      // Incorrect username or password
      alertmsg(e, 'Incorrect username or password');
    }
  }).catch((error) => {
    alertmsg(e, 'Error signing in');
  });
});

// Get the logout button element
const logoutButton = document.getElementById('logout');

// Add click event listener to the logout button
logoutButton.addEventListener('click', function() {
  // Remove all values from localStorage
  localStorage.clear();
  // Refresh the page
location.reload();
});



displayname.innerHTML = localStorage.getItem('storedUsername') || 'Animania';
dp.src = localStorage.getItem('storedProfileImageURL') || './Images/Dp.jpg';









// Function to display error message below the field
function displayError(fieldId, errorMessage) {
  var errorDiv = document.getElementById(fieldId);
  errorDiv.textContent = errorMessage;
  errorDiv.style.display = 'block';
}

// Function to clear error message for a specific field
function clearError(fieldId) {
  var errorDiv = document.getElementById(fieldId);
  errorDiv.textContent = '';
  errorDiv.style.display = 'none';
}

// Function to clear all error messages
function clearErrors() {
  var errorDivs = document.querySelectorAll('.error');
  errorDivs.forEach(function(errorDiv) {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  });
}

// Function to validate if a string contains consecutive spaces
function containsConsecutiveSpaces(str) {
  return /\s{2,}/.test(str);
}

singupbtn.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission
console.log('check');
  // Get form inputs
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();
  var fileInput = document.getElementById('fileInput').files[0];

  // Set flag to track validation errors
  var hasErrors = false;

  // Clear previous errors
  clearErrors();

  // Validate if any field is empty
  if (!username || !password || !fileInput) {
    displayError('formError', 'Please fill in all fields.');
    hasErrors = true;
  }

  // Validate username length
  if (username.length < 4) {
    displayError('usernameError', 'Username must be at least 4 characters long.');
    hasErrors = true;
  }

  // Validate consecutive spaces in username
  if (containsConsecutiveSpaces(username)) {
    displayError('usernameError', 'Username cannot contain consecutive spaces.');
    hasErrors = true;
  }

  // Validate password length and complexity
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  if (password.length < 8 || !passwordRegex.test(password)) {
    displayError('passwordError', 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
    hasErrors = true;
  }

  // Validate file upload
  if (!fileInput) {
    displayError('fileInputError', 'Please select a profile image.');
    hasErrors = true;
  }

  if (!hasErrors) {
    // Check username uniqueness
    db.ref('user/' + username).once('value')
      .then(function(querySnapshot) {
        if (!querySnapshot.empty) {
          displayError('usernameError', 'Username is already taken. Please choose a different username.');
        } else {
          // Submit the form if no errors
          document.getElementById('signupform').submit();
        }
      })
      .catch(function(error) {
        console.error('Error checking username uniqueness:', error);
      });
  }
});
