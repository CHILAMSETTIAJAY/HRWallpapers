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


singinlink.addEventListener('click', function(event) {
  singup.style.display = 'none';
  singin.style.display = 'flex';

});

singuplink.addEventListener('click', function(event) {
  singin.style.display = 'none';
  singup.style.display = 'flex';

});

dp.addEventListener('click', function(event) {
  singup.style.display = 'flex'; 
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
  db.ref('user/' + document.getElementById('username').value).set({
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  }).then(() => {
    alert("signed up successfully");
  }).catch((error) => {
    console.error("Error signing up:", error);
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
