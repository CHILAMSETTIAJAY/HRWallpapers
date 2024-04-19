
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

// Get a reference to the bookmark icon
const bookmarkIcon = document.getElementById('bookmarkpic');

const displayname = localStorage.getItem('storedUsername');
console.log(displayname);
if(displayname != null){
  bookmarkIcon.style.display='flex';
}

bookmarkIcon.addEventListener('click', function(e) {
  e.preventDefault();

  // Get the image source
  const imageURL = document.getElementById('image-display').src;

  // Get the user's name (you can replace this with your actual user name retrieval logic)
  const username = "Ajay";

  // Create a storage reference for the image
  const storageRef = firebase.storage().ref(`wishlist/${username}/` + imageURL.substring(imageURL.lastIndexOf('/') + 1));
  const uploadTask = storageRef.put(imageURL);
});
