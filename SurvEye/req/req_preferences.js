//=========================================================================
// Traitement du cas "supprimer question"
// Auteur : Robin
// Version : 14/12/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {
	var page;
	var contenu_fichier;
	var marqueurs;

	page = fs.readFileSync("./res/res_preferences.html", "UTF-8");
	
	marqueurs = {};
	marqueurs.id = query.id;
	marqueurs.erreur = "";
	
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
