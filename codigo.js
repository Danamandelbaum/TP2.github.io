let Lista = [];

const mostrarLista = () => {
    let html = "";
    Lista.forEach(l => {
        let tachado = "";
        let fechaCreacion = new Date(l.timestamp).toString();
        if (l.tachado) {
            tachado = "text-decoration: line-through";
        }
        html += `<li onClick="tachar('${l.actividad}')" style="${tachado}">${l.actividad} - Creado: ${fechaCreacion}</li>`;
    });
    document.getElementById("lista").innerHTML = html;
}

const tachar = (actividad) => {
    const tarea = Lista.find(l => l.actividad === actividad);
    if (tarea) {
        tarea.tachado = !tarea.tachado;
        tarea.timestampTachado = new Date();
        mostrarLista();
    }
}

document.getElementById("agregar").onclick = () => {
    const nuevaActividad = document.getElementById("ingreso").value.trim();
    if (nuevaActividad !== "") {
        Lista.push({
            actividad: nuevaActividad,
            tachado: false,
            timestamp: new Date(),
            timestampTachado: null
        });
        document.getElementById("ingreso").value = "";
        mostrarLista();
    }
}

document.getElementById("tareaRapida").onclick = () => {
    let tareaMasRapida = Lista.filter(t => t.tachado && t.timestampTachado !== null).sort((a, b) => a.timestampTachado - b.timestampTachado)[0];
    if (tareaMasRapida) {
        alert(`La tarea más rápida fue: ${tareaMasRapida.actividad}`);
    } else {
        alert("No hay tareas resueltas para mostrar.");
    }
}