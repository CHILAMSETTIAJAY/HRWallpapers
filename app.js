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
const wishlist = storage.ref().child('WISHLIST');
let imagesRef;
  
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
    var innerHTMLValue = this.querySelector('.featured-text').textContent.trim();
    
    // Store the value in local storage
    localStorage.setItem('lastClickedValue', innerHTMLValue);
    window.location.href = 'catdisplay.html';
  });
});


const searchbtn = document.getElementById('search-icon');
const searchbtn2= document.getElementById('search-icon-2');
const search = document.getElementById('search');
let isSearchVisible = false;

searchbtn.addEventListener('click', function(event) {
  search.style.display = 'block'; 
  searchbtn.style.display='none';
  searchbtn2.style.display='block';
  searchbtn2.style.borderRadius = '0px 50px 50px 0px';
  searchbtn2.style.transition = 'border-radius 0.3s ease';
  searchbtn2.style.padding='6px 10px';
  searchbtn2.style.width='30px';
});


searchbtn2.addEventListener('click', function(event) {
  search.style.display = 'none'; 
  searchbtn2.style.display='none';
  searchbtn.style.display='block';
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
let displaydate = document.getElementById('date');
const currentDate = new Date();

// Options for formatting the date
const options = { 
  month: 'long', // Display the full name of the month
  day: 'numeric', // Display the day of the month
  year: 'numeric' // Display the year
};

// Format the date
const formattedDate = currentDate.toLocaleString('en-US', options);


let event1 =singup;
singinlink.addEventListener('click', function(event) {
  singup.style.display = 'none';
  singin.style.display = 'flex';

});

singuplink.addEventListener('click', function(event) {
  singin.style.display = 'none';
  singup.style.display = 'flex';

});

dp.addEventListener('click', function(event) {
  event1.style.display = 'flex';
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

const singupbtn = document.getElementById('singupbtn');

singupbtn.addEventListener('click', function(e){
  e.preventDefault();

  // Get user input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const profileImage = document.getElementById('fileInput').files[0]; // Get the selected image file

  // Create a storage reference for the image
  const storageRef = firebase.storage().ref('profile_images/' + username + '_' + profileImage.name);

  // Upload the image file to Firebase Storage
  const uploadTask = storageRef.put(profileImage);

  // Wait for the image upload to complete
  uploadTask.then((snapshot) => {
    // Get the download URL for the uploaded image
    return snapshot.ref.getDownloadURL();
  }).then((downloadURL) => {
    // Save user information and image URL to the database
    return db.ref('user/' + username).set({
      username: username,
      password: password,
      profileImageURL: downloadURL // Save the image URL to the database
    }).then(() => {
      // Update UI after successful signup
      singup.style.display='none';
      singin.style.display='none';
      accountcontainer.style.display='flex';
      event1=accountcontainer;
      displayname.innerHTML= username;

      // Update the image tag with the profile image URL
      document.getElementById('profiledp').src = downloadURL;
      dp.src=downloadURL;

      displaydate.innerHTML= formattedDate;
      alertmsg(e,'Signed up successfully');
    });
  }).catch((error) => {
    // Handle errors
    alertmsg(e,'Error signing up: ' + error.message);
  });
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
    singup.style.display='none';
    singin.style.display='none';
    accountcontainer.style.display='flex';
    event1=accountcontainer;
    displayname.innerHTML= username || 'Username retrieving failed';
    displaydate.innerHTML= formattedDate;
    // Update the profile image tag with the profile image URL
    document.getElementById('profiledp').src = user.profileImageURL;
    dp.src=user.profileImageURL;
    alertmsg(e,'Signed in successfully');
  } else {
    // Incorrect username or password
    alertmsg(e,'Incorrect username or password');
  }
}).catch((error) => {
  alertmsg(e,'Error signing in');
});

});


const categories = document.getElementById('categories');
const home = document.getElementById('home');

categories.addEventListener('mouseover', function() {
  home.style.borderBottom = '3px solid rgba(255, 255, 255, 0)';
});

categories.addEventListener('mouseout', function() {
  home.style.borderBottom = ''; // Reset the border
});


