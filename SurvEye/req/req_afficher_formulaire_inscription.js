//=========================================================================
// Traitement de "req_afficher_formulaire_inscription"
// Auteur : Groupe SurvEye
// Version : 29/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// AFFICHAGE DE LA modele_formulaire_inscription

	page = fs.readFileSync('res/modele_formulaire_inscription.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.id = "";
	
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

//--------------------------------------------------------------------------

module.exports = trait;
