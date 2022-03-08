 const joursSemaine = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

 let ajd = new Date();
 let options = {weekday:'long'};
 let jourActuel = ajd.toLocaleDateString('fr-FR', options);
 //console.log(jourActuel,ajd);

 jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);
 // mardi = .charAt renvoi une lettre donc la m + .toUpperCase en maj donc M 
 // + .slice le reste du mot donc 'ardi' 


 //On demande à afficher le tableau dans l'ordre du jours actuel (nous ajd mardi, on demande a notre tableau de commencer mardi et lundi a la fin)
 // tabJoursEnOrdre= tableau.slice'slice permet de couper le tableau et de renvoyer le nouveau'
 //tableau.slice(il faut un 'début' et une 'fin' )
 let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
 //console.log(tabJoursEnOrdre);

 export default tabJoursEnOrdre;