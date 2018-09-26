//=========================================================================
// Traitement du cas "trouver l'url du sondage"
// Auteur : Robin
// Version : 19/12/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {
    var page;
	var marqueurs;

	page = fs.readFileSync("./res/res_url.html", "UTF-8");

	marqueurs = {};
	marqueurs.id = query.id;
	marqueurs.url = "http://localhost:5000/req_traiter_sondage?&sondage="+query.sondage+"&bouton=Voir&acces=invite";
	
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
