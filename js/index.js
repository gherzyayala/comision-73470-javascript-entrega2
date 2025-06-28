// Array para almacenar clientes
const clientes = []

// Seleccionamos elementos
const contenedor = document.querySelector(".contenedor")
const btnCrearCliente = document.querySelector(".btn-crearCliente")
const btnCrearCuentaCliente = document.querySelector(".btn-crearCuentaCliente")
const btnRetirarDinero = document.querySelector(".btn-retirarDinero")
const btnAbonarDinero = document.querySelector(".btn-abonarDinero")
const btnSalir = document.querySelector(".btn-salir")


// Funcion para restaurar el contenido original del main
function restaurarMainInicial() {
    contenedor.innerHTML = `
        <h1>Bienvenido al simulador de estado de cuenta</h1>
        <h2>Selecciona una de las siguientes opciones:</h2>

        <form class="formulario">
            <div>
                <input type="submit" value="1. Crear Cliente" class="btn-crearCliente">
            </div>

            <div>
                <input type="submit" value="2. Crear cuenta para cliente existente" class="btn-crearCuentaCliente">
            </div>

            <div>
                <input type="submit" value="3. Retirar Dinero" class="btn-retirarDinero">
            </div>

            <div>
                <input type="submit" value="4. Abonar Dinero" class="btn-abonarDinero">
            </div>

            <div>
                <input type="submit" value="5. Salir" class="btn-salir">
            </div>
        </form>
    `
// Volver a registrar el evento para el botón "Crear Cliente" ya que fue regenerado
    const nuevoBtnCrearCliente = document.querySelector(".btn-crearCliente")
    nuevoBtnCrearCliente.addEventListener("click", btnCrearClienteClickHandler)

    const nuevoBtnCrearCuentaCliente = document.querySelector(".btn-crearCuentaCliente")
    nuevoBtnCrearCuentaCliente.addEventListener("click", btnCrearCuentaClienteClickHandler)

    const nuevoBtnRetirarDinero = document.querySelector(".btn-retirarDinero")
    nuevoBtnRetirarDinero.addEventListener("click", btnRetirarDineroClickHandler)

    const nuevoBtnAbonarDinero = document.querySelector(".btn-abonarDinero")
    nuevoBtnAbonarDinero.addEventListener("click", btnAbonarDineroClickHandler)

    const nuevoBtnSalir = document.querySelector(".btn-salir")
    nuevoBtnSalir.addEventListener("click", btnSalirClickHandler)
}

// Funcion para crear cliente
function btnCrearClienteClickHandler(event) {
    event.preventDefault() // evita el envío del formulario
    
    // Limpiamos el contenido del main
    contenedor.innerHTML = ""

    // Creación de nuevo contenido en HTML
    const div = document.createElement("div")

    // Creamos el título del nuevo contenido en HTML
    const titulo = document.createElement("h1")
    titulo.textContent = "Crea un nuevo cliente"

    // Creamos input para el nombre
    const inputNombre = document.createElement("input")
    inputNombre.type = "text"
    inputNombre.placeholder = "Ingresa tu nombre"
    inputNombre.classList.add("input")

    // Creamos input para la nacionalidad
    const inputNacionalidad = document.createElement("input")
    inputNacionalidad.type = "text"
    inputNacionalidad.placeholder = "Ingresa tu nacionalidad"
    inputNacionalidad.classList.add("input")

    // Crear botón para crear cliente
    const inputCrear = document.createElement("input")
    inputCrear.type = "button"
    inputCrear.value = "Crear Cliente"
    inputCrear.classList.add("btn-nuevo-cliente")

    // Evento para crear cliente
    inputCrear.addEventListener("click", () => {
        const nombre = inputNombre.value.trim()
        const nacionalidad = inputNacionalidad.value.trim()

        // Verificar campos vacíos
        if (nombre === "" || nacionalidad === "") {
            // Crear mensaje de error
            const mensajeError = document.createElement("button")
            mensajeError.textContent = "Por favor completa todos los campos."
            mensajeError.classList.add("mensaje-error")

            // Insertar después del botón
            contenedor.insertBefore(mensajeError, inputCrear.nextSibling)

            // Eliminar mensaje después de 5 segundos
            setTimeout(() => {
                mensajeError.remove()
            }, 3000)

            return
        }

        const nuevoCliente = {
            id: clientes.length + 1,
            nombre: nombre,
            nacionalidad: nacionalidad,
            cuentas: []
        }

        clientes.push(nuevoCliente)
        console.log("Cliente creado:", nuevoCliente)
        const mensajeExito = document.createElement("button")
        mensajeExito.textContent = "Cliente registrado exitosamente."
        mensajeExito.classList.add("mensaje-exito")

        // Insertar después del botón
        contenedor.insertBefore(mensajeExito, inputCrear.nextSibling)

        
        setTimeout(() => {
            restaurarMainInicial()
        }, 1000)
        
    })

    // Agregamos elementos al contenedor
    contenedor.appendChild(div)
    contenedor.appendChild(titulo)
    contenedor.appendChild(inputNombre)
    contenedor.appendChild(document.createElement("br"));
    contenedor.appendChild(inputNacionalidad)
    contenedor.appendChild(document.createElement("br"));
    contenedor.appendChild(inputCrear)
}

