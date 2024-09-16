document.addEventListener('DOMContentLoaded', () => {
    let selectedComplementId = null;
    let selectedProteinId = null;

    function updateSelection(type, id) {
        document.querySelectorAll(`.card-container[data-type="${type}"] .card`).forEach(card => {
            card.classList.remove('selected');
        });

        const selectedCard = document.querySelector(`.card-container[data-type="${type}"] .card[data-id="${id}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        if (type === 'complement') {
            selectedComplementId = id;
        } else if (type === 'meat') {
            selectedProteinId = id;
        }
    }

    document.querySelectorAll('.card-container[data-type="complement"] .card').forEach(card => {
        card.addEventListener('click', () => {
            updateSelection('complement', card.getAttribute('data-id'));
        });
    });

    document.querySelectorAll('.card-container[data-type="meat"] .card').forEach(card => {
        card.addEventListener('click', () => {
            updateSelection('meat', card.getAttribute('data-id'));
        });
    });

    document.querySelector('.btn.success').addEventListener('click', (event) => {
        event.preventDefault();

        if (selectedComplementId !== null && selectedProteinId !== null) {
            const order = {
                complementId: selectedComplementId,
                proteinId: selectedProteinId
            };

            fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(response => response.json())
                .then(data => {
                    const orderId = data.id;
                    window.location.href = `success/success.html?id=${orderId}`;
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        } else {
            alert('Please select complement and protein.');
        }
    });
});

document.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    document.querySelector('.hero').style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});