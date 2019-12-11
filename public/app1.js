var matrizCiudades = [],
    matrizTipos = [];

function hacerPeticion() {
  $.ajax({
  url: "http://localhost:8080/ajax",
  method: "GET",
  success: function(respuesta) {
    for(i = 0; i < 100; i++){
        matrizCiudades[i] = respuesta.datosJSON[i].Ciudad;
        matrizTipos[i] = respuesta.datosJSON[i].Tipo;
      }
      unificarTipos();
      unificarCiudades();
    },
  error: function() {
        console.log("El servidor no ha respondido positivamente");
      }
    });
};
hacerPeticion();

function unificarCiudades() {
  matrizCiudades.forEach(function (elemento, l, array) {
    if ( l == 0) {
      ciudadesUnificadas = [];
      ciudadesUnificadas[0] = elemento;
      indiceU = 0;
    } else {
      repetido = false;
      for (let n = 0; n < l; n++) {
        if ( matrizCiudades[l] == matrizCiudades[n] ) {
          repetido = true;
        };
      };
      if (!repetido){
        indiceU = indiceU + 1;
        ciudadesUnificadas[indiceU] = matrizCiudades[l];
      };
    };
  });
  ciudadesUnificadas.forEach(function (elemento, l, array) {
    $("#ciudad").append(`<option value="${elemento}">${elemento}</option>`);
  });
};

function unificarTipos() {
  matrizTipos.forEach(function (elemento, l, array) {
    if ( l == 0) {
      tiposUnificados = [];
      tiposUnificados[0] = elemento;
      indiceU = 0;
    } else {
      repetido = false;
      for (let n = 0; n < l; n++) {
        if ( matrizTipos[l] == matrizTipos[n] ) {
          repetido = true;
        }
      }
      if (!repetido){
        indiceU = indiceU + 1;
        tiposUnificados[indiceU] = matrizTipos[l];
      };
    };
  });
  tiposUnificados.forEach(function (elemento, l, array) {
    $("#tipo").append(`<option value="${elemento}">${elemento}</option>`);
  });
};
