const name = document.getElementById("name");
const password = document.getElementById("password");


async function login() {
    if(name.value && password.value){

        if(name.value.length > 50 || password.value.length > 50){
            alert("invalid input!! you have 50 chars max")
            return;
        }

        const respond = await fetch("/login", {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify({
                name: name.value,
                password: password.value
            })
        });

        const data = await respond.json();
        alert(data.msg);
        if(data.redirect){
            window.location.href = data.redirect;
        }
    }
    else{
        alert("Enter an input first!!")
        return;
    }
}

async function signin() {
    
    if(name.value && password.value){

        if(name.value.length > 50 || password.value.length > 50){
            alert("invalid input!! you have 50 chars max")
            return;
        }

        const respond = await fetch("/signin", {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify({
                name: name.value,
                password: password.value
            })
        });

        const data = await respond.json();
        alert(data.msg);
    }
    else{
        alert("Enter an input first!!")
        return;
    }
}

async function stayGuest(){
    const respond = await fetch("/stayGuest");
    const data = await respond.json();

    alert(data.msg);
    if(data.redirect){
        window.location.href = data.redirect;
    }
}