// Registrar el evento por primera vez
btnCrearCliente.addEventListener("click", btnCrearClienteClickHandler)

// Funcion para crear cuenta cliente
function btnCrearCuentaClienteClickHandler(event){
    event.preventDefault() // evita el envío del formulario
    
    // Limpiamos el contenido del main
    contenedor.innerHTML = ""

    // Creación de nuevo contenido en HTML
    const div = document.createElement("div")

    // Creamos el título del nuevo contenido en HTML
    const titulo = document.createElement("h1")
    titulo.textContent = "Crear cuenta de clientes existentes"
    div.appendChild(titulo)
    div.appendChild(document.createElement("br"))

    // Agregar contenedor al DOM de inmediato
    contenedor.appendChild(div)  

    // Validación si existen cuentas de clientes
    if(clientes.length === 0){
        // Crear mensaje de error
        const mensajeErrorCliente = document.createElement("button")
        mensajeErrorCliente.textContent = "No existen clientes, primero crea un cliente."
        mensajeErrorCliente.classList.add("mensaje-error")
        div.appendChild(mensajeErrorCliente)

        // Eliminar mensaje después de 3 segundos
        setTimeout(() => {
            mensajeErrorCliente.remove()
            restaurarMainInicial()
            }, 3000)
        return
    }

    // Crear input para ID de cliente
    const inputIdCliente  = document.createElement("input")
    inputIdCliente.type = "number"
    inputIdCliente.placeholder = "Ingrese el ID del cliente para crear cuenta"
    inputIdCliente.classList.add("input")

    // Crear botón para crear cliente
    const inputCrearCuenta = document.createElement("input")
    inputCrearCuenta.type = "button"
    inputCrearCuenta.value = "Crear Cuenta"
    inputCrearCuenta.classList.add("btn-crear-cuenta")
    
    // Mostrar lista de clientes
    const listaClientes = document.createElement("ul")
    listaClientes.style.listStyle = "none"
    clientes.forEach(cliente => {
        const li = document.createElement("li")
        li.textContent = `ID Cliente: ${cliente.id} - Nombre: ${cliente.nombre} - Nacionalidad: ${cliente.nacionalidad}`
        listaClientes.appendChild(li)
    })

    // Evento para crear cuenta
    inputCrearCuenta.addEventListener("click", () =>{

        const idIngresado = parseInt(inputIdCliente.value.trim())
        const cliente = clientes.find(c => c.id === idIngresado)

        // Validación de ID
        if (!cliente) {
            const mensajeErrorId = document.createElement("button")
            mensajeErrorId.textContent = "Cliente no encontrado, ingresa un ID de cliente válido."
            mensajeErrorId.classList.add("mensaje-error")
            div.appendChild(mensajeErrorId)

            setTimeout(() => {
                mensajeErrorId.remove()
            }, 3000)

            return
        }

        // Crear nueva cuenta
        const numeroCuenta = cliente.cuentas.length + 1
        cliente.cuentas.push({ numero: numeroCuenta, saldo: 0 })


        // Mensaje de éxito
        console.log("Cuenta creada: ", numeroCuenta)
        const mensajeExitoIdCliente = document.createElement("button")
        mensajeExitoIdCliente.textContent = `Cuenta de ahorros creada #: ${numeroCuenta} creada para ${cliente.nombre}`
        mensajeExitoIdCliente.classList.add("mensaje-exito")
        div.appendChild(mensajeExitoIdCliente)

       
        setTimeout(() => {
            restaurarMainInicial()
        }, 2000)
        
    })

    // Agregar elementos al div y contenedor
    div.appendChild(titulo)
    div.appendChild(document.createElement("br"))
    div.appendChild(listaClientes)
    div.appendChild(document.createElement("br"))
    div.appendChild(inputIdCliente)
    div.appendChild(document.createElement("br"))
    div.appendChild(inputCrearCuenta)
}

