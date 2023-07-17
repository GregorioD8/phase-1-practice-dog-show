
let dogTable = document.querySelector('#table-body')
let form = document.querySelector('#dog-form')
//table construct
let editThisDogId 

function getDogs(){

    fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(data => renderDogs(data))
    
}

function renderDogs(dogData){
    dogTable.replaceChildren()
  
   for(const dog of dogData){

    let tr = document.createElement('tr')
    let tdName = document.createElement('td')
    let tdBreed = document.createElement('td')
    let tdSex = document.createElement('td')
    let tdEdit = document.createElement('td')
    let btn = document.createElement('button')

    btn.innerText = 'Edit Dog' 
    tdEdit.append(btn)
  
    tdName.innerText = dog.name
    tdBreed.innerText = dog.breed
    tdSex.innerText = dog.sex

    tr.appendChild(tdName)
    tr.appendChild(tdBreed)
    tr.appendChild(tdSex)
    tr.appendChild(tdEdit)

    dogTable.append(tr)

    btn.addEventListener('click', (e) =>  {
        console.log(e)
        form.name.value = dog.name
        form.breed.value = dog.breed
        form.sex.value = dog.sex
        
        editThisDogId = dog.id
   })

}
}

form.addEventListener('submit', handleEvents)

function handleEvents(e){
    console.log(e.target)
    const editedDog = {  

      
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value
    }

    editDog(editedDog)

}


function editDog(dogObj){
   dogId =  editThisDogId 

    fetch(`http://localhost:3000/dogs/${dogId}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(dogObj),
  
    })

    .then(res => res.json())
    .then(data => console.log(data))
    getDogs()
    form.reset()

}   

function initialize(){
    getDogs()
}

initialize()