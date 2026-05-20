const BASE_URL =
"http://localhost:8080/api/users";

const token =
localStorage.getItem(
"token"
);

const userId =
localStorage.getItem(
"userId"
);

/* SECURITY */

if(!token){

window.location.href =
"login.html";

}

/* LOAD PROFILE */

async function loadProfile(){

try{

const response =
await fetch(
`${BASE_URL}/${userId}`,
{
headers:{
"Authorization":
`Bearer ${token}`
}
}
);

if(!response.ok){

throw new Error(
"Failed to load profile"
);

}

const user =
await response.json();

document.getElementById(
"name"
).value =
user.name || "";

document.getElementById(
"email"
).value =
user.email || "";

document.getElementById(
"dob"
).value =
user.dob || "";

document.getElementById(
"age"
).value =
user.age || "";

document.getElementById(
"aadhaar"
).value =
user.aadhaar || "";

document.getElementById(
"pan"
).value =
user.pan || "";

document.getElementById(
"address"
).value =
user.address || "";

document.getElementById(
"role"
).value =
user.role || "";

}catch(error){

console.log(error);

}

}

loadProfile();

/* UPDATE PROFILE */

document
.getElementById(
"profileForm"
)
.addEventListener(
"submit",
async function(e){

e.preventDefault();

const data = {

name:
document.getElementById(
"name"
).value,

email:
document.getElementById(
"email"
).value,

dob:
document.getElementById(
"dob"
).value,

age:
document.getElementById(
"age"
).value,

aadhaar:
document.getElementById(
"aadhaar"
).value,

pan:
document.getElementById(
"pan"
).value,

address:
document.getElementById(
"address"
).value,

role:
document.getElementById(
"role"
).value

};

try{

const response =
await fetch(
`${BASE_URL}/${userId}`,
{
method:"PUT",

headers:{
"Content-Type":
"application/json",

"Authorization":
`Bearer ${token}`
},

body:
JSON.stringify(data)

}
);

if(!response.ok){

throw new Error(
"Update Failed"
);

}

alert(
"Profile Updated!"
);

}catch(error){

alert(
error.message
);

}

});