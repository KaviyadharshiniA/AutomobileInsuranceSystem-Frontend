const QUOTE_URL =
"http://localhost:8080/api/quotes";

const PROPOSAL_URL =
"http://localhost:8080/api/proposals";

const token =
localStorage.getItem(
"token"
);

const quoteForm =
document.getElementById(
"quoteForm"
);

const proposalSelect =
document.getElementById(
"proposalId"
);

const quoteTable =
document.getElementById(
"quoteTable"
);

/* LOAD PROPOSALS */

async function
loadProposals(){

try{

const response =
await fetch(
PROPOSAL_URL,
{
headers:{
"Authorization":
`Bearer ${token}`
}
}
);

const proposals =
await response.json();

proposalSelect.innerHTML =
`
<option value="">
Select Proposal
</option>
`;

proposals.forEach(
(proposal)=>{

proposalSelect.innerHTML += `

<option
value="${proposal.id}">

Proposal
#${proposal.id}

</option>

`;

});

}catch(error){

console.log(error);

}

}

/* LOAD QUOTES */

async function
loadQuotes(){

try{

const response =
await fetch(
QUOTE_URL,
{
headers:{
"Authorization":
`Bearer ${token}`
}
}
);

const quotes =
await response.json();

quoteTable.innerHTML =
"";

quotes.forEach(
(quote)=>{

quoteTable.innerHTML += `

<tr>

<td>
${quote.id}
</td>

<td>
₹${quote.quoteAmount}
</td>

<td>
${quote.generatedDate}
</td>

<td>
${quote.proposal?.id}
</td>

<td>

<button
class="delete-btn"
onclick="
deleteQuote(
${quote.id}
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

/* CREATE QUOTE */

quoteForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const data = {

quoteAmount:
document.getElementById(
"quoteAmount"
).value,

generatedDate:
document.getElementById(
"generatedDate"
).value,

proposal:{
id:
document.getElementById(
"proposalId"
).value
}

};

try{

const response =
await fetch(
QUOTE_URL,
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
"Quote Generation Failed"
);

}

alert(
"Quote Generated!"
);

quoteForm.reset();

loadQuotes();

}catch(error){

alert(
error.message
);

}

});

/* DELETE */

async function
deleteQuote(id){

if(
!confirm(
"Delete Quote?"
)
)return;

await fetch(
`${QUOTE_URL}/${id}`,
{
method:"DELETE",

headers:{
"Authorization":
`Bearer ${token}`
}
}
);

loadQuotes();

}

loadProposals();
loadQuotes();