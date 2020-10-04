
    const monstersURL = `http://localhost:3000/monsters/`
    const container = document.getElementById('monster-container');
    const divForm = document.getElementById('create-monster');
    
    let page = 1
    
 //API 
    function getAllMonsters() {
        container.innerHTML = "";
        fetch(`${monstersURL}?_limit=100&_page=${page}`)
        .then(resp => resp.json())
        .then(data => renderAllMonsters(data))
        .catch(error => console.log(error))
    }


    function createMonsterDiv(monster) {
        const div = document.createElement('div');
        div.id = monster.id;
        div.innerHTML = `<h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}.</p>`;
        return div
    }
    
    function renderMonster(monster) {
        const div = createMonsterDiv(monster);
        container.append(div);
    }
    
    function renderAllMonsters(monstersArray) {
        monstersArray.forEach(monster => renderMonster(monster));
    }
    
    function  newMonsterCreator (newMonster)  {
        const container = document.getElementById('monster-container');
        const div = createMonsterDiv(newMonster);
        const child = document.getElementById('1');
        container.insertBefore(div, child);
    }

    // FORM TO ADD MONSTERS
    function createMonsterForm() {
        const form = document.createElement('form');
        form.id = "monster-form";
        form.innerHTML = `<input id="name" placeholder="Insert Name here">
        <input id="age" placeholder="Insert Age here">
        <input id="description" placeholder="Insert description here">`
        const button = document.createElement('button');
        button.innerText = "Create";
        form.append(button);
        form.addEventListener('submit', event => createNewMonster(event))
    
        divForm.append(form)
    }
    
    // POST NEW DATA OF NEW MONSTER
    function createNewMonster(event) {
        event.preventDefault();
        let object = {
        name: event.target[0].value,
        age: event.target[1].value,
        description: event.target[2].value
        };
        
        let configObject = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(object)
        };
        
        fetch(monstersURL, configObject)
        .then(resp => resp.json())
        .then(newMonsterCreator)
        .catch(error => console.log(error));
    }

    function goBack() {
        if (page > 1) {
            page -= 1
            getAllMonsters()
        }
    }

    function goForwards() {
        page += 1
        getAllMonsters()
    }


    getAllMonsters();
    createMonsterForm();

    document.querySelector('#back').addEventListener("click", goBack)
    document.querySelector('#forward').addEventListener("click", goForwards)