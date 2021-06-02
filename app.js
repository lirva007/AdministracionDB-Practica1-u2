// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDzI42OWO37frfJ-G8Svs-L7wlU4Z-Ft-Q",
    authDomain: "adminbasedatos-40c56.firebaseapp.com",
    projectId: "adminbasedatos-40c56",
  });
  
  var db = firebase.firestore();

  //Codigo para agregar registros a mi colección
  function agregar(){
      var nombre = document.getElementById('nombre').value;
      var apellido = document.getElementById('apellido').value;
      var año = document.getElementById('año').value;
    
      console.log(nombre, apellido, año);
        db.collection("users").add({
        idnombre: nombre,
        idapellido: apellido,
        idanio: año
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('año').value = '';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
  }

  //Codigo para Leer o Mostrar registros de mi colección
  //Leer el id de la tabla
  var tabla = document.getElementById('tabla');

  db.collection("users").onSnapshot((querySnapshot) => {
      tabla.innerHTML = ''; //Limpiar mi tabla
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().last}`);
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().idnombre}</td>
            <td>${doc.data().idapellido}</td>
            <td>${doc.data().idanio}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().idnombre}','${doc.data().idapellido}','${doc.data().idanio}')">Editar</button></td>
        </tr>
        `
        });
    });

    //borrar documento
    function eliminar(id){
        db.collection("users").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    //Editar Documento
    function editar(id, nombre, apellido, año){
        console.log(id);
        var nombre = document.getElementById('nombre').value = nombre;
        var apellido = document.getElementById('apellido').value = apellido;
        var año = document.getElementById('año').value = año;
        var boton = document.getElementById('boton');
        boton.innerHTML = 'Editar';

        boton.onclick = function(){
            var washingtonRef = db.collection("users").doc(id);

            var nombre = document.getElementById('nombre').value;
            var apellido = document.getElementById('apellido').value;
            var año = document.getElementById('año').value;

            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                idnombre: nombre,
                idapellido: apellido,
                idanio: año
            })
            .then(() => {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Agregar';
                window.location.reload();
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
    }