const BASE_URL =
"http://localhost:8080/api/proposals";

const POLICY_URL =
"http://localhost:8080/api/policies";

const token =
localStorage.getItem(
"token"
);

const proposalForm =
document.getElementById(
"proposalForm"
);

const policySelect =
document.getElementById(
"policyId"
);

/* LOAD POLICIES */

async function loadPolicies(){

try{

const response =
await fetch(
POLICY_URL,
{
headers:{
"Authorization":
`Bearer ${token}`
}
}
);

const policies =
await response.json();

policySelect.innerHTML =
`
<option value="">
Select Policy
</option>
`;

policies.forEach(
(policy)=>{

policySelect.innerHTML += `

<option
value="${policy.id}">

${policy.policyName}

</option>

`;

});

}catch(error){

console.log(error);

}

}

loadPolicies();

/* SUBMIT */

proposalForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const data = {

vehicleType:
document.getElementById(
"vehicleType"
).value,

vehicleNumber:
document.getElementById(
"vehicleNumber"
).value,

modelName:
document.getElementById(
"modelName"
).value,

vehicleAge:
document.getElementById(
"vehicleAge"
).value,

selectedAddons:
document.getElementById(
"selectedAddons"
).value,

status:
document.getElementById(
"status"
).value,

policy:{
id:
document.getElementById(
"policyId"
).value
}

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

body:
JSON.stringify(data)

}
);

if(!response.ok){

throw new Error(
"Proposal Failed"
);

}

alert(
"Proposal Submitted!"
);

proposalForm.reset();

}catch(error){

alert(
error.message
);

}

});