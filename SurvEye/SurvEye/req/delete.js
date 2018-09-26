/*===============================================================================================
confirmation de la suppression du sondage
Auteur : Thomas
Version : 29/11/2017
===============================================================================================*/

"use strict";
var fs = require('fs');
var remedial = require("remedial");

var del = function (req,res,query) {
	var marqueurs;
	var page;

	page = fs.readFileSync("./res/res_confirm_delete_sondage.html","utf-8");

	marqueurs = {};
	marqueurs.id = query.id;
	marqueurs.delete = " le sondage "+query.sondage
	marqueurs.sondage = query.sondage

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = del;
