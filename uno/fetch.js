// fetch data using async and await
const getTodos = async () => {
    const response = await fetch('todos/todos.json');
    if(response.status !== 200){
        throw new Error ('could not fetch data')
    }
    const data = await response.json();
    return data
};
getTodos()
    .then(data => {console.log('resolved:', data)})
    .catch(err => console.log('rejected:', err.message))



const pataMajibu = async () => {
    const majibu = await fetch('todos/hanan.json');
    if(majibu.status !== 200) {
        throw new Error('Majibu hayapatikani kwa sasa');
    };

    const jibu = await majibu.json();
    return jibu;
};
pataMajibu()
    .then(jibu => console.log('resolved:', jibu))
    .catch(err => console.log('rejected:', err))

// fetching
const getInfo = async () => {
    const information = await fetch('resources/data.json');
    if(information.status !== 200){
        throw new Error('Failed fetch data')
    };
    const info = await information.json();
    return info;
};
getInfo()
    .then(info => displayInfo(info))
    .catch(err => console.log('rejected:', err.message));


const displayInfo = (info) => {
    info.forEach(item => {
        const container = document.querySelector('.list-item');
        const list = document.createElement('li');
        list.innerText = `name: ${item.name} | age: ${item.age}`
    
        container.appendChild(list);
    });
};

