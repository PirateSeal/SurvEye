/*===============================================================================================
Traitement du cas "fermer"
Auteur : Thomas
Version : 29/11/2017
===============================================================================================*/

"use strict"
var fs = require('fs');
var remedial = require("remedial");

var close = function (req,res,query) {
	var marqueurs;
	var page;
	var contenu_fichier;

/*===============================================================================================
Fermeture du sondage
===============================================================================================*/

	contenu_fichier = fs.readFileSync("./json/"+query.sondage+".json","utf-8");
	contenu_fichier = JSON.parse(contenu_fichier);
	contenu_fichier.etat = "closed";
	contenu_fichier = JSON.stringify(contenu_fichier);
	fs.writeFileSync("./json/"+query.sondage+".json",contenu_fichier,"utf-8");
	page = fs.readFileSync("./res/res_confirm_action_sondage.html","utf-8");

//===============================================================================================

	marqueurs = {};
	marqueurs.confirm = "Votre sondage "+query.sondage+" a bien été fermé";
	marqueurs.redirect = '<meta http-equiv="refresh" content="3; req_consulter_sondages?action=consulter&id='+query.id+'"/>';
	marqueurs.id = query.id;
	marqueurs.direction = "'Mes sondages'";

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = close;
