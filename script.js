document.addEventListener("DOMContentLoaded", function () {

    // ═══════════════════════════════════════════════════════
    //  index.html — Botón "agendar-cita"
    // ═══════════════════════════════════════════════════════
    const boton = document.getElementById("agendar-cita");
    const mensaje = document.getElementById("mensaje");
    if (boton && mensaje) {
        boton.addEventListener("click", function () {
            mensaje.textContent = "¡Tenemos una promoción especial!";
        });
    }

    // ═══════════════════════════════════════════════════════
    //  index.html — Cotizador de promoción
    // ═══════════════════════════════════════════════════════
    const producto  = document.getElementById("producto");
    const cantidad  = document.getElementById("cantidad");
    const resultado = document.getElementById("resultado");
    const aviso     = document.getElementById("mensaje-promocion");
    const verPromo  = document.getElementById("boton-promocion");
    const calcular  = document.getElementById("calcular");
    const limpiar   = document.getElementById("limpiar");

    if (producto && cantidad && resultado && aviso && verPromo && calcular && limpiar) {

        verPromo.addEventListener("click", function () {
            resultado.textContent = "";
            aviso.textContent = "10 % de descuento desde $1000 MXN.";
        });

        function cotizar() {
                aviso.textContent = "";
                resultado.textContent = "";

                const precio   = Number(producto.value);
                const unidades = Number(cantidad.value);

                if (producto.value === "") {
                    resultado.textContent = "Selecciona un producto.";
                    return;
                }
                if (!Number.isInteger(unidades) || unidades < 1 || unidades > 20) {
                    resultado.textContent = "Escribe un entero entre 1 y 20.";
                    return;
                }

                const importe = precio * unidades;
                let descuento = 0;

                if (importe >= 1000) {
                    descuento = importe * 0.10;
                } else {
                    descuento = 0;
                }

                const totalPagar = importe - descuento;

                resultado.textContent =
                    "Importe: $" + importe.toFixed(2) +
                    " | Descuento: $" + descuento.toFixed(2) +
                    " | Total: $" + totalPagar.toFixed(2) + " MXN";
            }

        calcular.addEventListener("click", cotizar);

        limpiar.addEventListener("click", function () {
            producto.value = "";
            cantidad.value = "";
            resultado.textContent = "";
            aviso.textContent = "";
            producto.focus();
        });
    }

    // ═══════════════════════════════════════════════════════
    //  productos.html — Calcular compra total
    // ═══════════════════════════════════════════════════════
    const btnCalcularCompra = document.getElementById("calcular-compra");
// CONDICIONAL PARA QUE NO SE DETENGA EL CODIGO AQUI, LEE EL SECTION Y EJECUTA 
    if (btnCalcularCompra) {

        const productosCompra = [
            { precio: 350,  cantidadId: "cantidad-1", subtotalId: "subtotal-1" },
            { precio: 250,  cantidadId: "cantidad-2", subtotalId: "subtotal-2" },
            { precio: 200,  cantidadId: "cantidad-3", subtotalId: "subtotal-3" },
            { precio: 180,  cantidadId: "cantidad-4", subtotalId: "subtotal-4" },
            { precio: 1200, cantidadId: "cantidad-5", subtotalId: "subtotal-5" },
            { precio: 0,    cantidadId: "cantidad-6", subtotalId: "subtotal-6" },
            { precio: 500,  cantidadId: "cantidad-7", subtotalId: "subtotal-7" },
            { precio: 600,  cantidadId: "cantidad-8", subtotalId: "subtotal-8" }
        ];

        function calcularCompra() {
            let total = 0;

            for (const item of productosCompra) {
                const campo    = document.getElementById(item.cantidadId);
                const span     = document.getElementById(item.subtotalId); //ayuda tmb a mostrar el resultado
                const unidades = Number(campo.value);
                if (campo.value.trim() === "" || !Number.isInteger(unidades) || unidades < 0) {
                    campo.focus();
                    return null;
                }
                const subtotal = item.precio * unidades;
                span.textContent = subtotal.toFixed(2); //mejor btw
                total += subtotal;
            }
            return total;
        }

        btnCalcularCompra.addEventListener("click", function () {
            const importe = calcularCompra();
            if (importe === null) return;
            document.getElementById("importe-compra").textContent = importe.toFixed(2);
            let descuento = 0;
            if (importe >= 500) {
                descuento = importe * 0.10;
            }
            document.getElementById("descuento-compra").textContent = descuento.toFixed(2);
            const totalPagar = importe - descuento;
            document.getElementById("total-compra").textContent = totalPagar.toFixed(2);
        });
    }
});