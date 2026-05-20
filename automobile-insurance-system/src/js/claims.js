const BASE_URL =
"http://localhost:8080/api/claims";

const token =
localStorage.getItem(
"token"
);

const claimForm =
document.getElementById(
"claimForm"
);

if(claimForm){

claimForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const data = {

claimReason:
document.getElementById(
"claimReason"
).value,

claimDescription:
document.getElementById(
"claimDescription"
).value,

claimStatus:
document.getElementById(
"claimStatus"
).value

};

try{

const response =
await fetch(
BASE_URL,
{
method:"POST",

headers:{
"Content-Type":
"application/json",

"Authorization":
`Bearer ${token}`
},

body:JSON.stringify(
data
)
}
);

if(!response.ok){

throw new Error(
"Claim Failed"
);

}

alert(
"Claim Submitted!"
);

claimForm.reset();

}catch(error){

alert(
error.message
);

}

});

}