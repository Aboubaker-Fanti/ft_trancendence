const wrappe = document.querySelector('.wrappe');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');



btnPopup.addEventListener('click', ()=>{
    wrappe.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=>{
    wrappe.classList.remove('active-popup');
});

registerlink.addEventListener('click', ()=>{
    wrappe.classList.add('active');
});

loginlink.addEventListener('click', ()=>{
    wrappe.classList.remove('active');
});


// here i will work to get input from user 


const signinform = document.getElementById('signinformm');
const form = document.getElementById('formm');
const signinemail = document.getElementById('signinemail');
const signinpassword = document.getElementById('signinpassword');
const email = document.getElementById('email');
const password = document.getElementById('password');
const username = document.getElementById('username');


signinform.addEventListener('submit', e => {
    e.preventDefault();

    validDataInput();
});

form.addEventListener('submit', e => {
    e.preventDefault();
    validDataInput1();
});

const isValidEmail = email => {
    const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(String(email).toLowerCase()));
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}


const validDataInput = () => {
    const emailValue = signinemail.value;
    const passwordValue = signinpassword.value;
    console.log(emailValue, "  " , passwordValue,  "  ====== thats all");

    if (emailValue === ''){
        setError(signinemail, "Email is required")
    } else if (!isValidEmail(emailValue)) {
        setError(signinemail, "Provide a Vallid email address");
    } else {
        setSuccess(signinemail);
    }


    if (passwordValue === '') {
        setError(signinpassword, "Password is required");
    } else if (passwordValue.length < 8){
        setError(signinpassword, "Password must be at least 8 characters");
    } else {
        setSuccess(signinpassword);
    }
}

const validDataInput1 = () => {
    const emailValue = email.value;
    const passwordValue = password.value;
    const usernameValue = username.value;
    console.log(emailValue, "  " , passwordValue,  "  ", usernameValue);
    if (emailValue === ''){
        setError(email, "Email is required")
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Provide a Vallid email address");
    } else {
        setSuccess(email);
    }


    if (passwordValue === '') {
        setError(password, "Password is required");
    } else if (passwordValue.length < 8){
        setError(password, "Password must be at least 8 characters");
    } else {
        setSuccess(password);
    }

    if (usernameValue === ''){
        setError(username, "UserName is required");
    } else{
        setSuccess(username);
    }
}



//home here ========== 


 