// Registrar el evento por primera vez
btnCrearCuentaCliente.addEventListener("click", btnCrearCuentaClienteClickHandler)


function btnRetirarDineroClickHandler (event){
    event.preventDefault() // evita el envío del formulario
    
    // Limpiamos el contenido del main
    contenedor.innerHTML = ""

    // Creación de nuevo contenido en HTML
    const div = document.createElement("div")

    // Creamos el título del nuevo contenido en HTML
    const titulo = document.createElement("h1")
    titulo.textContent = "Retirar dinero"
    div.appendChild(titulo)
    div.appendChild(document.createElement("br"))

    // Agregar contenedor al DOM de inmediato
    contenedor.appendChild(div)

    // Validar que haya clientes
    if (clientes.length === 0) {    
        // Crear mensaje de error
        const mensajeErrorCliente = document.createElement("button")
        mensajeErrorCliente.textContent = "No existen clientes, primero crea un cliente."
        mensajeErrorCliente.classList.add("mensaje-error")
        div.appendChild(mensajeErrorCliente)

        // Eliminar mensaje después de 3 segundos
        setTimeout(() => {
            mensajeErrorCliente.remove()
            restaurarMainInicial()
            }, 3000)
        return
    }

    // Crear input para ID de cliente
    const inputIdCliente  = document.createElement("input")
    inputIdCliente.type = "number"
    inputIdCliente.placeholder = "Ingrese el ID del cliente para retirar dinero"
    inputIdCliente.classList.add("input")

    // Crear input para consultar cuentas
    const btnConsultarCuentas = document.createElement("input")
    btnConsultarCuentas.type = "button"
    btnConsultarCuentas.value = "Consultar cuentas"
    btnConsultarCuentas.classList.add("btn-consultar-cuenta")

    // Crear input para ingresar numero de cuenta
    const inputIdCuenta = document.createElement("input")
    inputIdCuenta.type = "number"
    inputIdCuenta.placeholder = "Ingresa el # de la cuenta de la cual deseas retirar"
    inputIdCuenta.classList.add("input")

    // Crear input para colocar monto a retirar
    const inputMontoRetirar = document.createElement("input")
    inputMontoRetirar.type = "number"
    inputMontoRetirar.placeholder = "Ingrese el monto a retirar"
    inputMontoRetirar.classList.add("input")

    // Crear botón para crear cliente
    const inputRetirarDinero = document.createElement("input")
    inputRetirarDinero.type = "button"
    inputRetirarDinero.value = "Retirar Dinero"
    inputRetirarDinero.classList.add("btn-retirar-dinero")

    const contenedorCuentas = document.createElement("div") // Aquí se mostrarán las cuentas

    // Mostrar lista de clientes
    const listaClientes = document.createElement("ul")
    listaClientes.style.listStyle = "none"
    clientes.forEach(cliente => {
        const li = document.createElement("li")
        li.textContent = `ID Cliente: ${cliente.id} - Nombre: ${cliente.nombre} - Nacionalidad: ${cliente.nacionalidad}`
        listaClientes.appendChild(li)
    })

    btnConsultarCuentas.addEventListener("click", () =>{
        contenedorCuentas.innerHTML = ""

        const idIngresado = parseInt(inputIdCliente.value.trim())
        const cliente = clientes.find(c => c.id === idIngresado)

        // Validación de ID
        if (!cliente) {
            const mensajeError = document.createElement("button")
            mensajeError.textContent = "Cliente no encontrado, ingresa un ID de cliente válido."
            mensajeError.classList.add("mensaje-error")
            div.appendChild(mensajeError)

            setTimeout(() => {
                mensajeError.remove()
            }, 3000)

            return
        }

        if (cliente.cuentas.length === 0){
            const mensajeError = document.createElement("button")
            mensajeError.textContent = "El cliente no tiene cuentas registradas, primero genera una cuenta para el cliente."
            mensajeError.classList.add("mensaje-error")
            div.appendChild(mensajeError)

            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                mensajeError.remove()
                restaurarMainInicial()
            }, 3000)
            
            return
        }

        // Mostrar lista de cuentas
        const listaCuentas = document.createElement("ul")
        listaCuentas.style.listStyle = "none"
        cliente.cuentas.forEach(cuenta => {
            const li = document.createElement("li")
            li.textContent = `Cuenta #: ${cuenta.numero} - Saldo: ${cuenta.saldo.toFixed(2)}`
            listaCuentas.appendChild(li)
        })

        contenedorCuentas.appendChild(listaCuentas)

    })

    // Evento para retirar dinero
    inputRetirarDinero.addEventListener("click", () =>{
        const idCliente = parseInt(inputIdCliente.value.trim());
        const cliente = clientes.find(c => c.id === idCliente);

        if (!cliente) {
            const mensajeError = document.createElement("button");
            mensajeError.textContent = "Cliente no encontrado, ingresa un ID válido.";
            mensajeError.classList.add("mensaje-error");
            div.appendChild(mensajeError);
            setTimeout(() => mensajeError.remove(), 3000);
            return;
        }

        const numCuenta = parseInt(inputIdCuenta.value.trim())
        const cuenta = cliente.cuentas.find(c => c.numero === numCuenta)

        if (!cuenta) {
            const mensajeError = document.createElement("button")
            mensajeError.textContent = "Cuenta no encontrada, ingresa una cuenta válida."
            mensajeError.classList.add("mensaje-error")
            div.appendChild(mensajeError)
            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                mensajeError.remove()
            }, 3000)
            
            return
        }

        const monto = parseFloat(inputMontoRetirar.value.trim());

        if (isNaN(monto) || monto <= 0) {
            const mensajeError = document.createElement("button");
            mensajeError.textContent = "Monto inválido.";
            mensajeError.classList.add("mensaje-error");
            div.appendChild(mensajeError);
            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                mensajeError.remove()
            }, 3000)
            
            return;
        }

        if (cuenta.saldo < monto) {
            const mensajeError = document.createElement("button");
            mensajeError.textContent = "Fondos insuficientes.";
            mensajeError.classList.add("mensaje-error");
            div.appendChild(mensajeError);
            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                mensajeError.remove()
                restaurarMainInicial()
            }, 3000)
            
            return;
        }

        // Realizar retiro
        cuenta.saldo -= monto

        // Mensaje de éxito
        const mensajeExito = document.createElement("button")
        mensajeExito.textContent = `Cuenta #: ${cuenta.numero} creada para ${cliente.nombre} tiene como nuevo saldo: ${cuenta.saldo.toFixed(2)}`
        mensajeExito.classList.add("mensaje-exito")
        div.appendChild(mensajeExito)

        setTimeout(() => {
            restaurarMainInicial()
        }, 3000)
    })

    // Agregar todo al div
    div.appendChild(listaClientes)
    div.appendChild(document.createElement("br"))
    div.appendChild(inputIdCliente)
    div.appendChild(document.createElement("br"))
    div.appendChild(btnConsultarCuentas)
    div.appendChild(document.createElement("br"))
    div.appendChild(contenedorCuentas)
    div.appendChild(document.createElement("br"))
    div.appendChild(inputIdCuenta)
    div.appendChild(document.createElement("br"))
    div.appendChild(inputMontoRetirar);
    div.appendChild(document.createElement("br"))
    div.appendChild(inputRetirarDinero)

}
// Registrar el evento por primera vez
btnRetirarDinero.addEventListener("click", btnRetirarDineroClickHandler)


