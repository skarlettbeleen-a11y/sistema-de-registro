// =============================
//  Challenge Amigo Secreto Mejorado
// =============================

// Lista de participantes
let participantes = [];

// Captura de elementos desde HTML
const inputNombre = document.getElementById("amigo");
const listaHTML = document.getElementById("listaAmigos");
const resultadoHTML = document.getElementById("resultado");
const mensajeHTML = document.createElement("p");
mensajeHTML.style.marginTop = "10px";
document.querySelector(".input-section").appendChild(mensajeHTML);

// Agregar participante
function agregarAmigo() {
    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        mostrarMensaje("⚠️ Ingresa un nombre válido.", "error");
        return;
    }

    if (participantes.includes(nombre)) {
        mostrarMensaje("⚠️ Ese nombre ya está en la lista.", "error");
        return;
    }

    participantes.push(nombre);
    actualizarLista();
    inputNombre.value = "";
    mostrarMensaje("✅ Participante agregado.", "success");
}

// Mostrar lista de participantes
function actualizarLista() {
    listaHTML.innerHTML = "";
    participantes.forEach((persona, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${persona}`;
        listaHTML.appendChild(li);
    });
}

// Sortear amigos secretos
function sortearAmigo() {
    if (participantes.length < 2) {
        mostrarMensaje("⚠️ Necesitas al menos 2 participantes.", "error");
        return;
    }

    let copia = [...participantes];
    let sorteos = [];
    let intentos = 0;

    do {
        copia = [...participantes];
        sorteos = [];
        intentos++;

        participantes.forEach(persona => {
            let indice = Math.floor(Math.random() * copia.length);

            while (copia[indice] === persona && copia.length > 1) {
                indice = Math.floor(Math.random() * copia.length);
            }

            sorteos.push(`${persona} → ${copia[indice]}`);
            copia.splice(indice, 1);
        });

    } while (!esSorteoValido(sorteos) && intentos < 100);

    if (intentos >= 100) {
        mostrarMensaje("❌ No fue posible sortear, intenta de nuevo.", "error");
    } else {
        mostrarResultado(sorteos);
        mostrarMensaje("🎉 Sorteo realizado con éxito.", "success");
    }
}

// Validar que nadie se saque a sí mismo
function esSorteoValido(sorteos) {
    return sorteos.every(par => {
        let [persona, amigo] = par.split(" → ");
        return persona !== amigo;
    });
}

// Mostrar resultados
function mostrarResultado(sorteos) {
    resultadoHTML.innerHTML = "<h3>Resultados del Amigo Secreto:</h3>";
    sorteos.forEach(par => {
        const p = document.createElement("p");
        p.textContent = par;
        resultadoHTML.appendChild(p);
    });
}

// Mostrar mensajes
function mostrarMensaje(texto, tipo) {
    mensajeHTML.textContent = texto;
    mensajeHTML.style.color = tipo === "error" ? "red" : "green";
}

// Reiniciar juego
function reiniciarJuego() {
    participantes = [];
    listaHTML.innerHTML = "";
    resultadoHTML.innerHTML = "";
    mensajeHTML.textContent = "";
    inputNombre.value = "";
    mostrarMensaje("🔄 Juego reiniciado.", "success");
}
