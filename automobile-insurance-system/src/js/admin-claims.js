const BASE_URL =
"http://localhost:8080/api/claims";

const token =
localStorage.getItem(
"token"
);

const role =
localStorage.getItem(
"role"
);

/* SECURITY */

if(role !== "ADMIN"){

window.location.href =
"user-dashboard.html";

}

const claimTable =
document.getElementById(
"claimTable"
);

/* LOAD CLAIMS */

async function loadClaims(){

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

const claims =
await response.json();

claimTable.innerHTML =
"";

claims.forEach(
(claim)=>{

claimTable.innerHTML += `

<tr>

<td>
${claim.id}
</td>

<td>
${claim.claimReason}
</td>

<td>
${claim.claimDescription}
</td>

<td>

<select
onchange="
updateClaimStatus(
${claim.id},
this.value
)
">

<option
value="PENDING"
${claim.claimStatus==="PENDING"
? "selected" : ""}>

PENDING

</option>

<option
value="APPROVED"
${claim.claimStatus==="APPROVED"
? "selected" : ""}>

APPROVED

</option>

<option
value="REJECTED"
${claim.claimStatus==="REJECTED"
? "selected" : ""}>

REJECTED

</option>

</select>

</td>

<td>

<button
class="edit-btn">

Updated

</button>

</td>

</tr>

`;

});

}catch(error){

console.log(error);

}

}

/* UPDATE STATUS */

async function
updateClaimStatus(
id,
status
){

try{

await fetch(
`${BASE_URL}/${id}/${status}`,
{
method:"PUT",

headers:{
"Authorization":
`Bearer ${token}`
}
}
);

alert(
"Claim Updated!"
);

loadClaims();

}catch(error){

alert(
"Update Failed"
);

}

}

loadClaims();