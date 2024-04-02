// Variables
const formulario = document.querySelector('#formulario');
const inputEmail = document.querySelector('#email');
const inputSubmit = document.querySelector('#submit');

const card = document.querySelector('.margin');

const spinner = document.querySelector('#spinner');


const success = `
    <div class="success">
        <h2 class="success__heading">
        <span>
            <img class="success__img" src="build/img/icon-success.svg" alt="imagen success">
        </span>
        Thanks for subscribing!
        </h2>
        
        <p class="success__parrafo">A confirmation email has been sent to <span class="success__span">ash@loremcompany.com</span>. 
        Please open it and click the button inside to confirm your subscription.</p>

        <button class="success__parrafo success__parrafo--dismiss" id="dismiss">Dismiss message</button>
    </div> <!-- success -->
`


const email = {
    email: ''
}
// Event listeners
eventListeners();
function eventListeners() {
    inputEmail.addEventListener('input', validar);


    formulario.addEventListener('submit', enviarFormulario);

    
}

// Funciones

function enviarFormulario(e) {
    e.preventDefault();

    spinner.classList.add('mostrar-spinner');


    setTimeout(() => {
        spinner.classList.remove('mostrar-spinner');

        const exito = document.createElement('P');
        exito.classList.add('mensaje-exito');
        exito.textContent = 'Message sent successfully'

        formulario.appendChild(exito);

        setTimeout(() => {
            exito.remove();

            resetearFornulario();

            card.innerHTML = success;

            setTimeout(() => {
                window.location.reload();
            
            }, 3000);
        }, 3000);

    }, 3000);


}

function validar(e) {
    if(e.target.value.trim() === '') {
        mostrarError(e.target.parentElement.children[0]);
        email[e.target.name] = '';
        comprobarEmail();
        return;
    }

    if(e.target.id === 'email' && !validarEmail(e.target.value)){
        mostrarError(e.target.parentElement.children[0]);
        email[e.target.name] = '';
        comprobarEmail();
        return;
    }

    limpiarAlerta(e.target.parentElement.children[0]);
    
    email[e.target.name] = e.target.value.trim().toLowerCase();

    comprobarEmail();
}

function mostrarError(target) {

    limpiarAlerta(target);

    const mensajeValid = document.createElement('label');

    mensajeValid.classList.add('form__label', 'form__label--error');
    mensajeValid.textContent = 'Valid Email Required';
    mensajeValid.setAttribute('for', 'email');

    target.appendChild(mensajeValid);

    inputEmail.classList.add('mostrar-error');

    // setTimeout(() => {
    //     mensajeValid.remove();

    //     inputEmail.classList.remove('mostrar-error');
    // }, 2000);
}

function limpiarAlerta(target) {
    const error = target.querySelector('.form__label--error');

    if(error) {
        error.remove();
    }
    inputEmail.classList.remove('mostrar-error');

}

function validarEmail(email){
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
}

function comprobarEmail() {
    if(Object.values(email).includes('')){
        inputSubmit.classList.add('opacity-50');
        inputSubmit.disabled = true;
        return;
    }
    inputSubmit.classList.remove('opacity-50');
    inputSubmit.disabled = false;
}

function resetearFornulario() {
    email.email = '';

    formulario.reset();
    comprobarEmail();
}




