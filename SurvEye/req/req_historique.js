//Traitement de la modification d'une question
//Version 6/12/17 15h36
//Auteur Olivier

"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {

	var page;
	var marqueurs;
	var i;
	var contenu_fichier;

	marqueurs = {};	
	page = fs.readFileSync("./res/res_creation_sondage.html","utf-8");
	
	contenu_fichier = fs.readFileSync("./json/"+query.id+"t.json","utf-8");
	contenu_fichier = JSON.parse(contenu_fichier);
	marqueurs.question = "Question "+(Number(query.question)+1);
	marqueurs.histo = "";
	marqueurs.erreurQ = "";
	marqueurs.erreurR = "";
	marqueurs.id = query.id;
	marqueurs.q = contenu_fichier.questions[query.question];
	marqueurs.indice = query.question;

	//on rempli les champs
	i = 0;
	do {
		if(contenu_fichier.reponses[query.question][i] !== "") {
			marqueurs[String(i)] = contenu_fichier.reponses[query.question][i];
			i++;
		}
	}while(i < 10 && i < contenu_fichier.reponses[query.question].length);
	do {
		marqueurs[String(i)] = "";
		i++;
	}while(i < 10);
	for(i = 0; i < contenu_fichier.questions.length; i++) {
		marqueurs.histo += "<a href='/req_historique?question="+i+"&id="+query.id+"'>Question "+(i+1)+" : "+contenu_fichier.questions[i]+"</a><br>";
	}
	marqueurs.script = '<button class="btn navbar-btn" id="opener">Historique</button> ';
	marqueurs.suppress = "<input class='btn btn-outline-warning' type='submit' name='p' value='Supprimer'>";
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {"Content-Type" : "text/html"});
	res.write(page);
	res.end();
}
module.exports = trait;
	
