const BASE_URL =
"http://localhost:8080/api/payments";

const token =
localStorage.getItem(
"token"
);

const paymentForm =
document.getElementById(
"paymentForm"
);

if(paymentForm){

paymentForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const data = {

amount:
document.getElementById(
"amount"
).value,

paymentMethod:
document.getElementById(
"paymentMethod"
).value,

paymentDate:
document.getElementById(
"paymentDate"
).value,

paymentStatus:
document.getElementById(
"paymentStatus"
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
"Payment Failed"
);

}

alert(
"Payment Successful!"
);

paymentForm.reset();

}catch(error){

alert(
error.message
);

}

});

}