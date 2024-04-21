function showMessage(message) {
  // Create a message element
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.width = '90%';
  messageElement.style.textAlign = 'center';
  messageElement.style.position = 'fixed';
  messageElement.style.top = '50%';
  messageElement.style.left = '50%';
  messageElement.style.transform = 'translate(-50%, -50%)';
  messageElement.style.background = 'rgba(0, 0, 0, 0)';
  messageElement.style.color = 'white';
  messageElement.style.padding = '10px';
  messageElement.style.borderRadius = '10px';
  messageElement.style.zIndex = '9999';

  // Append the message element to the body
  document.body.appendChild(messageElement);

  // Remove the message after 3 seconds
  setTimeout(() => {
    document.body.removeChild(messageElement);
  }, 2000);
}

 const uplink = localStorage.getItem('clickedImageUrl') ;
  

document.addEventListener('DOMContentLoaded', function () {
  // Get the image URL from localStorage
  const imageUrl = uplink;
  
  // Check if image URL exists
  if (imageUrl) {
      // Set the image source
      document.getElementById('image-display').setAttribute('src', imageUrl);
  }
});

// Get the download link element
const downloadLink = document.getElementById('download-link');

downloadLink.addEventListener('click', e => {
  e.preventDefault();

  fetchFile(uplink);
});

function fetchFile(url) {
  fetch(url)
    .then(res => res.blob()) // fixed: res.blob() instead of blob()
    .then(blob => {
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(blob);
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'HrWallpapersimage.jpg'; // Set the filename for download
      // Trigger click on the link
      link.click();
      // Cleanup
      URL.revokeObjectURL(blobUrl);
      document.getElementById('image-display').style.opacity = '0.4';
      showMessage('Downloded');
    })
    .catch(error => console.error('Error fetching file:', error));
}

// Get a reference to the bookmark icon
const bookmarkIcon = document.getElementById('bookmarkpic');
const bookmarkRemove = document.getElementById('bookmarkremove');

document.addEventListener('DOMContentLoaded', function () {
  // Check if the fetchvalue is 'Bookmarks'
  const fetchvalue = localStorage.getItem('lastClickedValue');
  if (fetchvalue === 'Bookmarks') {
    // Disable the bookmark functionality
    const bookmarkIcon = document.getElementById('bookmarkpic');
    bookmarkIcon.style.display = 'none'; // Hide the bookmark icon
    bookmarkremove.style.display='flex'
  }
});

const displayname = localStorage.getItem('storedUsername');
if (displayname != null) {
  bookmarkIcon.style.display = 'flex';
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


bookmarkIcon.addEventListener('click', function(e) {
  e.preventDefault();

  // Get the image URL from localStorage
  const imageURL = localStorage.getItem('clickedImageUrl');

  if (!imageURL) {
    console.error('Image URL not found in localStorage');
    return;
  }

  // Get the user's name (you can replace this with your actual user name retrieval logic)
  const username = displayname;

  // Check if the image is already bookmarked
  const storageRef = firebase.storage().ref(`wishlist/${username}/` + imageURL.substring(imageURL.lastIndexOf('/') + 1));
  storageRef.getDownloadURL()
    .then(url => {
      // Image is already bookmarked
      document.getElementById('image-display').style.opacity = '0.4';
      showMessage('Already bookmarked');
    })
    .catch(error => {
      if (error.code === 'storage/object-not-found') {
        // Image is not bookmarked, proceed with bookmarking process
      document.getElementById('image-display').style.opacity = '0.4';
        // Fetch the image file
        fetch(imageURL)
          .then(response => response.blob())
          .then(blob => {
            // Create a storage reference for the image
            const storageRef = firebase.storage().ref(`wishlist/${username}/` + imageURL.substring(imageURL.lastIndexOf('/') + 1));
            // Upload the image file
            return storageRef.put(blob);
          })
          .then(snapshot => {
            // Display a "bookmarked" message
      document.getElementById('image-display').style.opacity = '0.4';
            showMessage('Bookmarked');
          })
          .catch(error => {
            showMessage('Error bookmarking image. Please try again later.');
          });
      } else {
        showMessage('Error checking bookmark status. Please try again later.');
      }
    });
});


bookmarkRemove.addEventListener('click', function() {
  // Get the URL of the bookmarked image from localStorage
  const imageURL = uplink;

  // Delete the bookmarked image from Firebase Storage
  const storageRef = firebase.storage().refFromURL(imageURL);
  storageRef.delete()
    .then(() => {
      // Image successfully deleted
      document.getElementById('image-display').style.opacity = '0.4';
      showMessage('Removed from bookmarks');
      window.location.href = 'catdisplay.html';
    })
    .catch((error) => {
      // An error occurred while deleting the image
      showMessage('Error deleting image. Please try again later.');
    });
});
