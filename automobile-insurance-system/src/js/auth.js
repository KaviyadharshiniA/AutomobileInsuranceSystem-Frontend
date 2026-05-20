const BASE_URL =
"http://localhost:8080/api/auth";

/* LOGIN */

const loginForm =
document.getElementById(
"loginForm"
);

if(loginForm){

loginForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

try{

const response =
await fetch(
`${BASE_URL}/login`,
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

email,
password

})

});

if(!response.ok){

throw new Error(
"Invalid Credentials"
);

}

const data =
await response.json();

/* SAVE LOGIN DATA */

localStorage.setItem(
"token",
data.token
);

localStorage.setItem(
"userId",
data.id
);

localStorage.setItem(
"username",
data.username
);

localStorage.setItem(
"role",
data.role
);

localStorage.setItem(
"userEmail",
email
);

alert(
"Login Successful!"
);

/* ROLE BASED LOGIN */

if(
data.role === "ADMIN"
){

window.location.href =
"admin-dashboard.html";

}else{

window.location.href =
"user-dashboard.html";

}

}catch(error){

alert(
error.message
);

}

});

}


/* REGISTER */

const registerForm =
document.getElementById(
"registerForm"
);

if(registerForm){

registerForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const name =
document.getElementById(
"name"
).value;

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

const dob =
document.getElementById(
"dob"
).value;

const age =
document.getElementById(
"age"
).value;

const aadhaar =
document.getElementById(
"aadhaar"
).value;

const pan =
document.getElementById(
"pan"
).value;

const address =
document.getElementById(
"address"
).value;

const role =
document.getElementById(
"role"
).value;

try{

const response =
await fetch(
`${BASE_URL}/register`,
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

name,
email,
password,
dob,
age,
aadhaar,
pan,
address,
role

})

});

if(!response.ok){

throw new Error(
"Registration Failed"
);

}

const message =
await response.text();

alert(message);

window.location.href =
"login.html";

}catch(error){

alert(
error.message
);

}

});

}