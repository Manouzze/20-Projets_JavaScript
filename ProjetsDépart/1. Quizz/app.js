//Récupère le formulmaire 
const form = document.querySelector('.form-quizz');
// Initialisation d'un tableau vide
let tableauResultats = [];
const reponses = ['a','c','b','a','b','b'];
const emojis = ['✔️','✨','👀','😭','👎'];
const titreResultat = document.querySelector('.resultats h2');
const noteResultat = document.querySelector('.note');
const aideResultat = document.querySelector('.aide');
const toutesLesQuestions = document.querySelectorAll('.block-question');
let verifTableau = [];

// A la soumission du formulaire avc le button submit
form.addEventListener('submit', (e) => {
  e.preventDefault();       // Permet d'enlever le comportement par defaut de la page qui se refreach

  for(i = 1; i < 7; i++ ){ // On itaire pour récupérer les valeurs des 6 questions
    tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value) 
     //push permet de remplir le tableau vide. querySelector récupère les données de (l'input (de name=q{i})de la value cochée et recup la value)
  }
  verifFunc(tableauResultats);
  tableauResultats = [];
})

function verifFunc(tabResultats){

  for (let a = 0; a < 6; a++){

    if (tableauResultats[a] === reponses[a]){
      verifTableau.push(true);
    } else{
      verifTableau.push(false)
    }
  }
  //console.log(verifTableau);
  afficherResultats(verifTableau);
  couleursFonction(verifTableau);
  verifTableau = [];
}  
function afficherResultats(tablCheck){

  const nbDeFautes = tablCheck.filter(el => el !== true).length;

  switch(nbDeFautes) {

    case 0:
        titreResultat.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`
        aideResultat.innerText = ''
        noteResultat.innerText = '6/6'
        break;
    case 1:
        titreResultat.innerText = `✨ Vous y êtes presque ! ✨`
        aideResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
        noteResultat.innerText = '5/6'
        break;
    case 2:
        titreResultat.innerText = `✨ Encore un effort ... 👀`
        aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
        noteResultat.innerText = '4/6'
        break;
    case 3:
        titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`
        aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
        noteResultat.innerText = '3/6'
        break;
    case 4:
        titreResultat.innerText = `😭 Peux mieux faire ! 😭`
        aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
        noteResultat.innerText = '2/6'
        break;
    case 5:
        titreResultat.innerText = `👎 Peux mieux faire ! 😭`
        aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
        noteResultat.innerText = '1/6'
        break;
    case 6:
        titreResultat.innerText = `👎 C'est tout faux ! 👎`
        aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
        noteResultat.innerText = '0/6'
    break;

    default:
        'Wops, cas innatendu.';

  }

}

function couleursFonction(tabValBool){

  for(let j = 0 ; j < tabValBool.length; j++){

    if (tabValBool[j] === true){
      toutesLesQuestions[j].style.background = 'lightgreen';
    } else{
      toutesLesQuestions[j].style.background = '#ffb8b8';
      toutesLesQuestions[j].classList.add('echec');

      setTimeout(() => {
        toutesLesQuestions[j].classList.remove('echec');
      }, 200)
    }
  }
}

// foreact = fonction qui permet d'excuter sur chaque elements d'un tableau
toutesLesQuestions.forEach(item =>{ // tout les blocks de question.forEach donc pour chaque item (item correspond ici à chauqe block de question)
  item.addEventListener('click', () =>{ //donc pour chaque block de question on est à l'écoute d'un évenement donc là au click 
    item.style.background = '#83c5be'; // et au chaque click d'un block on change le background
  })
})


