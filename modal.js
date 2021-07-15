function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.getElementById("close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


// close form
closeModalBtn.addEventListener("click", function () {
  modalbg.style.display = "none";
});



// create error messages

class errorMessage{
  constructor(id, message){
    this.id = id;
    this.message = message;
  }
}

let prenomError = new errorMessage("prenom", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");

let nomError = new errorMessage("nom", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");

let mailError = new errorMessage("mail", "Veuillez entrer une adresse mail valide.");

let birthError = new errorMessage("bday", "Vous devez entrer une date de naissance valide.");

let timesError = new errorMessage("times", "Veuillez entrer un chiffre entre 0 et 100.");

let townError = new errorMessage("town", "Veuillez sélectionner une ville.");

let conditionError = new errorMessage("conditions", "Veuillez accepter les conditions d'utilisation.");

let characterError = new errorMessage("", "Veuillez entrer des lettres uniquement");

// verify first name input

let regExpName = new RegExp('^[a-zA-ZÀ-Ÿà-ÿ]+([\s\'\.\-][a-zA-ZÀ-Ÿà-ÿ]+)?([\s\'\.\-][a-zA-ZÀ-Ÿà-ÿ]+)*$')

function validateCode(entry){
  return document.getElementById(entry);
}

let cond = false ;
let first= document.getElementById("first");
function checkFirstName(){
  
  if(first.value.length >= 2){
    validateCode("prenom").removeAttribute("data-error-visible", true);
    validateCode("prenom").removeAttribute("data-error", prenomError.message);
    cond = true ;
  }else{
    validateCode("prenom").setAttribute("data-error-visible", true);
    validateCode("prenom").setAttribute("data-error", prenomError.message);
    cond= false;
    return cond;
  }
  if (regExpName.test(first.value)){
    validateCode("prenom").removeAttribute("data-error-visible", true);
    validateCode("prenom").removeAttribute("data-error", characterError.message);
    cond = true ;
  }
  if(!regExpName.test(first.value)){
    validateCode("prenom").setAttribute("data-error-visible", true);
    validateCode("prenom").setAttribute("data-error", characterError.message);
    cond = false ;
    return cond;
    }
  return cond;
}

first.addEventListener("input",checkFirstName);

//verify last name input
let cond2 = false;
let last = document.getElementById("last");
function checkLastName(){   
  if(last.value.length >= 2){
    validateCode("nom").removeAttribute("data-error-visible", true);
    validateCode("nom").removeAttribute("data-error", nomError.message);
    cond2= true;
  }else{
    validateCode("nom").setAttribute("data-error-visible", true);
    validateCode("nom").setAttribute("data-error", nomError.message);
    cond2= false;
    return cond2;
  }
  if (regExpName.test(last.value)){
    validateCode("nom").removeAttribute("data-error-visible", true);
    validateCode("nom").removeAttribute("data-error", characterError.message);
    cond2= true;
  }else{
    validateCode("nom").setAttribute("data-error-visible", true);
    validateCode("nom").setAttribute("data-error", characterError.message);
    cond2= false;
    return cond2;
  };
  return cond2;  
}

last.addEventListener("input",checkLastName);

// verify email input

let regExpMail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let email= document.getElementById("email")
function checkEmail(){
  if (regExpMail.test(email.value)){
    validateCode("mail").removeAttribute("data-error-visible", true);
    validateCode("mail").removeAttribute("data-error", mailError.message);
    return true;
  }else{
    validateCode("mail").setAttribute("data-error-visible", true);
    validateCode("mail").setAttribute("data-error", mailError.message);
    return false;
  };
}

email.addEventListener("input",checkEmail);

//verify date input

let birthdate = document.getElementById("birthdate");
function checkDate() {
  let date = new Date(birthdate.value).getTime();
  let year = birthdate.value.substring(0, 2);
  if(parseInt(year) < 19 || isNaN(date) || Date.now() < date){
    validateCode("bday").setAttribute("data-error-visible", true);
    validateCode("bday").setAttribute("data-error", birthError.message);
    return false;
  }else{
    validateCode("bday").removeAttribute("data-error-visible", true);
    validateCode("bday").removeAttribute("data-error", birthError.message);
    return true;
  }
};

birthdate.addEventListener("change", checkDate);

// verify quantity

let regExpQuantity = new RegExp('^[0-9]+$');
let quantity = document.getElementById("quantity")

function checkQuantity(){
    if (regExpQuantity.test(quantity.value) && quantity.value < 101){
      validateCode("times").removeAttribute("data-error-visible", true);
      validateCode("times").removeAttribute("data-error", timesError.message);
      return true;
    }else{
      validateCode("times").setAttribute("data-error-visible", true);
      validateCode("times").setAttribute("data-error", timesError.message);
      return false;
      };
}
quantity.addEventListener("input",checkQuantity);

//verify city checked
let city = document.querySelectorAll("input[type=radio]");

function checkTown() {
  for (let i = 0; i < city.length; i++) {
    if (city[i].checked) {
      validateCode("town").removeAttribute("data-error-visible", true);
      validateCode("town").removeAttribute("data-error", birthError.message);
      return true;
    }
  }  
  validateCode("town").setAttribute("data-error-visible", true);
  validateCode("town").setAttribute("data-error", townError.message);
  return false;
}

document.getElementById("town").addEventListener("change", checkTown);




//verify conditions checked

function isConditionsOk() {
  const checkbox = document.getElementById("checkbox1");
  if (checkbox.checked) { validateCode("conditions").removeAttribute("data-error-visible", true);
      validateCode("conditions").removeAttribute("data-error", conditionError.message);
    return true;
  } else {
    validateCode("conditions").setAttribute("data-error-visible", true);
      validateCode("conditions").setAttribute("data-error", conditionError.message);
    return false;
  }
}

document.getElementById("checkbox1").addEventListener("change",isConditionsOk);

//validate form
const formBody = document.getElementsByName("reserve");

function sayThanks(){
  formBody[0].style.display = "none";
  const modalBody = document.getElementsByClassName("modal-body");
  const confirmMessage = document.createElement("div");
  const confirmButton = document.createElement("div");
  modalBody[0].appendChild(confirmMessage);
  modalBody[0].appendChild(confirmButton);
  confirmMessage.setAttribute("class", "content");
  confirmMessage.innerHTML = "Merci !<br>Nous avons reçu votre réservation.";
  confirmButton.className = "btn-confirm";
  confirmButton.innerHTML = "Fermer";
  confirmButton.addEventListener("click", function(){
    validate();
  });
}
//send form
function validate(){
  document.getElementById("form").submit();
  return true;
}

// check all input

const submitButton = document.querySelector(".btn-submit");

submitButton.addEventListener("click", function(e){
  e.preventDefault();
  console.log("click")
  console.log(checkFirstName())
  console.log(checkLastName())
  console.log(checkEmail())
  console.log(checkDate())
  console.log(checkQuantity())
  console.log(checkTown())
  console.log(isConditionsOk())
  if(checkFirstName()
  &  checkLastName() 
  & checkEmail() 
  & checkDate() 
  & checkQuantity() 
  & checkTown()
  & isConditionsOk()
  ){
    console.log("click 2")
    sayThanks();
  }

})

// function checkValidation(id, regex, mistake, entry, expression, mistake2 ){
//   function validateCode(entry){
//   return document.getElementById(entry);
// };
//   document.getElementById(id).addEventListener("input", function(e){
//     if(regex.test(e.target.value)){
//       validateCode(entry).removeAttribute("data-error-visible", true);
//       validateCode(entry).removeAttribute("data-error", mistake.message);
//     }else{
//       validateCode(entry).setAttribute("data-error-visible", true);
//       validateCode(entry).setAttribute("data-error", mistake.message);
//       return false;
//     }
//     if(expression){
//       validateCode(entry).removeAttribute("data-error-visible", true);
//       validateCode(entry).removeAttribute("data-error", mistake2.message);
//     }else{
//       validateCode(entry).setAttribute("data-error-visible", true);
//       validateCode(entry).setAttribute("data-error", mistake2.message);
//       return false;
//     }
//   }
//     )
// }