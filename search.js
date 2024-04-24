

function loadImages() {
document.getElementById('featured-title').innerHTML = localStorage.getItem('searchtext');
    let searchtext =localStorage.getItem('searchtext').toLowerCase();

    if (!firebase.apps.length) {
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
        firebase.initializeApp(firebaseConfig);
    }


// Reference to the storage service
const storage = firebase.storage();

// Reference to the images folder
const imagesRef = storage.ref('AllWallpapers');

  // Get download URLs for all images in the folder
  imagesRef.listAll().then((result) => {
    result.items.forEach((imageRef) => {
        // Get the name of the image and convert it to lowercase
        const imageName = imageRef.name.toLowerCase();

        // Check if the image name contains the search text
        if (imageName.includes(searchtext)) {
            // Create a placeholder loading image
            const loadingImg = document.createElement('img');
            loadingImg.className = 'topimg';
            loadingImg.alt = searchtext;
            loadingImg.src = './Images/load2.gif'; // Set the loading image source

            // Append the loading image to the top container
            const link = document.createElement('a');
            link.href = "image.html"; // Set the href attribute of the link
            link.appendChild(loadingImg); // Append the loading image to the link
            document.querySelector('.top-container').appendChild(link);

            // Get the download URL for the image
            imageRef.getDownloadURL().then((url) => {
                // Create an image element and set its source to the URL
                const img = document.createElement('img');
                img.className = 'topimg';

                // Once the actual image is loaded, replace the loading image with it
                img.onload = function() {
                    // Replace the loading image with the actual image
                    link.removeChild(loadingImg); // Remove the loading image
                    link.appendChild(img); // Append the actual image to the link
                };

                img.src = url; // Set the source of the actual image

                // Add click event listener to dynamically created images
                img.addEventListener('click', function() {
                    // Store the clicked image URL in localStorage
                    localStorage.setItem('clickedImageUrl', url);
                });
            }).catch((error) => {
                // Handle any errors
                console.error(error);
            });
        }
    });
}).catch((error) => {
    // Handle any errors
    console.error(error);
});

}
// Load images based on the initial search text
loadImages();

const searchtext2 = document.getElementById('searchtext2');
searchtext2.addEventListener('keypress', function(event) {
  // Check if the Enter key was pressed (key code 13)
  if (event.key === 'Enter') {
    const searchTextValue = searchtext2.value;
    localStorage.setItem('searchtext', searchTextValue); // Saving the search text in local storage
    document.querySelector('.top-container').innerHTML = '';

// Load images based on the updated search text
loadImages();
  }
});

displayname.innerHTML = localStorage.getItem('storedUsername') || 'Animania';
dp.src = localStorage.getItem('storedProfileImageURL') || './Images/my4dp.png';