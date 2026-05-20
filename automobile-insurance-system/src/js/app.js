/* eslint-disable no-unused-vars */
function paymentSuccess(){

    alert(
        "Payment Successful!"
    );

}

function claimSubmitted(){

    alert(
        "Claim Submitted Successfully!"
    );

}

function proposalSubmitted(){

    alert(
        "Proposal Submitted Successfully!"
    );

}
function selectPlan(planId){

const plans =
document.querySelectorAll(
".plan-card"
);

plans.forEach(plan=>{

plan.classList.remove(
"featured"
);

});

document
.getElementById(
`plan${planId}`
)
.classList.add(
"featured"
);

}