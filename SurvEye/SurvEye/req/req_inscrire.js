//=========================================================================
// Traitement de "req_inscrire"
// Auteur : Thomas
// Version : 29/11/2017
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var id;
	var password;
	var confirm;													//VARIABLE_VERIFICATION_MDP
	var registered;													//VARIABLE_CONFIRMATION_INSCRIPTION
	var page;
	var contenu_fichier;
	var nouveauMembre;
	var listeMembres;
	var i;
	var trouve;
	var profils;
	var listeProfils; 
	var nouveauProfil;

	contenu_fichier = fs.readFileSync("json/membres.json", 'utf-8');     // LECTURE
	listeMembres = JSON.parse(contenu_fichier);
	profils = fs.readFileSync("json/profils.json",'utf-8');
	listeProfils = JSON.parse(profils);
	
	marqueurs = {};
	marqueurs.sondage = query.sondage;

	if(query.id === "") {
		page = fs.readFileSync('res/modele_formulaire_inscription.html', 'utf-8');
		marqueurs.erreur = "Le pseudo est vide !";	
		marqueurs.id = query.id;
		page = page.supplant(marqueurs);
	} else if (query.id.length < 3) {
		page = fs.readFileSync('res/modele_formulaire_inscription.html', 'utf-8');
		marqueurs.erreur = "Le pseudo doit avoir au moins 3 caractères !";
		marqueurs.id = "";
		page = page.supplant(marqueurs);
	} else if (query.password === "") {
		page = fs.readFileSync('res/modele_formulaire_inscription.html', 'utf-8');
		marqueurs.erreur = "le mot de passe est vide !";
		marqueurs.id = query.id;
		page = page.supplant(marqueurs);
	} else {

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {				//VERIFICATION
		if(listeMembres[i].id === query.id) {
			trouve = true;
		}
		i++;
	}


	registered = false;
	if(trouve === false) {											//SI PAS DE COMPTE CREATION COMPTE ET PROFIL
		
		if (query.password === query.confirm) {
			nouveauMembre = {};
			nouveauProfil = {};

			nouveauMembre.id = query.id;
			nouveauMembre.password = query.password;

			nouveauProfil.id = query.id;
			nouveauProfil.sondageuser = [];
			nouveauProfil.sondageguest = [];

			listeMembres[listeMembres.length] = nouveauMembre;
			listeProfils[listeProfils.length] = nouveauProfil;

			registered = true;

			contenu_fichier = JSON.stringify(listeMembres);		
			fs.writeFileSync("json/membres.json", contenu_fichier, 'utf-8');

			profils = JSON.stringify(listeProfils);
			fs.writeFileSync("json/profils.json",profils,'utf-8');

		} else if (query.password !== query.confirm) {				//CONFIRMATION PW INVALIDE
			page = fs.readFileSync('res/modele_formulaire_inscription.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : confirmation invalide !";
			marqueurs.id = query.id;
			page = page.supplant(marqueurs);
		} 
		
	} else if (trouve === true) {									//COMPTE DEJA EXISTANT
		
			page = fs.readFileSync('res/modele_formulaire_inscription.html', 'utf-8');

			marqueurs = {};
			marqueurs.id = query.id;
			marqueurs.erreur = "ERREUR : ce compte existe déjà";
			page = page.supplant(marqueurs);
	} 

	if (registered === true) {

		page = fs.readFileSync('res/modele_confirmation_inscription.html', 'UTF-8');

		marqueurs = {};
		marqueurs.id = query.id;
		marqueurs.password = query.password;
		page = page.supplant(marqueurs);
	}
}
	if(query.acces === "invite") {
	    marqueurs.hidden ="<input type='hidden' name=sondage value={sondage}><input type=hidden name=acces value=invite>";
		marqueurs.sondage = query.sondage;
		marqueurs.id = query.id;
		page = page.supplant(marqueurs);
	}else {
		marqueurs.hidden ="";
	}

	page = page.supplant(marqueurs);
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
