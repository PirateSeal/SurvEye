//=========================================================================
// Traitement du cas "retour à la page de création du sondage"
// Auteur : Robin
// Version : 15/12/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {
    var page;
	var marqueurs;
	var contenu_fichier;
	var i;
	var contenu_fichier;

	marqueurs = {};
	page = fs.readFileSync("./res/res_creation_sondage.html","utf-8");

	contenu_fichier = fs.readFileSync("./json/"+query.id+"t.json","utf-8");
	contenu_fichier = JSON.parse(contenu_fichier);
	
	marqueurs.question = "Question "+contenu_fichier.questions.length;
	marqueurs.histo = "";
	marqueurs.erreurQ = "";
	marqueurs.erreurR = "";
	marqueurs.id = query.id;
	marqueurs.q = contenu_fichier.questions[contenu_fichier.questions.length-1];
	marqueurs.indice = ""
	
	//on rempli les champs
	i = 0;
	do {
		if(contenu_fichier.reponses[i] !== "") {
			marqueurs[String(i)] = contenu_fichier.reponses[contenu_fichier.questions.length-1][i];
			i++;
		}
	}while(i < 10 && i < contenu_fichier.reponses[contenu_fichier.questions.length-1].length);
	do {
		marqueurs[String(i)] = "";
		i++;
	}while(i < 10);
	for(i = 0; i < contenu_fichier.questions.length; i++) {
		marqueurs.histo += "<a href='/req_historique?question="+i+"&id="+query.id+"'>Question "+(i+1)+" : "+contenu_fichier.questions[i]+"</a><br>";
	}
	marqueurs.suppress = "<input type='submit' name='p' value='Supprimer'>";
	marqueurs.script = '<button id="opener">Historique</button> ';
	page = page.supplant(marqueurs);

	res.writeHead(200, {"Content-Type" : "text/html"});
	res.write(page);
	res.end();
}
module.exports = trait;

