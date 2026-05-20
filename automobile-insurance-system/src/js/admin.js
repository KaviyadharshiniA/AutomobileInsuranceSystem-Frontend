const BASE_URL =
"http://localhost:8080/api/users";

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

const userTable =
document.getElementById(
"userTable"
);

/* LOAD USERS */

async function loadUsers(){

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

const users =
await response.json();

userTable.innerHTML =
"";

users.forEach(
(user)=>{

userTable.innerHTML += `

<tr>

<td>
${user.id}
</td>

<td>
${user.name}
</td>

<td>
${user.email}
</td>

<td>
${user.role}
</td>

<td>
${user.age}
</td>

<td>

<button
class="delete-btn"
onclick="
deleteUser(
${user.id}
)
">

Delete

</button>

</td>

</tr>

`;

});

}catch(error){

console.log(error);

}

}

/* DELETE */

async function deleteUser(
id
){

if(
!confirm(
"Delete User?"
)
)return;

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

loadUsers();

}

loadUsers();