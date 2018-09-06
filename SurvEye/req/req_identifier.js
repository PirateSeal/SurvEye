
//=========================================================================
// Traitement de "req_identifier"
// Auteur : Robin
// Version : 29/11/2017
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var connexion = function (req, res, query) {

	var marqueurs;
	var id;
	var password;
	var page;
	var membre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;
	var x;
	var nb_reponses;
	var chaine

	contenu_fichier = fs.readFileSync("json/membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);
/*
Recherche de l'ID du user
*/

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].id === query.id) {
			if(listeMembres[i].password === query.password) {
				trouve = true;
			}
		}
		i++;
	}
/*
Affichage dépendant du résultat de la recherche
*/
	if(trouve === false) {
	
		page = fs.readFileSync('res/modele_accueil.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.id = query.id;
		marqueurs.hidden = "";
		if(query.acces === "invite") {
			marqueurs.hidden = "<input type=hidden name=sondage value={sondage}><input type=hidden name=acces value=invite>"
			page = page.supplant(marqueurs);
			marqueurs.sondage = query.sondage;
		}
		page = page.supplant(marqueurs);
	
	} else if(query.acces === "invite") {
		contenu_fichier = fs.readFileSync('json/liste.json', 'UTF-8');
		contenu_fichier = JSON.parse(contenu_fichier);
		trouve = false
		for(i = 0; i < contenu_fichier.length; i++) {
			if(contenu_fichier[i] === query.sondage) {
				trouve = true
			}
		}
		if(trouve === false) {
			page = fs.readFileSync("./res/res_resultats_sondages.html", "utf-8");
			marqueurs = {};
			marqueurs.message = "Ce sondage a été supprimé"
			marqueurs.id = query.id
			marqueurs.hidden = "";
			marqueurs.results = "";
		}else if(trouve === true) {
	
	contenu_fichier = fs.readFileSync("./json/"+query.sondage+".json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);
	
	if(contenu_fichier.etat === "closed") {
	    page = fs.readFileSync("./res/res_resultats_sondages.html", "utf-8");
		
		marqueurs = {};
		marqueurs.id = query.id;
		marqueurs.hidden = ""
		marqueurs.message = "Ce sondage est fermé.";
		nb_reponses = 0;
		marqueurs.results = "";
		
		for(i = 0; i < contenu_fichier.answers.length; i++) {
			marqueurs.results += "<h2>"+contenu_fichier.questions[i]+"</h2><br>";
			for(x = 1; x < contenu_fichier.answers[i].length; x++) {
				if(contenu_fichier.answers[i][x] !== 0) {
					nb_reponses += contenu_fichier.answers[i][x];
				}
			}
			for(x = 0; x < contenu_fichier.answers[i].length; x++) {
				marqueurs.results += contenu_fichier.reponses[i][x]+"<img src='./css/barre_histo.PNG' style=' height : 20px; width : "+(contenu_fichier.answers[i][x]/nb_reponses)*100+"%' alt="+(contenu_fichier.answers[i][x]/nb_reponses)*100+"%><br>";
			}
		}
	} else {
		marqueurs = {};
		marqueurs.id = query.id;
		marqueurs.queddstions = "";
		marqueurs.message = "";
		marqueurs.hidden = "<input type=hidden name=sondage value={sondage}><input type=hidden name=acces value=invite>"
		
		contenu_fichier = fs.readFileSync("./json/"+query.sondage+".json", "UTF-8");
		contenu_fichier = JSON.parse(contenu_fichier);

		i = 0;
		trouve = false;
		while(trouve === false && i < contenu_fichier.ids.length) {
			if(contenu_fichier.ids[i] === query.id) {
				trouve = true;
			}else {
			i++;
			}
		}
		
		if(trouve === true) {
			page = fs.readFileSync("./res/res_resultats_sondages.html", "utf-8");
			marqueurs = {};
			marqueurs.id = query.id;
			marqueurs.message = "Vous avez déjà répondu à ce sondage.";
			marqueurs.sondage = "";
			nb_reponses = 0;
			marqueurs.results = "";
			for(i = 0; i < contenu_fichier.answers.length; i++) {
				marqueurs.results += "<h2>"+contenu_fichier.questions[i]+"</h2><br>";
				for(x = 0; x < contenu_fichier.answers[i].length; x++) {
					if(contenu_fichier.answers[i][x] !== 0) {
						nb_reponses += contenu_fichier.answers[i][x];
					}
				}
				for(x = 0; x < contenu_fichier.answers[i].length; x++) {
				marqueurs.results += contenu_fichier.reponses[i][x]+"<img src='./css/barre_histo.PNG' style=' height : 20px; width : "+(contenu_fichier.answers[i][x]/nb_reponses)*100+"%' alt="+(contenu_fichier.answers[i][x]/nb_reponses)*100+"%><br>";
				}
			}
		
		} else if(trouve === false) {
			
			page = fs.readFileSync("./res/res_reponse_sondage.html", "utf-8");
			marqueurs.sondage = query.sondage;
			page = page.supplant(marqueurs);
			marqueurs.questions = "";
			for(i = 0; i < contenu_fichier.questions.length; i++) {
				marqueurs.questions += "<h2>Question "+(i+1)+" : "+contenu_fichier.questions[i]+"</h2><br>"
				for(x = 0; x < contenu_fichier.reponses[i].length; x++) {
					marqueurs.questions += "<input type='radio' name='q"+i+"' value='"+x+"'>"+contenu_fichier.reponses[i][x]+"<br>"
				}
			}

		contenu_fichier = fs.readFileSync("./json/profils.json", "UTF-8");
		contenu_fichier = JSON.parse(contenu_fichier);

		i = 0
		trouve = false
		while(trouve === false && i < contenu_fichier.length) {
			if(contenu_fichier[i].id === query.id) {
				contenu_fichier[i].sondageguest.push(query.sondage);
				console.log(true)
				trouve = true
			}else {
			console.log(contenu_fichier[i])
			console.log(contenu_fichier[i].sondageguest)
			i++
			}
		}
		
		contenu_fichier = JSON.stringify(contenu_fichier);
		fs.writeFileSync("json/profils.json", contenu_fichier, "UTF-8");
		}
		
	}
	}
	} else {
		page = fs.readFileSync('res/modele_accueil_membre.html', 'UTF-8');

		marqueurs = {};
		marqueurs.id = query.id;
		marqueurs.sondage = query.sondage;
	}
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = connexion;
