const forgotLink = document.getElementById("forgot-password-link");
const forgotForm = document.querySelector(".forgot-password-form");
const textLogin = document.querySelector(".text-login");

forgotLink.addEventListener("click", () => {

if(forgotForm.style.display === "block"){
forgotForm.style.display = "none";
textLogin.style.display = "block";
}
else{
forgotForm.style.display = "block";
textLogin.style.display = "none";
}

});




const togglePassword = document.getElementById("togglePasswordIcon");
const password = document.getElementById("admin_password");

togglePassword.addEventListener("click", function(){

const type = password.getAttribute("type") === "password" ? "text" : "password";
password.setAttribute("type", type);

this.classList.toggle("bi-eye");
this.classList.toggle("bi-eye-slash");

});

