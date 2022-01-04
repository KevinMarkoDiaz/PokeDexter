const rivalTeam = [];
let iRival = 6;
let lossCounter = 0

const randomTeam = () => {
  for (let i = 0; i < 6; i++) {

    const num = Math.floor(Math.random() * (200 - 1)) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      .then(response => response.json())
      .then((result) => {


        rivalTeam.push(result)
      })
  }

}

$("#teamSelected").click(() => {

  $("#teamContainer").fadeIn(0, () => {
    $(".background-main").fadeOut(0)
  })


  if (rivalTeam.length == 0) {

    randomTeam()

  } else {
    rivalTeam.splice(0, 6)
    randomTeam()
  }









})

$("#selectedScreen").click(() => {

  $(".background-main").fadeIn(0)
  $("#teamContainer").fadeOut(0)
  iRival = 6;


})

$("#selectedStart").click(() => {
  $("#myTeamPlay").empty()
  $("#rivalTeamPlay").empty()
  $("#selectedTips").empty()

  $("#selectedTips").append(`    
      <p> Select a pokemon to defend your team or to attack your rival     <i class="fas fa-info-circle"></i></p>  
    `)

  rivalTeam.map(rival => {



    $("#rivalTeamPlay").append(`
        
            <div id="pokemonR${rival.base_experience}" class="pokemonContainerCard shadow col m-1">
            <div class="pokemonContainerCardContImg">
              <img src="${rival.sprites.front_default}" alt="pokemon image" class="pokemonContainerCardImg">
            </div>
            <div class="pokemonContainerCardBottom">
              <div class="pokemonContainerCardBottomName">${rival.name}</div>
              <div class="pokemonContainerCardBottomAtack" id="pokemonRB${rival.base_experience}">
                <div  ><i class="fas fa-shield-alt "></i></div>
                <div ><i class="fab fa-battle-net"></i></div>
                  
                
              </div>
            </div>
          </div>
        
        
        
            `)


  })





  const PokemonLocalStorage = JSON.parse(localStorage.getItem("pokedexter"));
  PokemonLocalStorage.map(pokemon => {
    $("#myTeamPlay").append(`
    
        <div id="pokemon${pokemon.base_experience}"class="pokemonContainerCard shadow col m-1">
        <div class="pokemonContainerCardContImg">
          <img src="${pokemon.image}" alt="pokemon image" class="pokemonContainerCardImg">
        </div>
        <div class="pokemonContainerCardBottom">
          <div class="pokemonContainerCardBottomName">${pokemon.name}</div>
          <div class="pokemonContainerCardBottomAtack" id="pokemonB${pokemon.base_experience}" >
          <div class="bottomIdShield" id="${pokemon.base_experience}"><i class="fas fa-shield-alt "></i></div>
          <div class="bottomIdAtack" id="${pokemon.base_experience}"><i class="fab fa-battle-net"></i></div>
        
            
          </div>
        </div>
      </div>
    
    
    
        `)
  })



  $(".bottomIdShield").click((e) => {
    $("#arenaBatleSelectedGId").empty()
    $("#arenaBatleSelectedBId").empty()
    $("#selectedTips").empty()
    $("#selectedTurn").empty()
    $("#arenaBatleSelectedGId").append(`
      
        <div class="shieldArena"> <p>${e.currentTarget.id}</p> </div> 
      
      `)

    const indexRival = Math.floor(Math.random() * (iRival - 1)) + 1;
    const { base_experience } = rivalTeam[indexRival]


    $("#arenaBatleSelectedBId").append(`
      
      <div class="powerdArena"> <p>${base_experience}</p> </div> 
    
    `)

    $("#selectedTurn").append(`    
    <p> attack <i class="fab fa-battle-net animate__animated animate__flip fontSize-5R"></i></p>  
  `)

    if (e.currentTarget.id >= base_experience) {

      $("#selectedTips").append(`    
        <p> Your tean is safe     <i class="fas fa-info-circle"></i></p>  
      `)

    } else {

      if (lossCounter === 5) {
           Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Your team has been defeated',
        showConfirmButton: false,
        timer: 1500
      })

      $(`#pokemon${e.currentTarget.id}`).removeClass("pokemonContainerCard").addClass("pokemonContainerCardX");
      $(`#pokemonB${e.currentTarget.id}`).removeClass("pokemonContainerCardBottomAtack").addClass("pokemonContainerCardBottomAtackX");

      } else {
        lossCounter ++
        $(`#pokemon${e.currentTarget.id}`).removeClass("pokemonContainerCard").addClass("pokemonContainerCardX");
        $(`#pokemonB${e.currentTarget.id}`).removeClass("pokemonContainerCardBottomAtack").addClass("pokemonContainerCardBottomAtackX");
  
        $("#selectedTips").append(`    
          <p> 
          we lost a member     <i class="fas fa-info-circle"></i></p>  
        `)
        console.log(lossCounter)
  
      }


      

    }



  })



 






  $(".bottomIdAtack").click((e) => {
    $("#arenaBatleSelectedGId").empty()
    $("#arenaBatleSelectedBId").empty()
    $("#selectedTips").empty()
    $("#selectedTurn").empty()
    $("#arenaBatleSelectedGId").append(`
        
          <div class="powerdArena"> <p>${e.currentTarget.id}</p> </div> 
        
        `)

    if ( iRival > 0 ) {





      const indexRival = Math.floor(Math.random() * (iRival - 1)) + 1;


      if (indexRival - 1 > 0) {
   

        const { base_experience } = rivalTeam[indexRival]

        $("#arenaBatleSelectedBId").append(`
          
          <div class="shieldArena"> <p>${base_experience}</p> </div> 
        
        `)

        $("#selectedTurn").append(`    
        <p> defend <i class="fas fa-shield-alt animate__animated animate__flip  fontSize-5"></i></p>  
      `)

        if (e.currentTarget.id >= base_experience) {

          rivalTeam.splice(indexRival, 1)
          iRival = iRival - 1
       

          $(`#pokemonR${base_experience}`).removeClass("pokemonContainerCard").addClass("pokemonContainerCardX");
          $(`#pokemonRB${base_experience}`).removeClass("pokemonContainerCardBottomAtack").addClass("pokemonContainerCardBottomAtackX");
          $("#selectedTips").append(`    
          <p> We defeated a rival member !! <i class="fas fa-info-circle"></i></p>  
        `)

        } else {

          $("#selectedTips").append(`    
          <p> That defense is strong !! <i class="fas fa-info-circle"></i></p>  
        `)

        }

      } else {




        const { base_experience } = rivalTeam[0]

        $("#arenaBatleSelectedBId").append(`
          
          <div class="shieldArena"> <p>${base_experience}</p> </div> 
        
        `)

        $("#selectedTurn").append(`    
        <p> defend <i class="fas fa-shield-alt animate__animated animate__flip fontSize-5"></i></p>  
      `)

        if (e.currentTarget.id >= base_experience) {

          rivalTeam.splice(0, 1)
          iRival = iRival - 1
        

          $(`#pokemonR${base_experience}`).removeClass("pokemonContainerCard").addClass("pokemonContainerCardX");
          $(`#pokemonRB${base_experience}`).removeClass("pokemonContainerCardBottomAtack").addClass("pokemonContainerCardBottomAtackX");
          $("#selectedTips").append(`    
          <p> We defeated a rival member !! <i class="fas fa-info-circle"></i></p>  
        `)

        } else {

          $("#selectedTips").append(`    
          <p> That defense is strong !! <i class="fas fa-info-circle"></i></p>  
        `)

        }



      }

    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your team has won',
        showConfirmButton: false,
        timer: 1500
      })
    }


  })





})
