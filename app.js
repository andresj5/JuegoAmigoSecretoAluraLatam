// Código para el juego del amigo secreto, propuesto por Alura Latam para reforzar y aplicar conocimientos de JavaScript. En un futuro se planea añadir mas funcionalidades en la parte de fronted para que la página sea responsiva, entre otras cosas.

// Se crea una lista donde se guardaran los nombres que se van a sortear.
let amigos = [];

//Función para asignar texto a un elemento del HTML (vista en el curso)	
function asignarTextoElemento(elemento, texto) {
    document.getElementById(elemento).innerText = texto;
    return;
}

//función para borrar valores en la caja de texto que ya se agregaron
function limpiarCaja(){ 
    document.getElementById('amigo').value = '';
    return;
}

//Función para que al presionar enter se agregue el numero a la lista de amigos sin necesidad de hacer click en el boton "Añadir", esto para ahorrar tiempo cuando la lista es muy grande
document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo(); // Llama a la función cuando se presiona Enter
    }
});

//Funcion que nos permite agregar un amigo mediante la caja de texto, si no se escrbio nada envía una alerta
function agregarAmigo() {
    let nombre  = document.getElementById('amigo').value;
    console.log(nombre);
    if (nombre === '') {
        alert('Por favor, inserte un nombre');
        return;
    } else {
//Validamos que el nombre ingresado no se repita en la lista de amigos
        if (amigos.includes(nombre)) {
            alert('Ese nombre ya está en la lista.');
            return;
        }
//Si el nombre no se repite, lo añade a la lista de amigos y limpia la caja de texto
        amigos.push(nombre);
        limpiarCaja();
        actualizarLista();
    }
    return;
}

//Función para mostrar los nombres que agregamos a la lista amigo en el HTML
function actualizarLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    //Recorre la lista y genera un item para cada amigo en el HTML 
    for (let i = 0; i < amigos.length; i++) {
        let item = document.createElement('li');
        item.innerText = amigos[i];
        lista.appendChild(item);
    }
    return;
}


//Función que nos permite sortear un amigo de la lista y mostrarlo en el HTML
function sortearAmigo() {
    // Si la lista de amigos esta vacia, manda una alerta 
    if (amigos.length === 0) {
        let reiniciar = confirm("Ya no quedan amigos en la lista para sortear. ¿Quieres reiniciar el juego?");
        if (reiniciar) {
            reiniciarJuego();
        }
        return;
    }
    // Obtener un aleatorio
    let Aleatorio = Math.floor(Math.random() * amigos.length);
    
    // Obtener el amigo sorteado
    let amigoSorteado = amigos[Aleatorio];

    // Eliminarlo de la lista para que no se vuelva a sortear
    amigos.splice(Aleatorio, 1);

    // Mostrar el resultado 
    asignarTextoElemento('resultado', `El amigo secreto sorteado es: ${amigoSorteado}`);
    
    //actualiza Lista para no mostar los nombres en pantalla
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
}

//Función para reiniciar el juego, limpiando la lista de amigos y el resultado en pantalla
function reiniciarJuego() {
    amigos = []; 
    asignarTextoElemento('resultado', ''); 
    actualizarLista(); 
}