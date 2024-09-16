document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('id');

    if (orderId) {
        fetch(`https://nameless-everglades-59789-2a65a3646f45.herokuapp.com/orders/${orderId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Order not found');
                }
                return response.json();
            })
            .then(orderData => {
                const { complementId, proteinId } = orderData;

                Promise.all([
                    fetch(`https://nameless-everglades-59789-2a65a3646f45.herokuapp.com/complement/${complementId}`).then(response => response.json()),
                    fetch(`https://nameless-everglades-59789-2a65a3646f45.herokuapp.com/proteins/${proteinId}`).then(response => response.json())
                ])
                    .then(([complementData, proteinData]) => {
                        const orderDetails = document.getElementById('order-details');
                        orderDetails.innerHTML = `
                        <p><strong>Order Number </strong> ${orderId}</p>
                        <p><strong>Ingredients </strong> ${complementData.name} with ${proteinData.name}</p>
                    `;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        document.getElementById('order-details').innerHTML = '<p>Error loading order details.</p>';
                    });
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('order-details').innerHTML = '<p>Order not found.</p>';
            });
    } else {
        document.getElementById('order-details').innerHTML = '<p>No order ID provided.</p>';
    }
});