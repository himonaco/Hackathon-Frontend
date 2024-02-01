const containerBody = document.querySelector(".container_bookings-trips-content");
fetch('http://localhost:3000/cart')
.then((repsonse) => response.json())
.then((data) => {
    containerBody.innerHTML = '';

})