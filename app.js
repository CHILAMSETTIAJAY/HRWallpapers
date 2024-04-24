// Function to reload the page
function reloadPage(event) {
  event.preventDefault(); // Prevent the default behavior (page reload)
  // Add any custom logic here if needed
}

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




function displayError(fieldId, errorMessage) {
  var errorDiv = document.getElementById(fieldId);
  errorDiv.textContent = errorMessage;
  errorDiv.style.display = 'block';
  setTimeout(function() {
    if(errorDiv != null){
      errorDiv.style.display.style.display = "none";
    }
  }, 3000);
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

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

usernameInput.addEventListener('input', function() {
  const username = usernameInput.value;
  if (username.length >= 4) {
    clearError('usernameError');
  }
});

// Event listener for password input
passwordInput.addEventListener('input', function() {
  const password = passwordInput.value;
  if (password.length >= 8 && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)) {
    clearError('passwordError');
  }
});

// Function to check if username already exists in storage
async function checkUsernameExists(username) {
  const snapshot = await db.ref('user/' + username).once('value');
  return snapshot.exists();
}

function changeToSVG(btn) {
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" class="loadersvg"  style="fill: rgb(255, 255, 255);transform: ;msFilter:;"><circle cx="12" cy="20" r="2"></circle><circle cx="12" cy="4" r="2"></circle><circle cx="6.343" cy="17.657" r="2"></circle><circle cx="17.657" cy="6.343" r="2"></circle><circle cx="4" cy="12" r="2.001"></circle><circle cx="20" cy="12" r="2"></circle><circle cx="6.343" cy="6.344" r="2"></circle><circle cx="17.657" cy="17.658" r="2"></circle></svg>'; // Replace '...' with your SVG content
}

// Function to revert the button's innerHTML back to the original text
function revertToText( btn , value) {
  btn.innerHTML = value;
}

const singupbtn = document.getElementById('singupbtn');

singupbtn.addEventListener('click', function(e){
  e.preventDefault();

  // Get user input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const profileImage = document.getElementById('fileInput').files[0]; // Get the selected image file

  if (username.length < 4) {
    displayError('usernameError', 'Username must be at least 4 characters long.');
    return;
  }
  checkUsernameExists(username).then((exists) => {
    if (exists) {
      displayError('usernameError', 'Username already in use. Please choose a different one.');
      return;
    }
  });
  if (profileImage == null) {
    displayError('fileInputError', 'Upload Image for profilr pic');
    return;
  }
  if (password.length < 8 || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)) {
    displayError('passwordError', 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
    return;
  }

  if (!/^\S*(?=\S{2})\S*$/.test(username)) {
    displayError('usernameError', 'Username cannot contain consecutive spaces.');
    return;
  }
  if (!/^\S*(?=\S{2})\S*$/.test(password)) {
    displayError('passwordError', 'Username cannot contain consecutive spaces.');
    return;
  }

  // Create a storage reference for the image
  const storageRef = firebase.storage().ref('profile_images/' + username + '_' + profileImage);

  // Upload the image file to Firebase Storage
  const uploadTask = storageRef.put(profileImage);
  const orginaltetx= singupbtn.innerHTML;
  displayError('singupmsg', 'Signigup please wait.....');

  changeToSVG(singupbtn);
  // Wait for the image upload to complete
  uploadTask.then((snapshot) => {
    // Get the download URL for the uploaded image
    return snapshot.ref.getDownloadURL();
  }).then((downloadURL) => {
    // Save user information and image URL to the database
    return db.ref('user/' + username).set({
      username: username,
      password: password,
      profileImageURL: downloadURL, // Save the image URL to the database
      joined:formattedDate
    }).then(() => {
      // Update UI after successful signup
      singup.style.display='none';
      singin.style.display='none';
      localStorage.setItem('event1', 'accountcontainer');

      localStorage.setItem('storedUsername',username);
      // Update the profile image tag with the profile image URL
       localStorage.setItem('storedProfileImageURL',downloadURL) ;
      localStorage.setItem('joineddate', formattedDate);
    displayError('singupmsg', 'Signed up successfully.');

location.reload();
    });
  }).catch((error) => {
    // Handle errors
    revertToText(singupbtn,orginaltetx);
    displayError('singupmsg', 'Error signing up.');
  });
});





// Event listener for signing in
const singinbtn = document.getElementById('singinbtn');
singinbtn.addEventListener('click', function(e){
  e.preventDefault();
  
  const username = document.getElementById('loginusername').value;
  const password = document.getElementById('loginpassword').value;
  const orginaltetx= singinbtn.innerHTML;

  changeToSVG(singinbtn);  
  displayError('singinmsg', 'Signingin please wait.....');
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
    displayError('singinmsg', 'Signed in successfully.');
      
location.reload();

    } else {
      // Incorrect username or password
      revertToText(singinbtn,orginaltetx);
      displayError('singinmsg', 'Incorrect username or password.');

    }
  }).catch((error) => {
    displayError('singinpmsg', 'Error signing in.');
  });
});

// Get the logout button element
const logoutButton = document.getElementById('logout');
logoutButton.innerHTML='Logout';
// Add click event listener to the logout button
logoutButton.addEventListener('click', function() {
  logoutButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" class="loadersvg"  style="fill: rgb(255, 255, 255);transform: ;msFilter:;"><circle cx="12" cy="20" r="2"></circle><circle cx="12" cy="4" r="2"></circle><circle cx="6.343" cy="17.657" r="2"></circle><circle cx="17.657" cy="6.343" r="2"></circle><circle cx="4" cy="12" r="2.001"></circle><circle cx="20" cy="12" r="2"></circle><circle cx="6.343" cy="6.344" r="2"></circle><circle cx="17.657" cy="17.658" r="2"></circle></svg>';
  // Remove all values from localStorage
  localStorage.clear();
  // Refresh the page
location.reload();
});



displayname.innerHTML = localStorage.getItem('storedUsername') || 'Animania';
dp.src = localStorage.getItem('storedProfileImageURL') || './Images/my4dp.png';

document.getElementById('Contact').addEventListener('click', function(event) {
  event.preventDefault();

  // Define the email address and subject
  const emailAddress = 'animania@example.com';
  const subject = 'Inquiry';

  // Construct the mailto URL
  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;

  // Open the user's default email client
  window.location.href = mailtoUrl;
});

const searchtext = document.getElementById('searchtext');

searchtext.addEventListener('keypress', function(event) {
  // Check if the Enter key was pressed (key code 13)
  if (event.key === 'Enter') {
    const searchTextValue = searchtext.value;
    localStorage.setItem('searchtext', searchTextValue); // Saving the search text in local storage

    if (searchTextValue.trim() !== '') {
      window.location.href = `search.html?search=${encodeURIComponent(searchTextValue)}`;
    }
  }
});