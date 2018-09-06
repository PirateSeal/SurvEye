//=========================================================================
// Traitement du cas "supprimer question"
// Auteur : Robin
// Version : 05/12/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {
    var page;
	var marqueurs;
	var contenu_fichier;
	var i;

	page = fs.readFileSync("./res/res_creation_sondage.html", "UTF-8");

	contenu_fichier = fs.readFileSync("./json/"+query.id+"t.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);

	contenu_fichier.questions.splice(Number(query.numero), 1);
	contenu_fichier.reponses.splice(Number(query.numero), 1);
	contenu_fichier.answers.splice(Number(query.numero), 1);
	marqueurs = {};
	marqueurs.id = query.id;
	marqueurs.erreurQ = "";
	marqueurs.erreurR = "";
	console.log(contenu_fichier.questions.length);
	marqueurs.question = "Question "+Number(contenu_fichier.questions.length+1);

	//on rempli les champs
	if(contenu_fichier.questions[contenu_fichier.questions.length] === undefined) {
		marqueurs.q = "";
	}else {
		marqueurs.q = contenu_fichier.questions[contenu_fichier.questions.length];
	}

	i = 0;
	do {
		if(contenu_fichier.reponses.length[i] !== "" && contenu_fichier.reponses.length[i] !== undefined) {
			marqueurs[String(i)] = contenu_fichier.reponses.length[i];
			i++;
		}
	}while(i < 10 && i < contenu_fichier.reponses.length.length);
	do {
		marqueurs[String(i)] = "";
		i++;
	}while(i < 10);
	marqueurs.histo = "";
	for(i = 0; i < contenu_fichier.questions.length; i++) {
		marqueurs.histo += "<a href='/req_historique?question="+i+"&id="+query.id+"'>Question "+(i+1)+" : "+contenu_fichier.questions[i]+"</a><br>";
	}
	marqueurs.suppress = "";
	marqueurs.indice = contenu_fichier.questions.length;

	contenu_fichier = JSON.stringify(contenu_fichier);
	fs.writeFileSync("./json/"+query.id+"t.json", contenu_fichier, "utf-8");
	
	if(marqueurs.histo === "") {
		marqueurs.script = "";
	}else {
		marqueurs.script = '<button class="btn navbar-btn" id="opener">Historique</button> ';
	}
	page = page.supplant(marqueurs)
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
	
};

module.exports = trait;
