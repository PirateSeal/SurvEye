/*===============================================================================================
Traitement du cas "supprimer"
Auteur : Thomas
Version : 29/11/2017
===============================================================================================*/

"use strict"
var fs = require('fs');
var remedial = require("remedial");

var confirm_del = function (req,res,query) {
	var marqueurs;
	var page;
	var contenu_fichier;
	var i;
	var j;
	var k;
	var sondage = String(query.sondage);
	var trouve;
	var liste;
	var trouve_sondage;

/*===============================================================================================
Suppression du sondage
===============================================================================================*/
	
	contenu_fichier = fs.readFileSync("json/profils.json","utf-8");
	contenu_fichier = JSON.parse(contenu_fichier);

	liste = fs.readFileSync("json/liste.json");
	liste = JSON.parse(liste);

	page = fs.readFileSync("res/res_confirm_action_sondage.html","utf-8");
	marqueurs = {};

	trouve_sondage = false;

	if (query.delete === "oui") {
		
		i = 0;
		while (contenu_fichier[i].id !== query.id && i<contenu_fichier.length) {
			i++;
		}

		//Suppression du sondage chez le créateur dans ses sondages

		for (j = 0; j < contenu_fichier[i].sondageuser.length; j++) {
			if (query.sondage === contenu_fichier[i].sondageuser[j]) {
				contenu_fichier[i].sondageuser.splice(j, 1);
				trouve_sondage = true;
			}
		}

		if(trouve_sondage === true) {
			//Suppression du sondage chez tous les utilisateurs invités à ce sondage

			for (i = 0; i < contenu_fichier.length; i++) {				
				k = 0;
				trouve = false;
				while (trouve === false && k < contenu_fichier[i].sondageguest.length) {
					if (contenu_fichier[i].sondageguest[k] === query.sondage) {
						contenu_fichier[i].sondageguest.splice(k, 1);
						trouve = true;
					}else k++;
				}			
			}
	
		//Suppression du sondage de la liste des sondages

		for (i = 0; i < liste.length; i++) {						
			if (liste[i] === sondage) {
				liste.splice(i,1);
			}
		}

		fs.unlinkSync('json/'+query.sondage+'.json'); 						//Suppression du fichier "sondage".json

		contenu_fichier = JSON.stringify(contenu_fichier);
		fs.writeFileSync("./json/profils.json",contenu_fichier,"utf-8");

		liste = JSON.stringify(liste);
		fs.writeFileSync("./json/liste.json",liste,"utf-8");
		
		marqueurs.confirm = "Votre sondage "+sondage+" a bien été supprimé";

		} else if(trouve_sondage === false) {
				
			i = 0;
			while (contenu_fichier[i].id !== query.id && i<contenu_fichier.length) {
				i++;
			}
			k = 0;
			trouve = false;
			while (trouve === false && k < contenu_fichier[i].sondageguest.length) {
				if (contenu_fichier[i].sondageguest[k] === query.sondage) {
					contenu_fichier[i].sondageguest.splice(k, 1);
					console.log(contenu_fichier[i]);
					trouve = true;
				}else k++
			}
			contenu_fichier = JSON.stringify(contenu_fichier);
			fs.writeFileSync("./json/profils.json", contenu_fichier, "UTF-8");

			marqueurs.confirm = "Le sondage "+sondage+" a été supprimé de votre liste.";
		}
	
	}else if (query.delete === "non") {
		marqueurs.confirm = "Votre sondage "+sondage+" n'a pas été supprimé";
	}

//===============================================================================================

	marqueurs.sondage = query.sondage;
	marqueurs.id = query.id;
	marqueurs.redirect = '<meta http-equiv="refresh" content="3; req_consulter_sondages?action=consulter&id='+query.id+'"/>';
	marqueurs.direction = '"mes sondages"';
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//Bonjour c'est un test
module.exports = confirm_del;
