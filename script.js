const rootSearch = document.querySelector('#root-search');
const searchButton = document.querySelector('#btnSearch');

searchButton.addEventListener('click', function () {

    const departure = document.querySelector('#departure').value;
    const arrival = document.querySelector('#arrival').value;
    const date = document.querySelector('#date').value;

    if (!departure || !arrival || !date) {
        document.querySelector('.empty').style.display = 'none';
        document.querySelector('#result-contain').innerHTML =
            `<img src="images/notfound.png" alt="notfound" id="notfound" />
              <hr />
              <p id="trip">No trip found.</p>`;
    } else {
        fetch('http://localhost:3000/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ departure, arrival, date })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.querySelector('#result-contain').innerHTML = '';
                if (data.trips) {
                    for (let i = 0; i < data.trips.length; i++) {
                        const hour = String(new Date(data.trips[i].date).getHours()).padStart(2, "0");
                        const minute = String(new Date(data.trips[i].date).getMinutes()).padStart(2, "0");

                        document.querySelector('#result-contain').innerHTML +=
                            `<div class='root-search_content'>
                            <p>${data.trips[i].departure} > ${data.trips[i].arrival}</p>
                            <p>${hour}:${minute}</p>
                            <p>${data.trips[i].price}€</p>
                            <button class= 'root-search_content-button' value=${data.trips[i]._id}>Book</button>
                            <div>`;
                    }
                }
            });
    }
});

const btnBook = document.querySelectorAll(".root-search_content-button");
btnBook.forEach(button => {
    button.addEventListener("click", function () {
        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tripId: this.id })
        })
            .then(response => response.json())
            .then(() => {
                data.result && window.location.assign('cart.html');
            });
    });
});