const getTodos = (resource) => {
    const request = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        request.addEventListener('readystatechange', () => {
            // to use the data we do the following
            if(request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.responseText)
                resolve(data)
            } else if(request.readyState === 4) {
                reject('error getting resource')
            };
        });
    
        request.open('GET', resource);
        request.send();
    })

   
};

getTodos('todos/hanan.json').then(data => {
    console.log('promise 1 resolved:', data);
    return getTodos('todos/todos.json');
}).then(data => {
    console.log('promise 2 resolved:', data)
}).catch(err => {
    console.log('Promise rejected:', err)
});

