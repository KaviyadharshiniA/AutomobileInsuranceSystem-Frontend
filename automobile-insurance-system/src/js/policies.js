const BASE_URL =
"http://localhost:8080/api/policies";

const token =
localStorage.getItem(
"token"
);

const form =
document.getElementById(
"policyForm"
);

const policyCards =
document.getElementById(
"policyCards"
);

let editId = null;

/* GET ALL POLICIES */

async function getPolicies(){

try{

const response =
await fetch(
BASE_URL,
{
headers:{
"Authorization":
`Bearer ${token}`
}
}
);

const policies =
await response.json();

renderPolicies(
policies
);

}catch(error){

console.log(error);

}

}

/* DISPLAY */

function renderPolicies(
policies
){

if(!policyCards)
return;

policyCards.innerHTML =
"";

policies.forEach(
(policy)=>{

policyCards.innerHTML += `

<div class="policy-card">

<h2>
${policy.policyName}
</h2>

<h1>
₹${policy.premiumAmount}
</h1>

<p>
${policy.description}
</p>

<p>
<strong>
Package:
</strong>
${policy.packageType}
</p>

<p>
<strong>
Addons:
</strong>
${policy.addOns}
</p>

<div
style="
display:flex;
gap:10px;
margin-top:20px;
">

<button
class="edit-btn"
onclick="
editPolicy(
${policy.id},
'${policy.policyName}',
'${policy.description}',
'${policy.packageType}',
${policy.premiumAmount},
'${policy.addOns}'
)
">

Edit

</button>

<button
class="delete-btn"
onclick="
deletePolicy(
${policy.id}
)
">

Delete

</button>

</div>

</div>

`;

});

}

/* SAVE POLICY */

if(form){

form.addEventListener(
"submit",
async function(e){

e.preventDefault();

const data = {

policyName:
document.getElementById(
"policyName"
).value,

description:
document.getElementById(
"description"
).value,

packageType:
document.getElementById(
"packageType"
).value,

premiumAmount:
document.getElementById(
"premiumAmount"
).value,

addOns:
document.getElementById(
"addOns"
).value

};

try{

if(editId){

await fetch(
`${BASE_URL}/${editId}`,
{
method:"PUT",

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

alert(
"Policy Updated!"
);

editId = null;

}else{

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

alert(
"Policy Added!"
);

}

window.location.href =
"policies.html";

}catch(error){

alert(
"Error Saving Policy"
);

}

});

}

/* DELETE */

async function deletePolicy(
id
){

if(
!confirm(
"Delete Policy?"
)
) return;

await fetch(
`${BASE_URL}/${id}`,
{
method:"DELETE",

headers:{
"Authorization":
`Bearer ${token}`
}
}
);

getPolicies();

}

/* EDIT */

function editPolicy(
id,
name,
description,
packageType,
premiumAmount,
addOns
){

editId = id;

document.getElementById(
"policyName"
).value = name;

document.getElementById(
"description"
).value =
description;

document.getElementById(
"packageType"
).value =
packageType;

document.getElementById(
"premiumAmount"
).value =
premiumAmount;

document.getElementById(
"addOns"
).value =
addOns;

window.location.href =
"new-policy.html";

}

getPolicies();