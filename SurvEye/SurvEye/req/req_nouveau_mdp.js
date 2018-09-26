//=========================================================================
// Traitement du cas "changement de mot de passe"
// Auteur : Robin
// Version : 14/12/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {
    var page;
	var marqueurs;
	var contenu_fichier;
	var i;
	var trouve;
	
	marqueurs = {};
	marqueurs.id = query.id;
	marqueurs.erreur = "";

	if(query.mdp != query.mdp2) {
		page = fs.readFileSync("res/res_preferences.html", "UTF-8");
		
		marqueurs.erreur = "Les deux mot de passes entrés ne sont pas les mêmes.";
	
	} else if (query.mdp === "") {
		page = fs.readFileSync("res/res_preferences.html", "UTF-8");

		marqueurs.erreur = "Votre mot de passe est vide !";

	} else if (query.mdp === query.mdp2) {
		page = fs.readFileSync("res/res_confirm_action_sondage.html", "UTF-8");
		
		contenu_fichier = fs.readFileSync("json/membres.json", "UTF-8")
		contenu_fichier = JSON.parse(contenu_fichier);
		
		trouve = false;
		i = 0;
		while (i < contenu_fichier.length && trouve === false) {
			if(query.id === contenu_fichier[i].id) {
				contenu_fichier[i].password = query.mdp;
				trouve = true
			}
		i++
		}

		contenu_fichier = JSON.stringify(contenu_fichier);
		fs.writeFileSync("json/membres.json", contenu_fichier, "UTF-8");

		marqueurs.redirect = '<meta http-equiv="refresh" content="4; req_retour_accueil_membre?id='+query.id+'"/>';
		marqueurs.confirm = "Votre nouveau mot de passe est "+query.mdp+".";
		marqueurs.direction = "accueil membre";
	};
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
