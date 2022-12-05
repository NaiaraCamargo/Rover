const socket = io();

let username = '';
let userpassword ='';

let loginPage = document.querySelector('#loginPage');
let loginNameInput = document.querySelector('#loginNameInput');
let loginPasswordInput = document.querySelector('#loginPasswordInput');


showPassword.addEventListener('click',(e) => {
  if (loginPasswordInput.type === "password") {
    loginPasswordInput.type = "text";
  }
  else {
    loginPasswordInput.type = "password";
  }
});


btnLogin.addEventListener('click', (e) =>{
  e.preventDefault();

  let name = loginNameInput.value.trim();
  let password = loginPasswordInput.value.trim()
      if(name === 'Naiara' && parseInt(password) === 1234 ) {
          username = name;
          userpassword = password;
          document.title = 'RoverControll ('+username+')';
          socket.emit('login-request', username);
      }
      else{
          //alert("Usuário ou senha inválido!");
          swal.fire({
            text: "Usuário ou senha inválidos!",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, entendi!",
        });
      } 
});


socket.on('user-ok', () => {

    window.location.href = "rover.html";
     
});







