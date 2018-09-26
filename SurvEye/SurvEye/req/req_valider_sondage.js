//=========================================================================
// Traitement de "valider_sondage"
// Auteur : Robin
// Version : 06/12/2017
//=========================================================================

"use strict";

var fs = require("fs")
require('remedial');

var valider = function (req, res, query) {

    var marqueurs;
    var page;
	var compteur;
	var i;
	var contenu_fichier;
	var reponses;
	var question;
	var error;
	var liste_membres;

	liste_membres = fs.readFileSync("./json/membres.json","utf-8");
	liste_membres = JSON.parse(liste_membres);

	contenu_fichier = fs.readFileSync("./json/"+query.id+"t.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);
    
	marqueurs = {};
	reponses = [];
	marqueurs.id = query.id;
	question = query.q;
	marqueurs.erreur = "";
	marqueurs.inviter = "";
	
	for(i = 0; i < 15; i++) {
		marqueurs[String(i)] = "";
	}
	
	i = 0;
	compteur = 0;
	for(i = 0; i < 10; i ++) {
		if(query[String(i)] !== "") {
			reponses.push(query[String(i)]);
			compteur++
		}
	}

	if(query.q === "" || compteur < 2) {
		error = true
	}

	if(query.numero === "0" && error === true) {
		if(query.q === "") {
			page = fs.readFileSync("res/res_creation_sondage.html", "UTF-8");
			marqueurs.erreurQ = "La question est vide !";
			marqueurs.question = "Question "+(contenu_fichier.questions.length+1);
			marqueurs.erreurR = "";
			marqueurs.q = "";
			marqueurs.suppress = "";
			marqueurs.histo = "";
			marqueurs.indice = 0
			query.numero = Number(query.numero);
		}else if(compteur < 2) {
			page = fs.readFileSync("res/res_creation_sondage.html", "UTF-8");
			marqueurs.erreurR = "Vous devez mettre au minimum 2 réponses";
			marqueurs.question = "Question "+(contenu_fichier.questions.length+1);
			marqueurs.erreurQ = "";
			marqueurs.q = "";
			marqueurs.suppress = "";
			marqueurs.histo = "";
			marqueurs.indice = 0
			query.numero = Number(query.numero);
		}
	} else if(compteur === 0 && query.q === "") {
		page = fs.readFileSync('res/res_valider_sondage.html', 'UTF-8');
		contenu_fichier = JSON.stringify(contenu_fichier);
        fs.writeFileSync("./json/"+query.id+"t.json", contenu_fichier, "utf-8");
	} else {
    	page = fs.readFileSync('res/res_valider_sondage.html', 'UTF-8');
		contenu_fichier.questions.push(question);
		contenu_fichier.reponses.push(reponses);
		contenu_fichier.answers.push([]);
		
		i = 0;
		while(i < reponses.length) {
			if(query[String(i)] !== "") {
				contenu_fichier.answers[contenu_fichier.questions.length-1].push(0);
			}
			i++;
		}
		contenu_fichier = JSON.stringify(contenu_fichier);
		fs.writeFileSync("./json/"+query.id+"t.json", contenu_fichier, "utf-8");
	}

	marqueurs.inviter = "<p><h1> Voulez-vous inviter des membres du site à répondre à votre sondage ?</h1></p>"

	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].id !== query.id) {
			marqueurs.inviter += '<input type="checkbox" name="invitation" value="'+liste_membres[i].id+'">'+liste_membres[i].id+'<br>';
		}		
	}

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = valider;
