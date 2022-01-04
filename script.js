//declaro la clase pokemon

class Pokemon {
  constructor(name, id, image, weight, height, base_experience) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.weight = weight;
    this.height = height;
    this.base_experience = base_experience;
    this.cant = 1;

  }
}

//Delcaro el array myPokemones que posteriormente va contener las instancias de los objetos pokemon
const myPokemones = [];

//usando jquery capturo el evento submit del id: pokeList y ejecuto una funcion 


$('#pokeList').submit((e) => {
  //para evitar el comportamiento por defecto del submit
  e.preventDefault();
  //capturo el valor de el imput en una constante
  const imputValue = $("#imputValue").val();
  //vacio el imput
  $("#imputValue").val("")
  //mediante un condicional IF valido si el imput esta vacio o contiene un valor
  if (imputValue === "") {
    //elimino el los nodos o hijos que pueda tener los contenedores identifiocados con los id: selectedPokemon y searchContainer
    $("#selectedPokemon").empty()
    $("#searchContainer").empty()

    //al estar el imput vacio utilizo fetch para realizar una peticion GET a la api que me retorna un numero definido de "pokemones"
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=200`)
      .then(response => response.json())
      .then((result) => {
        //desestructuro datos de la respuesta y los almaceno en una constante
        const { results } = result;
        //medinate el metodo map recorro el array       
        results.map(result => {
          const { name, url } = result;
          //con el metodo append le adjutno los resultados a la vista
          $('#searchContainer').append(
            `
          <button type="button" class="list-group-item list-group-item-action animate__animated animate__backInDown " id="${name}">${name}</button>
          
          `
          )
          //usando el nombre como id le agrego un "listener" a cada boton para asi reconocer el eventual evento click en cada uno        
          $(`#${name}`).click((e) => {
            e.preventDefault()

            const selectedPokemon = e.target.id;
            $("#selectedPokemon").empty()
            //habiendo reconocido el evento realizo una peticion GET con fetch para solicitar a la api informacion de el pokemon en cuestion, interpolo la url para poder concatenar la constante que almacena el valor de el nombre del pokemon a buscar
            fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
              .then(response => response.json())
              .then((result) => {

                const { name, height, weight, sprites, id, base_experience } = result



                //con el metodo append le adjutno los resultados a la vista

                $('#selectedPokemon').append(

                  `
              
              <div class="card shadow animate__animated animate__slideInRight" style="width: 13rem;">
                <div class="card-body">
                  <img src="${sprites.front_default}" class="card-img-top" alt="Pokemon image">
              
                  <h5 class="card-title">${name}</h5>
                  <p class="m-0 small "> Id: ${id} </p>
                  <p class="m-0 small "> Experience: ${base_experience} </p>
                  <p class="m-0 small "> Weight and heigth: ${weight}kg / ${height}cm </p>
                </div>
                <button class="btn btn-info" id="IdCapture"> <img src="./src/img/Pokemon-Go-Ball.png" alt="pokemon image" class="pokemonBall"></button>
              
              </div>
              
              `
                )
                //con el metodo click capturo el evento del boton que me permite agregar el pokemon a mi pokedexter 
               
               if (myPokemones.length <= 5) {
                  
                 
                $("#IdCapture").click(() => {
                  //realizo un avalidacion para identificar si el pokemon ya esta en mi pokedexter asi si es el caso aumentar en cantidad o de otra manera agregarlo a mi array de pokemones
                  if (myPokemones.find(pokemon => pokemon.name == name)) {
                    const pokemon = new Pokemon(name, id, sprites.front_default, weight, height, base_experience)

                    const index = myPokemones.findIndex((pokemon) => pokemon.name === name)
                    myPokemones[index].cant++
                    //usando em metodo setItem del local storage y aplicando el metodo stringify a mi array "myPokemones" almaceno la informacion el el navegador                 
                    localStorage.setItem('pokedexter', JSON.stringify(myPokemones))
                  } else {

                    const pokemon = new Pokemon(name, id, sprites.front_default, weight, height, base_experience)
                    myPokemones.push(pokemon)
                    localStorage.setItem('pokedexter', JSON.stringify(myPokemones))
                  }
                })
           

               } else {
                 
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'tu pokedexter ya tiene el maximo de pokemones permitido',

})
               }
               
               
              
              })
          })
        });
      })
  } else {
    //si el valor del imput es distinto de "" realizo la peticion GET fetch a la API con el valor del imput
    $("#selectedPokemon").empty()
    $("#searchContainer").empty()


    fetch(`https://pokeapi.co/api/v2/pokemon/${imputValue}`)
      .then(response => response.json())
      .then((result) => {

        const { name, height, weight, sprites, id, base_experience } = result
        //con el metodo append le adjutno los resultados a la vista

        $("#searchContainer").append(`

        <h3 class="animate__animated animate__slideInRight"> ${name} <i class="far fa-check-circle "></i></h3>

        `)
        //con el metodo append le adjutno los resultados a la vista

        $('#selectedPokemon').append(

          `
          
          <div class="card shadow animate__animated animate__slideInRight" style="width: 13rem;">
            <div class="card-body">
              <img src="${sprites.front_default}" class="card-img-top" alt="Pokemon image">
          
              <h5 class="card-title">${name}</h5>
              <p class="m-0 small "> Id: ${id} </p>
              <p class="m-0 small "> Experience: ${base_experience} </p>
              <p class="m-0 small "> Weight and heigth: ${weight}kg / ${height}cm </p>
            </div>
            <button class="btn btn-info" id="IdCapture"><img src="./src/img/Pokemon-Go-Ball.png" alt="pokemon image" class="pokemonBall"></button>
          
          </div>
          
          `
        )

        //con el metodo click capturo el evento del boton que me permite agregar el pokemon a mi pokedexter 

        $("#IdCapture").click(() => {

          if (myPokemones.find(pokemon => pokemon.name == name)) {
            const pokemon = new Pokemon(name, id, sprites.front_default, weight, height, base_experience)

            const index = myPokemones.findIndex((pokemon) => pokemon.name === name)
            myPokemones[index].cant++

            localStorage.setItem('pokedexter', JSON.stringify(myPokemones))
          } else {

            const pokemon = new Pokemon(name, id, sprites.front_default, weight, height, base_experience)
            myPokemones.push(pokemon)
            localStorage.setItem('pokedexter', JSON.stringify(myPokemones))
          }
        })
      })
  }
})

