document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.product');
    
    images.forEach((img, index) => {
        if (index !== 0) {
            img.style.display = 'none';
        }
    });

    let currentImageIndex = 0;

    function showNextImage() {
        images[currentImageIndex].style.transition = 'opacity 0.5s';
        images[currentImageIndex].style.opacity = 0;

        currentImageIndex = (currentImageIndex + 1) % images.length;

        images[currentImageIndex].style.display = 'flex';
        setTimeout(() => {
            images[currentImageIndex].style.opacity = 1;
        }, 10);
    }

    setInterval(showNextImage, 4000);
});
