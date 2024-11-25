/* APERTURA Y CIERRE DEL COLLAPSE */

document.getElementById("aplicacion").addEventListener("hide.bs.collapse", function () {
    document.getElementById("acceder").textContent = "Acceder a Mis Pedidos";
});

document.getElementById("aplicacion").addEventListener("show.bs.collapse", function () {
    document.getElementById("acceder").textContent = "Ocultar";
});

/* FUNCIONALIDAD DE FILTRO */

filtro.addEventListener("change", function () {

    let tipo_pedido_elegido = document.querySelector("option:checked");
    let pedidos = document.querySelectorAll("#contenido .card");
    
    pedidos.forEach(card => {
        card.classList.add("oculto");
    });

    if (tipo_pedido_elegido.value == "todos") {

        pedidos.forEach(card => {
            card.classList.remove("oculto");
        });

    } else if (tipo_pedido_elegido.value == "tarj_pers") {
        document.querySelectorAll("#contenido .tarj_pers").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (tipo_pedido_elegido.value == "imanes") {
        document.querySelectorAll("#contenido .imanes").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (tipo_pedido_elegido.value == "impresiones") {
        document.querySelectorAll("#contenido .impresiones").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (tipo_pedido_elegido.value == "lonas") {
        document.querySelectorAll("#contenido .lonas").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (tipo_pedido_elegido.value == "folletos") {
        document.querySelectorAll("#contenido .folletos").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (tipo_pedido_elegido.value == "disenio") {
        document.querySelectorAll("#contenido .disenio").forEach(card => {
            card.classList.remove("oculto");
        });
    }
});


/* FUNCIONALIDAD DE CREAR UN NUEVO CARD*/

document.querySelector("#ingresar form").addEventListener("submit", function name(e) {
    e.preventDefault();

    let nombre_ingresado = nombre.value; 
    let diseniador_ingresado = diseniador.value; 
    let fecha_ingresado = fecha.value; 
    let tipo_pedido_ingresado = document.querySelector('#tipo_pedido option:checked').value; 

    
    const nuevo_div = document.createElement("div");
    nuevo_div.classList.add("card", "m-2", "text-start", "d-inline-block", tipo_pedido_ingresado);
    nuevo_div.innerHTML = `
        <div class="card-header text-end">
            <img src="multimedia/editar-logo.png" alt="modificar" class="me-3" data-accion="modificar" data-bs-toggle="modal" data-bs-target="#modificar">
            <img src="multimedia/eliminar-logo-card.png" alt="eliminar" data-accion="eliminar">
        </div>
        <div class="card-body">
            <h3 class="card-title">${nombre_ingresado}</h3>
            <p class="card-text"><strong>Diseñador a cargo:</strong> <span>${diseniador_ingresado}</span></p>
            <p class="card-text"><strong>Fecha de Entrega:</strong> <span>${fecha_ingresado}</span></p>
            <p class="card-text"><strong>Tipo de Pedido:</strong> <span>${tipo_pedido_ingresado}</span></p>
        </div>
    `;

    document.getElementById("contenido").prepend(nuevo_div);
    document.querySelector("#ingresar form").reset();

    let cards_actuales = document.getElementById('contenido').innerHTML;
    localStorage.setItem("favoritos", cards_actuales);
});

/* ELIMINAR CARD */

document.getElementById("contenido").addEventListener("click", function (e) {
    if(e.target.dataset.accion == "eliminar"){

        let rta = confirm("¿Estás seguro que querés eliminar este Pedido de tu lista?");

        if(rta){
            e.target.parentElement.parentElement.remove();

            let cards_actuales = document.getElementById('contenido').innerHTML;
            localStorage.setItem("favoritos", cards_actuales);
        }
    }
});

/* ELIMINAR TODOS LOS CARDS */

document.getElementById("eliminar_todo").addEventListener("click", function () {
    
    let rta = confirm("¿Estás seguro que querés eliminar todos tus Pedidos?");

    if(rta){
        document.getElementById('contenido').innerHTML = "";
        localStorage.clear();
    }   
});


/* PROGRAMACIÓN DEL BOTÓN MODIFICAR */

document.getElementById("contenido").addEventListener("click", function (e) {
    if(e.target.dataset.accion == "modificar"){

        let card = e.target.parentElement.parentElement; 
        let tipo_pedido_actual;

        if(card.classList.contains("tarj_pers")) {
            tipo_pedido_actual = "tarj_pers";
        }else if(card.classList.contains("imanes")) {
            tipo_pedido_actual = "imanes";
        }else if(card.classList.contains("impresiones")) {
            tipo_pedido_actual = "impresiones";
        }else if(card.classList.contains("lonas")) {
            tipo_pedido_actual = "lonas";
        }else if(card.classList.contains("folletos")) {
            tipo_pedido_actual = "folletos";
        }else if(card.classList.contains("disenio")) {
            tipo_pedido_actual = "disenio";
        }

        card.dataset.modificando = tipo_pedido_actual;

        let nombre_actual = document.querySelector('[data-modificando] h3').textContent;
        let diseniador_actual = document.querySelector('[data-modificando] p:first-of-type span').textContent; 
        let fecha_actual = document.querySelector('[data-modificando] p:nth-last-child(2)').textContent; 
        

        nombre_mod.value = nombre_actual;
        diseniador_mod.value = diseniador_actual;
        fecha_mod.value = fecha_actual;


        document.querySelectorAll('#tipo_pedido_mod option').forEach(option => {
            option.removeAttribute("selected");
        });

        document.querySelector(`#tipo_pedido_mod option[value="${tipo_pedido_actual}"]`).setAttribute("selected", "selected");
    }
});

/* CANCELAR MODIFICACIÓN */

document.getElementById("cancelar_mod").addEventListener("click", function () {
    let modificando = document.querySelector('[data-modificando]');
    modificando.removeAttribute('data-modificando');
});


/* MODIFICACIÓN DE DATOS */

document.querySelector("#modificar form").addEventListener("submit", function name(e) {
    e.preventDefault();

    let modificando = document.querySelector('[data-modificando]');

    let nombre_modificado = nombre_mod.value; 
    let diseniador_modificado = diseniador_mod.value; 
    let fecha_modificado = fecha_mod.value; 
    let tipo_pedido_modificado = document.querySelector('#tipo_pedido_mod option:checked').value;
    let tipo_pedido_actual = modificando.dataset.modificando;

    
    let h3 = document.querySelector('[data-modificando] h3');
    let p_diseniador = document.querySelector('[data-modificando] p:first-of-type span');
    let p_fecha = document.querySelector('[data-modificando] p:nth-last-child(2)');
    let p_tipo_pedido = modificando.querySelector('p:nth-of-type(3) span');

    h3.textContent = nombre_modificado;
    p_diseniador.textContent = diseniador_modificado;
    p_fecha.textContent = fecha_modificado;
    p_tipo_pedido.textContent = tipo_pedido_modificado;

    modificando.classList.replace(tipo_pedido_actual, tipo_pedido_modificado);

    
    modificando.removeAttribute('data-modificando');

    let cards_actuales = document.getElementById('contenido').innerHTML;
    localStorage.setItem("favoritos", cards_actuales);

});


/* EVENTO DE CARGA */
document.addEventListener("DOMContentLoaded", function () {

    
    let guardados = localStorage.getItem("favoritos");

    
    if(guardados != null) {
        document.getElementById('contenido').innerHTML = guardados;
    }
});