//para poder actualizar la vista sin recargar la pagina cree esta funcion que se ejecuta al pulsar un boton "Refresh"
$("#refreshPokedester").click(
  () => {
    $("#myPokemonId").empty()
    //usando el metodo getItem del localStorage y almacenando la respuesta en una constante puedo acceder a esta informacion
    const PokemonLocalStorage = JSON.parse(localStorage.getItem("pokedexter"));
    //el array que es reultado lo reocorro con el metodo map y renderizo la informacion en la vista
    PokemonLocalStorage.map(pokemon => {
      //con el metodo append le adjutno los resultados a la vista
      $("#myPokemonId").append(
        `            
          <div class="col-sm-6  p-2 animate__animated animate__backInDown ">
          <div class="col d-flex justify-content-center  ">
          
          <div class="card shadow" style="width: 13rem;">
            <div class="card-body">
              <img src="${pokemon.image}" class="card-img-top" alt="Pokemon image">            
              <h5 class="card-title">${pokemon.name}</h5>
              <div class="d-flex justify-content-between">
              <p class="m-0 small "> Id: ${pokemon.id} </p>
                <p class="m-0 small "> Cant: ${pokemon.cant} </p>
              </div>
                     
              <p class="m-0 small "> Experience: ${pokemon.base_experience} </p>
              <p class="m-0 small "> Weight and heigth: ${pokemon.weight}kg / ${pokemon.height}cm </p>
            </div>
            <button class="btn btn-danger pokemonDelete" id="${pokemon.name + 1}" ><img src="./src/img/Pokemon-Ball-Open-Png.png" alt="pokemon image" class="pokemonBall"></i></button>            
          </div>
          </div>           
          </div>           
          `
      )
      $(`#${pokemon.name + 1}`).click(() => {

        if (pokemon.cant >= 2) {
          //realizo un avalidacion para identificar si el pokemon ya esta en mi pokedexter asi si es el caso restar en cantidad o de otra manera retirarlo de mi array de pokemones
          const index = myPokemones.findIndex((pokemonArr) => pokemonArr.name === pokemon.name)
          myPokemones[index].cant--

          localStorage.setItem('pokedexter', JSON.stringify(myPokemones))
        } else {

          console.log(2)
          const index = myPokemones.findIndex((pokemonArr) => pokemonArr.name === pokemon.name)
          myPokemones.splice(index, 1)
          localStorage.setItem('pokedexter', JSON.stringify(myPokemones))
        }
      })
    })
  }
)

