document.addEventListener('DOMContentLoaded', () => {
    selectImages();
});

const imageGallery = document.getElementById('imageGallery');

function selectImages() {
    // Simulate fetching images from a server or other source
    const allImages = Array.from({ length: 400 }, (_, index) => `opmd1/Phi_comp_${index + 1}.jpg`);

    // Select 30 rows and 20 columns
    const selectedImages = shuffleArray(allImages).slice(0, 20 * 30);

    displayGallery(selectedImages);
}

function displayGallery(images) {
    imageGallery.innerHTML = ''; // Clear previous images

    images.forEach(imageSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.alt = 'Gallery Image';
        imageGallery.appendChild(imgElement);
    });
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
