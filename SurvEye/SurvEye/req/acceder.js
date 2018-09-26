//=========================================================================
// Traitement du cas "acceder"
// Auteur : Olivier
// Version : 29/11/2017
//=========================================================================
"use strict"

var fs = require("fs");
require('remedial');

var trait = function(req,res,query) {

    var page;
    var marqueurs;
    var contenu_fichier;
    var trouve;
    var i;
    var x;
    var w;
    var nb_reponses;
	
	trouve = false;
	contenu_fichier = fs.readFileSync("json/liste.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);
	for(i = 0; i < contenu_fichier.length; i++) {
		if(query.sondage === contenu_fichier[i]) {
			trouve = true
		}
	}
	if(trouve === false) {
		page = fs.readFileSync("res/modele_accueil.html", "UTF-8");
		marqueurs = {};
		marqueurs.erreur = "Ce Sondage a été supprimé !"
		marqueurs.id = "";
		marqueurs.hidden = "";
	} else {
			
		contenu_fichier = fs.readFileSync("./json/"+query.sondage+".json", "utf-8");
		contenu_fichier = JSON.parse(contenu_fichier);

		if(query.acces === "invite") {
			page = fs.readFileSync('res/modele_accueil.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "Veuillez vous connecter ou vous inscrire pour répondre au sondage.";
			marqueurs.id = "";
			marqueurs.hidden = "<input type=hidden name=sondage value={sondage}><input type=hidden name=acces value=invite>"
			page = page.supplant(marqueurs);
			marqueurs.sondage = query.sondage;
			
		}else if(contenu_fichier.etat === "open") {

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
				marqueurs.hidden = ""
				marqueurs.results = "";
				nb_reponses = 0;
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
				page = page.supplant(marqueurs);
			
			}else if(trouve === false) {
				page = fs.readFileSync("./res/res_reponse_sondage.html", "utf-8");
				marqueurs = {};
				marqueurs.id = query.id;
				marqueurs.message = "";
				marqueurs.hidden = "<input type=hidden name=sondage value={sondage}><input type=hidden name=acces value=invite>"
				page = page.supplant(marqueurs);
				marqueurs.questions = "";
				marqueurs.sondage = query.sondage;
				for(i = 0; i < contenu_fichier.questions.length; i++) {
					marqueurs.questions += "<h2>Question "+(i+1)+" : "+contenu_fichier.questions[i]+"</h2><br>"
					for(x = 0; x < contenu_fichier.reponses[i].length; x++) {
						marqueurs.questions += "<input type='radio' name='q"+i+"' value='"+x+"'>"+contenu_fichier.reponses[i][x]+"<br>"
					}
				}
			}
		}else if(contenu_fichier.etat === "closed") {
			page = fs.readFileSync("./res/res_resultats_sondages.html", "utf-8");
			marqueurs = {};
			marqueurs.id = query.id;
			marqueurs.hidden = ""
			page = page.supplant(marqueurs);
			marqueurs.sondage = query.sondage;
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
		}
	}
	page = page.supplant(marqueurs);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();

}
module.exports = trait;
