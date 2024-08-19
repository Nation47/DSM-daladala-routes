class DaladalaRoutes {
    static daladala (route){
        const alert = document.querySelector('.textAlert');
        const daladalaroute = document.querySelector('.route');

        daladalaroute.innerHTML = ''

        if(route.length === 0) {
            alert.innerText = 'No route found';
            setTimeout(() => alert.remove(), 3000);
        };
       
        route.forEach(route => { 
            const listRoutes = document.createElement('li');
            listRoutes.innerText = `Route: ${route.route} | Nauli: ${route.fare}`
            daladalaroute.appendChild(listRoutes);
        });
    };
};

const getRoutes = async () => {
    const cityRoutes = await fetch('daladala/dsmroutes.json');
    if(cityRoutes.status !== 200) {
        throw new Error('Failed fetch data');
    }
    const route = await cityRoutes.json();
    return route;
   
};

document.addEventListener('DOMContentLoaded',() => {
    const routeSearch = document.querySelector('#input-search');
    const inputSearch = document.querySelector('#input');
    const msg = document.querySelector('#msg');
    const suggestionBox = document.createElement('ul');
    suggestionBox.classList.add('suggestion-box');
    inputSearch.parentNode.appendChild(suggestionBox);

    // store fetched data
    let routesData = [];

    // Fetch routes from the JSON file when the page loads
    getRoutes()
    .then(route => {
        routesData = route;
        // DaladalaRoutes.daladala(route) 
    })
    .catch(err => console.log('rejected:', err.message))
  
    // search logic
    routeSearch.addEventListener('input',(e) => {
        e.preventDefault();
        const departure = inputSearch.value.trim().toLowerCase();

        // clear  previous suggestion
        suggestionBox.innerHTML = '';

        if(departure === '') {
            msg.innerText = 'Please Enter route!'
            setTimeout(() => msg.remove(), 3000);
            return;
        } else {
            const filteredRoutes = routesData.filter(route => 
                route.route.toLowerCase().includes(departure) || route.fare.toLowerCase().includes(departure)  
            );

            // suggestion 
            filteredRoutes.forEach( route => {
                const suggestionItem = document.createElement('li');
                suggestionItem.innerHTML = route.route;

                suggestionItem.addEventListener('click', () => {
                    // populate input field with the selected suggestion
                    inputSearch.value = route.route;

                    // clear input after populate suggestion
                    inputSearch.value = '';

                    // clear field after suggestion
                    suggestionBox.innerHTML = '';
                });
                suggestionBox.appendChild(suggestionItem);
            });

            // display filtered routes 
            DaladalaRoutes.daladala(filteredRoutes);
            // inputSearch.value = '';
           
        };

        inputSearch.addEventListener('blur', (e) => {
            e.preventDefault();
            setTimeout(() => {
                suggestionBox.innerHTML = '';
            }, 200);
        });
    });
});