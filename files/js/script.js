let submitBtn = document.querySelector('#submitBtn');
const colours = ['#fd7f7f', '#adff8c', '#ffc379', '#71c1fd', '#f7ff78'];
var usedColours = [];
var total = 0;

// setting local storage
function setLocalStorage() {
    if (localStorage.getItem('subscriptionData')) {
        let showDiv = document.querySelector('#show');
        let arr = JSON.parse(localStorage.getItem('subscriptionData'));
        if(arr.length > 0){
            showDiv.innerHTML = "";
        }
        arr.forEach((subscription, id) => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('sub-box');
            var colour = colours[Math.floor(Math.random()*colours.length)];
            if(!usedColours.includes(colour)){
                usedColours.push(colour);
                colour = colours[Math.floor(Math.random()*colours.length)];
            }
            if(usedColours.length == colours.length){
                usedColours = [];
            }
            newDiv.style.background = colour;
            total += parseInt(subscription.cost);

            let htmlData = `
            <div>
                <p><b>${subscription.name}</b></p>
                <span class="renewal">${subscription.renewal}: $${subscription.cost}</span>
                <div class="change-buttons">
                    <button id="btnEdit" onClick='onEdit(${id})'><img src="./files/img/edit.png"></button>
                    <button id="btnDelete" onClick='onDelete(${id})'><img src="./files/img/delete.png"></button>
                </div>
            </div>
        `;
            newDiv.insertAdjacentHTML('afterbegin', htmlData);
            showDiv.insertAdjacentElement('afterbegin', newDiv)
        });
        setTotal();
    } else {
        let arr = [];
        let arrData = {
            name: "",
            cost: "",
            renewal: ""
        };
        arr.push(arrData);
        localStorage.setItem('subscriptionData', JSON.stringify(arr));
    }
}
setTimeout(() => {
    setLocalStorage();
}, 2);

function setTotal(){
    let totalDiv = document.querySelector('#total');
    let newDiv = document.createElement('div');
    totalDiv.innerHTML = "";
    let htmlData = `
        <p>Your total subscriptions cost $${total * 12} every year.</p>
    `;
    newDiv.insertAdjacentHTML('afterbegin', htmlData);
    totalDiv.insertAdjacentElement('afterbegin', newDiv)
}

// CRUD operation 
// on submit event default
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    // getting data from local storage 
    let arr = JSON.parse(localStorage.getItem('subscriptionData'));
    // getting input form input fields
    let name = document.querySelector("#name").value;
    let cost = document.querySelector("#cost").value;
    let renewal = document.querySelector("#renewal").value;

    // push it into arr
    if (name.length <= 0 && cost.length <= 0) {
        // alert("enter something")
        // replace with error
    } else if (name.length > 0 && cost.length > 0) {
        let arrData = {
            name: name,
            cost: cost,
            renewal: renewal
        };
        arr.push(arrData);
        localStorage.setItem('subscriptionData', JSON.stringify(arr));
        setLocalStorage();
    } else {
        // alert("enter something")
        // replace with error
    }
    // Reset the form
    document.getElementById('reset').click();
})

// deletebutton
function onDelete(id) {
    let arr = JSON.parse(localStorage.getItem('subscriptionData'));
    let deleteArr = [...arr];

    deleteArr.splice(id, 1);
    arr = [...deleteArr];
    localStorage.setItem('subscriptionData', JSON.stringify(arr));
    setLocalStorage();
}

// edit
function onEdit(id) {
    let arr = JSON.parse(localStorage.getItem('subscriptionData'));

    let name = document.querySelector("#name").value = arr[id].name;
    let cost = document.querySelector("#cost").value = arr[id].cost;
    let renewal = document.querySelector("#renewal").value = arr[id].renewal;
    submitBtn.setAttribute('disabled', true)

    let editBtn = document.createElement('button');
    editBtn.classList.add('saveBtn');
    let form = document.querySelector('#form');
    let btnEdit = document.querySelectorAll('#btnEdit');

    editBtn.innerHTML = "Save";
    btnEdit.forEach((element) => { element.setAttribute('disabled', true); })
    form.insertAdjacentElement('beforeend', editBtn)

    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let newname = document.querySelector("#name");
        let newcost = document.querySelector("#cost");
        let newrenewal = document.querySelector("#renewal");
        arr.splice(id, 1, { name: newname.value, cost: newcost.value, renewal: newrenewal.value })
        localStorage.setItem('subscriptionData', JSON.stringify(arr));
        setLocalStorage();
        newname.value = ""
        newcost.value = ""
        newrenewal.value = ""
        form.removeChild(form.lastElementChild);
        submitBtn.removeAttribute('disabled')
    })
}