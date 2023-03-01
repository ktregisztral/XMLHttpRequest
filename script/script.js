const url = "https://jsonplaceholder.typicode.com/posts";
const state = {
    post:[]
};
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    console.log("Státusz: ", xhr.status);
    console.log("Státusz szöveg: ", xhr.statusText);
    console.log("State: ", xhr.readyState);
    if(xhr.readyState==4){
        if(xhr.status==200) console.log("Minden rendben van.");
        else {
            console.log("Baj van.");
            console.log(xhr.responseText);
        }
    } 
}
xhr.onload= function(){
    console.log("ONLOAD");
    if(xhr.status==200 && xhr.readyState==4){
        console.log("Minden rendben van. 2");
        //console.log(xhr.responseText);
        state.post = JSON.parse(xhr.responseText);
        //console.log(state.post);
        render();
    } else {
        console.log("Baj van.");
        console.log(xhr.responseText);
    }
};
xhr.onerror = function(){
    console.log("Hiba a mátrixban!")
}
/* xhr.open();
xhr.send(); */
window.onload = loadDoc;

function loadDoc(){
    console.log("Adatok lekérése:");
    xhr.open("GET", url, true);
    xhr.send();
}

function render(){


    for (const key in state.post[0]){
        console.log(key);
    }
    
    let sor = document.createElement("div");
    sor.className = "row";
    sor.innerHTML = `
        <div class="col-1">Id</div>
        <div class="col-1">UserId</div>
        <div class="col-2">Title</div>
        <div class="col-6">Body</div>
    `;
    document.getElementById("data").appendChild(sor);

    state.post.forEach(element => {
        let sor = document.createElement("div");
        sor.className = "row";

        let id = document.createElement("div");
        id.className = "col-1";
        id.innerHTML = element.id;
        sor.appendChild(id);

        let userId = document.createElement("div");
        userId.className = "col-1";
        userId.innerHTML = element.userId;
        sor.appendChild(userId);

        let title = document.createElement("div");
        title.className = "col-2";
        title.innerHTML = element.title;
        sor.appendChild(title);

        let body = document.createElement("div");
        body.className = "col-6";
        body.innerHTML = element.body;
        sor.appendChild(body);

        let edit = document.createElement("div");
        edit.className = "col-1";
        
        let editButton = document.createElement("button");
        editButton.className = "btn btn-warning";
        editButton.innerHTML = "Szerkesztés";
        editButton.dataset.id=element.id;
        editButton.onclick=dataEdit;
        edit.appendChild(editButton);
        sor.appendChild(edit);

        let torles = document.createElement("div");
        torles.className = "col-1";
        
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger";
        deleteButton.innerHTML = "Törlés";
        deleteButton.dataset.id=element.id;
        deleteButton.onclick=dataDelete;
        torles.appendChild(deleteButton);
        sor.appendChild(torles);


        //id.innerHTML = element['id'];
        //vmi.innerHTML=element;
        
        document.getElementById("data").appendChild(sor);
    });

    
}
function dataEdit(){};
function dataDelete(){
    console.log(this.dataset.id);
};