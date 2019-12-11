var precioDesde = 1000,
    precioHasta = 20000,
    todas = true,
    limiteini = 0,
    limitefin = 100000,
    cuenta = 0,
    identif = 0,
    direccion = "",
    ciudad = "",
    telefono = "",
    codigoPostal = "",
    vrprecio = 0,
    tipo = "",
    ciudadSeleccionada = "",
    tipoSeleccionado = "";

//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: true,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

$("#rangoPrecio").on("change", function () {
    var $entrada = $(this);
    precioDesde = $entrada.data("from");   // input data-from attribute
    precioHasta = $entrada.data("to");     // input data-to attribute
    todas = false;
});

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (todas == false) {
      ciudadSeleccionada = "";
      tipoSeleccionado = "";
      todas = true;
      limiteini = 0;
      limitefin = 100000;
    } else {
      todas = false;
      limiteini = precioDesde;
      limitefin = precioHasta;
    }
    $('#personalizada').toggleClass('invisible');
  })
}
setSearch();

function mostrarTodas() {
  $( "#buscar" ).click(function() {
    if (todas){
      limiteini = 0;
      limitefin = 100000;
    } else {
      ciudadSeleccionada = $("#ciudad").val();
      tipoSeleccionado = $("#tipo").val();
      limiteini = precioDesde;
      limitefin = precioHasta;
    }
    hacerPeticion();
  });
};
mostrarTodas();

function hacerPeticion() {
  var opcion = 0;
  if (ciudadSeleccionada == "" && tipoSeleccionado == "") {       // filtrado solo por rango de precios
    opcion = 1;
  };
  if (ciudadSeleccionada !== "" && tipoSeleccionado == "") {     // filtrado por ciudad y rango de precios
    opcion = 2;
  };
  if (ciudadSeleccionada == "" && tipoSeleccionado !== "") {     // filtrado por tipo y rango de precios
    opcion = 3;
  };
  if (ciudadSeleccionada !== "" && tipoSeleccionado !== "") {     // filtrado por ciudad, tipo y precios
    opcion = 4;
  };
  $.ajax({
  url: "http://localhost:8080/ajax",
  method: "GET",
  success: function(respuesta) {
    eliminaConsultaAnterior();
    cuenta = 0;
    for(i = 0; i < 100; i++){
      vrprecio = respuesta.datosJSON[i].Precio.replace("$","");
      vrprecio = vrprecio.replace(/,/g,"");
      vrprecio = parseInt(vrprecio);
      identif = respuesta.datosJSON[i].Id;
      direccion = respuesta.datosJSON[i].Direccion;
      ciudad = respuesta.datosJSON[i].Ciudad;
      telefono = respuesta.datosJSON[i].Telefono;
      codigoPostal = respuesta.datosJSON[i].Codigo_Postal;
      precio = respuesta.datosJSON[i].Precio;
      tipo = respuesta.datosJSON[i].Tipo;
      switch(opcion) {
        case 0: // sin filtro muestra todo
              modificaDom();
              break;
        case 1:     // filtrado solo por rango de precios
            if (vrprecio >= limiteini && vrprecio <= limitefin) {
               modificaDom();
            };
            break;
        case 2:     // filtrado por ciudad y rango de precios
            if (vrprecio >= limiteini && vrprecio <= limitefin && ciudadSeleccionada == respuesta.datosJSON[i].Ciudad) {
              modificaDom();
            };
            break;
        case 3:     // filtrado por tipo y rango de precios
            if (vrprecio >= limiteini && vrprecio <= limitefin && tipoSeleccionado == respuesta.datosJSON[i].Tipo) {
              modificaDom();
            };
            break;
        case 4:     // filtrado por ciudad, tipo y precios
            if (vrprecio >= limiteini && vrprecio <= limitefin && ciudadSeleccionada == respuesta.datosJSON[i].Ciudad && tipoSeleccionado == respuesta.datosJSON[i].Tipo) {
              modificaDom();
            };
            break;
        default:
            break;
          }
      }
  },
  error: function() {
        console.log("El servidor no ha respondido positivamente");
      }
    });
}

function eliminaConsultaAnterior() {
$('.lista').html(`<div class="card horizontal">
<div class="card-image">
</div>
<div class="card-stacked">
<div class="card-content">
</div>
<div class="card-action right-align">
</div>
</div>
</div>`)
}

function modificaDom() {
  cuenta = cuenta + 1
  $('.lista').append(`<div class="card horizontal">
  <div class="card-image">
  <img src="img/home.jpg">
  </div>
  <div class="card-stacked">
  <div class="card-content">
  <div><p><b>Secuencia: </b>${cuenta}</p></div>
  <div><p><b>Identificación de la propiedad: </b>${identif}</p></div>
  <div><p><b>Dirección: </b>${direccion}</p></div>
  <div><p><b>Ciudad: </b>${ciudad}</p></div>
  <div><p><b>Teléfono: </b>${telefono}</p></div>
  <div><p><b>Código postal: </b>${codigoPostal}</p></div>
  <div><p><b>Precio: </b>${precio}</p></div>
  <div><p><b>Tipo: </b>${tipo}</p></div>
  </div>
  <div class="card-action right-align">
  <a href="#">Ver más</a>
  </div>
  </div>
  </div>`)
}
