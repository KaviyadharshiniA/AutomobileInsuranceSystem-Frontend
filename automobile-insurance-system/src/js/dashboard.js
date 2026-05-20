const token =
localStorage.getItem("token");

const role =
localStorage.getItem("role");

const username =
localStorage.getItem("username");

if(!token){

window.location.href =
"login.html";

}

const usernameEl =
document.getElementById(
"username"
);

if(usernameEl){

usernameEl.innerText =
username || "User";

}

/* ROLE SECURITY */

if(
window.location.pathname
.includes(
"admin-dashboard"
)
&& role !== "ADMIN"
){

window.location.href =
"user-dashboard.html";

}

if(
window.location.pathname
.includes(
"user-dashboard"
)
&& role !== "USER"
){

window.location.href =
"admin-dashboard.html";

}

/* COUNTS */

async function loadCounts(){

try{

const headers = {

"Authorization":
`Bearer ${token}`

};

const [

policiesRes,
claimsRes,
paymentsRes,
proposalsRes,
usersRes

] = await Promise.all([

fetch(
"http://localhost:8080/api/policies",
{headers}
),

fetch(
"http://localhost:8080/api/claims",
{headers}
),

fetch(
"http://localhost:8080/api/payments",
{headers}
),

fetch(
"http://localhost:8080/api/proposals",
{headers}
),

fetch(
"http://localhost:8080/api/users",
{headers}
)

]);

const policies =
await policiesRes.json();

const claims =
await claimsRes.json();

const payments =
await paymentsRes.json();

const proposals =
await proposalsRes.json();

const users =
await usersRes.json();

/* USER DASHBOARD */

if(
document.getElementById(
"policyCount"
)
){

document.getElementById(
"policyCount"
).innerText =
policies.length;

}

const cards =
document.querySelectorAll(
".dash-card h1"
);

if(cards.length >= 4){

cards[1].innerText =
claims.length;

cards[2].innerText =
payments.length;

cards[3].innerText =
role === "ADMIN"
? users.length
: proposals.length;

}

}catch(error){

console.log(error);

}

}

loadCounts();

/* LOGOUT */

function logout(){

localStorage.clear();

window.location.href =
"login.html";

}