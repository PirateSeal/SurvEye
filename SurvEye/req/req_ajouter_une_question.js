//=========================================================================
// Traitement de "req_ajouter_une_question"
// Auteur : R.LAGNY
// Version : 29/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// AFFICHAGE DE LA PAGE AJOUTER UNE QUESTION

	page = fs.readFileSync('res/res_ajouter_une_question.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.id = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
