document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');

        const cardWidth = 200; // Largura do card
        const gap = 20; // Margem entre os cards
        const visibleCards = 3; // Número de cards visíveis
        const cards = Array.from(container.children); // Total de cards
        const totalCards = cards.length;
        const maxIndex = Math.max(totalCards - visibleCards, 0); // Garantir que o maxIndex não seja negativo

        container.style.width = `${(cardWidth + gap) * totalCards - gap}px`;

        let index = 0;

        function updateCarousel() {
            container.style.transform = `translateX(${-index * (cardWidth + gap)}px)`;
        }

        function goToNextCard() {
            if (index <= maxIndex) {
                index++;
            } else {
                index = 0;
            }
            updateCarousel();
        }

        function goToPrevCard() {
            if (index > 0) {
                index--;
            } else {
                index = maxIndex;
            }
            updateCarousel();
        }

        prevButton.addEventListener('click', goToPrevCard);
        nextButton.addEventListener('click', goToNextCard);

        updateCarousel();
    });
});