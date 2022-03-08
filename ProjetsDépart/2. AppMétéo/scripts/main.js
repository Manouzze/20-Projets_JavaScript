import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';
 //console.log("depuis"+tabJoursEnOrdre)

const CLEFAPI = '677c6e76d61a8a6611b81430f9967121';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevesion-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');




// .getCurrentPosition :obtenir la position actuelle de l'utilisateur 
// navigator.geolocation permet de demander l'autorisation a l'utilisateur
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position =>{

    //console.log(position);
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    console.log(long)
    console.log(lat)
    console.log(position)

    
    AppelAPI(long, lat);

  }, () =>{
    alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionnner,
     veuillez l'activer.`)
  })
}

function AppelAPI(long, lat) {
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
  .then((reponse) => {
    return reponse.json();
  })
  .then((data) => {
    //console.log(data);

    resultatsAPI = data;

    temps.innerText = resultatsAPI.current.weather[0].description;
    temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
    localisation.innerText = resultatsAPI.timezone;


    // les heures, par tranche de 3, avec leurs temperatures.
    
    let heureActuelle = new Date().getHours();

    for(let i = 0; i < heure.length; i++) {

      let heureIncr = heureActuelle + i * 3;

      if(heureIncr > 24) {
        heure[i].innerText = `${heureIncr - 24} h`;
      } else if (heureIncr === 24){
        heure[i].innerText = "00 h"
      } else{
        heure[i].innerText = `${heureIncr} h`;
      }
      
    }
    //temp pour 3h 
    
    for (let j = 0; j < tempPourH.length; j++){
      tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
    }
    // 3 premières lettres des jours
    for( let k = 0; k < tabJoursEnOrdre.length; k++){
      joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3)
    }

    // Temp par jour

    for(let m =0; m < 7; m++){
      tempJoursDiv[m].innerText =`${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
    }

    // Icone dynamique
    if(heureActuelle >= 6 && heureActuelle < 21){
      console.log(heureActuelle)
      console.log(resultatsAPI.current)
      imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
    } else {
      imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
    };

    //chargement de la page
    chargementContainer.classList.add('disparition');

  })

}
