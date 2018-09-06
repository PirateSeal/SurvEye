
//=========================================================================
// Traitement du cas "valider question"
// Auteur : R.LAGNY
// Version : 29/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var histo = function(req,res,query) {
	var page;
	var marqueurs;
	var contenu_fichier;
	var question;
	var reponses;
	var i;
	var answers;
	var compteur;
	var url = require("url");

	page = fs.readFileSync("res/res_creation_sondage.html", "utf-8");

	contenu_fichier = fs.readFileSync("./json/"+query.id+"t.json", 'utf-8');
	contenu_fichier = JSON.parse(contenu_fichier);

	marqueurs = {};
	marqueurs.id = query.id;
	question = query.q;
	reponses = [];
	marqueurs.erreurQ = "";
	marqueurs.erreurR = "";
	compteur = 0;
	marqueurs.histo = "";

	for(i = 0; i < 10; i ++) {
		if(query[String(i)] !== "") {
			reponses.push(query[String(i)]);
			compteur++
		}
	}

	if(query.q === "") {
		marqueurs.erreurQ = "La question est vide !";
		marqueurs.question = "Question "+(contenu_fichier.questions.length+1);
		marqueurs.indice = Number(query.numero)
	} else if(compteur < 2) {
		marqueurs.erreurR = "Vous devez mettre au minimum 2 réponses";
		marqueurs.question = "Question "+(contenu_fichier.questions.length+1);
		marqueurs.indice = Number(query.numero)
	} else {
		marqueurs.indice = Number(query.numero)+1;
		if(contenu_fichier.questions[query.numero] !== "") {
			contenu_fichier.questions[query.numero] = question;
			contenu_fichier.reponses[query.numero] = reponses;
		}else {
			contenu_fichier.questions.push(question);
			contenu_fichier.reponses.push(reponses);
			contenu_fichier.answers.push([]);
		}
		answers = [];
		for(i = 0; i<10; i++) {
			if(query[String(i)] !== "") {
				answers.push(0);
			}
		}
		contenu_fichier.answers[query.numero] = answers;
		marqueurs.question = "Question "+(contenu_fichier.questions.length+1);
	}
	marqueurs.suppress = "";
	marqueurs.q = "";
	for(i = 0; i < 10; i++) {
		marqueurs[String(i)] = "";
	}
	for(i = 0; i < contenu_fichier.questions.length; i++) {
		marqueurs.histo += "<a href='/req_historique?question="+i+"&id="+query.id+"'>Question "+(i+1)+" : "+contenu_fichier.questions[i]+"</a><br>";
	}
	
	contenu_fichier = JSON.stringify(contenu_fichier);
	fs.writeFileSync("./json/"+query.id+"t.json", contenu_fichier, "utf-8");

	marqueurs.script = '<button class="btn navbar-btn" id="opener">Historique</button> ';
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
}
module.exports = histo;