function btnAbonarDineroClickHandler (event){
    event.preventDefault() // evita el envío del formulario
    
    // Limpiamos el contenido del main
    contenedor.innerHTML = ""

    // Creación de nuevo contenido en HTML
    const div = document.createElement("div")

    // Creamos el título del nuevo contenido en HTML
    const titulo = document.createElement("h1")
    titulo.textContent = "Abonar dinero"
    div.appendChild(titulo)
    div.appendChild(document.createElement("br"))

    // Agregar contenedor al DOM de inmediato
    contenedor.appendChild(div)

    // Validar que haya clientes
    if (clientes.length === 0) {    
        // Crear mensaje de error
        const mensajeErrorCliente = document.createElement("button")
        mensajeErrorCliente.textContent = "No existen clientes, primero crea un cliente."
        mensajeErrorCliente.classList.add("mensaje-error")
        div.appendChild(mensajeErrorCliente)

        // Eliminar mensaje después de 3 segundos
        setTimeout(() => {
            mensajeErrorCliente.remove()
            restaurarMainInicial()
            }, 3000)
        return
    }

    // Crear input para ID de cliente
    const inputIdCliente  = document.createElement("input")
    inputIdCliente.type = "number"
    inputIdCliente.placeholder = "Ingrese el ID del cliente para abonar dinero"
    inputIdCliente.classList.add("input")

    // Crear input para consultar cuentas
    const btnConsultarCuentas = document.createElement("input")
    btnConsultarCuentas.type = "button"
    btnConsultarCuentas.value = "Consultar cuentas"
    btnConsultarCuentas.classList.add("btn-consultar-cuenta")

    // Crear input para ingresar numero de cuenta
    const inputIdCuenta = document.createElement("input")
    inputIdCuenta.type = "number"
    inputIdCuenta.placeholder = "Ingresa el # de la cuenta de la cual deseas abonar"
    inputIdCuenta.classList.add("input")

    // Crear input para colocar monto a abonar
    const inputMontoAbonar = document.createElement("input")
    inputMontoAbonar.type = "number"
    inputMontoAbonar.placeholder = "Ingrese el monto a abonar"
    inputMontoAbonar.classList.add("input")

    // Crear botón para crear abonar dinero
    const inputAbonarDinero = document.createElement("input")
    inputAbonarDinero.type = "button"
    inputAbonarDinero.value = "Abonar Dinero"
    inputAbonarDinero.classList.add("btn-abonar-dinero")

    const contenedorCuentas = document.createElement("div") // Aquí se mostrarán las cuentas

    // Mostrar lista de clientes
    const listaClientes = document.createElement("ul")
    listaClientes.style.listStyle = "none"
    clientes.forEach(cliente => {
        const li = document.createElement("li")
        li.textContent = `ID Cliente: ${cliente.id} - Nombre: ${cliente.nombre} - Nacionalidad: ${cliente.nacionalidad}`
        listaClientes.appendChild(li)
    })

    btnConsultarCuentas.addEventListener("click", () =>{
        contenedorCuentas.innerHTML = ""

        const idIngresado = parseInt(inputIdCliente.value.trim())
        const cliente = clientes.find(c => c.id === idIngresado)

        // Validación de ID
        if (!cliente) {
            const mensajeError = document.createElement("button")
            mensajeError.textContent = "Cliente no encontrado, ingresa un ID de cliente válido."
            mensajeError.classList.add("mensaje-error")
            div.appendChild(mensajeError)

            setTimeout(() => {
                mensajeError.remove()
            }, 3000)

            return
        }

        if (cliente.cuentas.length === 0){
            const mensajeError = document.createElement("button")
            mensajeError.textContent = "El cliente no tiene cuentas registradas, primero genera una cuenta para el cliente."
            mensajeError.classList.add("mensaje-error")
            div.appendChild(mensajeError)

            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                mensajeError.remove()
                restaurarMainInicial()
            }, 3000)
            
            return
        }

        // Mostrar lista de cuentas
        const listaCuentas = document.createElement("ul")
        listaCuentas.style.listStyle = "none"
        cliente.cuentas.forEach(cuenta => {
            const li = document.createElement("li")
            li.textContent = `Cuenta #: ${cuenta.numero} - Saldo: ${cuenta.saldo.toFixed(2)}`
            listaCuentas.appendChild(li)
        })

        contenedorCuentas.appendChild(listaCuentas)

    })

    // Evento para abonar dinero
    inputAbonarDinero.addEventListener("click", () =>{
        const idCliente = parseInt(inputIdCliente.value.trim());
        const cliente = clientes.find(c => c.id === idCliente);

        if (!cliente) {
            const mensajeError = document.createElement("button");
            mensajeError.textContent = "Cliente no encontrado, ingresa un ID válido.";
            mensajeError.classList.add("mensaje-error");
            div.appendChild(mensajeError);
            setTimeout(() => mensajeError.remove(), 3000);
            return;
        }

        const numCuenta = parseInt(inputIdCuenta.value.trim())
        const cuenta = cliente.cuentas.find(c => c.numero === numCuenta)

        if (!cuenta) {
            const mensajeError = document.createElement("button")
            mensajeError.textContent = "Cuenta no encontrada, ingresa una cuenta válida."
            mensajeError.classList.add("mensaje-error")
            div.appendChild(mensajeError)
            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                mensajeError.remove()
            }, 3000)
            
            return
        }

        const monto = parseFloat(inputMontoAbonar.value.trim());

        if (isNaN(monto) || monto <= 0) {
            const mensajeError = document.createElement("button");
            mensajeError.textContent = "Monto inválido.";
            mensajeError.classList.add("mensaje-error");
            div.appendChild(mensajeError);
            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                mensajeError.remove()
            }, 3000)
            
            return;
        }

        // Realizar retiro
        cuenta.saldo += monto

        // Mensaje de éxito
        const mensajeExito = document.createElement("button")
        mensajeExito.textContent = `Cuenta #: ${cuenta.numero} creada para ${cliente.nombre} tiene como nuevo saldo: ${cuenta.saldo.toFixed(2)}`
        mensajeExito.classList.add("mensaje-exito")
        div.appendChild(mensajeExito)

        setTimeout(() => {
            restaurarMainInicial()
        }, 3000)
    })

    // Agregar todo al div
    div.appendChild(listaClientes)
    div.appendChild(document.createElement("br"))
    div.appendChild(inputIdCliente)
    div.appendChild(document.createElement("br"))
    div.appendChild(btnConsultarCuentas)
    div.appendChild(document.createElement("br"))
    div.appendChild(contenedorCuentas)
    div.appendChild(document.createElement("br"))
    div.appendChild(inputIdCuenta)
    div.appendChild(document.createElement("br"))
    div.appendChild(inputMontoAbonar);
    div.appendChild(document.createElement("br"))
    div.appendChild(inputAbonarDinero)
}
// Registrar el evento por primera vez
btnAbonarDinero.addEventListener("click", btnAbonarDineroClickHandler)

function btnSalirClickHandler (event){
    event.preventDefault() // Evita que el formulario se envíe

    // Seleccionar el contenedor principal y limpiar su contenido
    const contenedor = document.querySelector(".contenedor")
    contenedor.innerHTML = ""

    // Crear y agregar el mensaje de despedida
    const mensaje = document.createElement("h1")
    mensaje.textContent = "Gracias por utilizar el simulador de cuenta, regresa pronto."
    mensaje.classList.add("mensaje-despedida")

    contenedor.appendChild(mensaje)

    // Esperar 4 segundos y luego cerrar la ventana
    setTimeout(() => {
        restaurarMainInicial()
        location.reload()
    }, 4000)
}
// Registrar el evento por primera vez
btnSalir.addEventListener("click", btnSalirClickHandler)