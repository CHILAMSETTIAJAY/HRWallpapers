document.addEventListener('DOMContentLoaded', function () {
  // Get the image URL from localStorage
  const imageUrl = localStorage.getItem('clickedImageUrl');
  
  // Check if image URL exists
  if (imageUrl) {
      // Set the image source
      document.getElementById('image-display').setAttribute('src', imageUrl);
  }
});

// Get the download link element
const downloadLink = document.getElementById('download-link');

// Add click event listener to the download link
downloadLink.addEventListener('click', function(event) {
  const imageSrc = document.getElementById('image-display').src;
  downloadLink.setAttribute('href', imageSrc);
});

const firebaseConfig = {
  apiKey: "AIzaSyAnyYghvHYwHY2Rbi5F1d6DuxVcnnAHEzI",
  authDomain: "hrwallpapers04.firebaseapp.com",
  projectId: "hrwallpapers04",
  storageBucket: "hrwallpapers04.appspot.com",
  messagingSenderId: "648756107215",
  appId: "1:648756107215:web:c8f135ceecb6d8443f64ba",
  measurementId: "G-4WBGN554DS"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the bookmark icon
const bookmarkIcon = document.getElementById('bookmarkpic');

bookmarkIcon.addEventListener('click', function(e) {
  e.preventDefault();

  // Get the image source
  const imageURL = document.getElementById('image-display').src;

  // Get the user's name (you can replace this with your actual user name retrieval logic)
  const username = "Ajay";

  // Create a storage reference for the image
  const storageRef = firebase.storage().ref(`wishlist/${username}/` + imageURL.substring(imageURL.lastIndexOf('/') + 1));

  // Fetch the image as a blob
  fetch(imageURL)
      .then(response => response.blob())
      .then(blob => {
          // Upload the image file to Firebase Storage
          return storageRef.put(blob);
      })
      .then((snapshot) => {
          console.log('Image uploaded successfully');
          // Handle success
      })
      .catch((error) => {
          console.error('Error uploading image:', error);
          // Handle error
      });
});
