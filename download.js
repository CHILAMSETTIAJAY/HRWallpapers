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
downloadLink.setAttribute('href',imageSrc);
});
