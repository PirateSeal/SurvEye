//=========================================================================
// Traitement de "req_commencer"
// Auteur : Groupe SurvEye
// Version : 29/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('res/modele_accueil.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.id = "";
	marqueurs.hidden = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
