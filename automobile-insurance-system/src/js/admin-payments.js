const BASE_URL =
"http://localhost:8080/api/payments";

const token =
localStorage.getItem(
"token"
);

const role =
localStorage.getItem(
"role"
);

/* ADMIN SECURITY */

if(role !== "ADMIN"){

window.location.href =
"user-dashboard.html";

}

const paymentTable =
document.getElementById(
"paymentTable"
);

/* LOAD PAYMENTS */

async function
loadPayments(){

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

const payments =
await response.json();

paymentTable.innerHTML =
"";

payments.forEach(
(payment)=>{

paymentTable.innerHTML += `

<tr>

<td>
${payment.id}
</td>

<td>
₹${payment.amount}
</td>

<td>
${payment.paymentMethod}
</td>

<td>
${payment.paymentDate}
</td>

<td>

<span class="
status-badge
${payment.paymentStatus.toLowerCase()}
">

${payment.paymentStatus}

</span>

</td>

</tr>

`;

});

}catch(error){

console.log(error);

}

}

loadPayments();