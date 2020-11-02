window.addEventListener('DOMContentLoaded', function () {
     function handleInput(e) {
          const passVal = document.getElementById('password').value;
          const passConfirmVal = document.getElementById('password_conf').value;
          const passwordMatch = document.getElementById('password_match');

          if (e.target.id === 'password_conf' || e.target.id === 'password') {
               if (passConfirmVal !== '' || passVal !== '') {
                    if (passConfirmVal !== passVal) {
                         passwordMatch.style.display = 'block';
                         document.getElementById('registerBtn').disabled = true;
                    } else {
                         passwordMatch.style.display = 'none';
                         document.getElementById('registerBtn').disabled = false;
                    }
               } else {
                    passwordMatch.style.display = 'none';
                    document.getElementById('registerBtn').disabled = false;
               }
          }
     }

     document.getElementById('password_conf').addEventListener('input', handleInput);
     document.getElementById('password').addEventListener('input', handleInput);
});
