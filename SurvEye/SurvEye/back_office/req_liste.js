"use strict";

var fs = require("fs");
require("remedial");

var traite = function (req, res, query){

	var page;
	var marqueur;
	var contenu;
	var i;

	page = fs.readFileSync("./membres.html", "utf-8");
	marqueur = {};
	marqueur.membres = "";

	contenu = fs.readFileSync("../json/membres.json", "utf-8");
	contenu = JSON.parse(contenu);
	for(i=0; i < contenu.length; i++) {
		marqueur.membres+=contenu[i].id;
	}
	page = page.supplant(marqueur);

	res.writeHead(200, {"Content-Type" : "text/html"});
	res.write(page);
	res.end();
}

module.exports = traite;
