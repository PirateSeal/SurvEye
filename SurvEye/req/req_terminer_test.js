//=========================================================================
// Traitement de "req_terminer_test"
// Auteur : Robin
// Version : 29/11/17
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var terminer = function (req, res, query) {

	var marqueurs;
	var page;

/*
Affichage page création de sondage de accueil membre 
*/
	page = fs.readFileSync('res/res_creation_sondage.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.id = query.id;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = terminer;
