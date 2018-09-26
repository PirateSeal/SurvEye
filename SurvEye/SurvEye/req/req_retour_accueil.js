/*===============================================================================================
Traitement de : "req_retour_accueil"
Auteur : Robin
Version : 20/12/2017
===============================================================================================*/

"use strict"
var fs = require('fs');
require('remedial');

var retour = function (req, res, query) {
	var marqueurs;
	var page;
	var contenu_fichier;

	/*
	Affichage de la page d'accueil membre
	*/

	page = fs.readFileSync("res/modele_accueil.html", "utf-8");

	marqueurs = {};
	marqueurs.id = "";
	marqueurs.sondage = query.sondage;
	marqueurs.erreur = "";
	    if(query.acces === "invite") {
			marqueurs.hidden ="<input type='hidden' name=sondage value={sondage}><input type=hidden name=acces value=invite>";
			marqueurs.sondage = query.sondage;
			page = page.supplant(marqueurs);
		}else {
			marqueurs.hidden ="";
		}

	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = retour;
