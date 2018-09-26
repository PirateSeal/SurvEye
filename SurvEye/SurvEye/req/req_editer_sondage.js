//////////////////////////
// Lance l'edition du sondage
// version 11/12/2017
// Auteur Olivier
//////////////////////////

"use strict"
 var fs = require("fs");
 require("remedial");

 var trait = function(req,res,query) {
     var i;
     var page;
     var marqueurs;
     var contenu_fichier;

    //initialisation des variables
    page = fs.readFileSync("./res/res_creation_sondage.html", "utf-8");
    contenu_fichier = fs.readFileSync("./"+query.sondage+".json","utf-8");
    contenu_fichier = JSON.parse(contenu_fichier);
    marqueurs = {};
    
    //remplissage de l'historique
    marqueurs.histo = "";
    for(i = 0; i < contenu_fichier.questions.length; i++) {
        marqueurs.histo += '<a href ="req_historique?question='+i+'&id='+query.id+'">'+"Question "+(i+1)+" : "+(contenu_fichier.questions[i])+'</a> <br>';
    }

    //remplissage des champs
    i=0;
    marqueurs.q = contenu_fichier.questions[0];
    do {
		if(contenu_fichier.reponses[query.question][i] !== "") {
			console.log(contenu_fichier.reponses[query.question][i]);
			marqueurs[String(i)] = contenu_fichier.reponses[query.question][i];
			i++;
		}
	}while(i < 10 && i < contenu_fichier.reponses[query.question].length);
	do {
		marqueurs[String(i)] = "";
		i++;
    }while(i < 10);
    
    //initialisation des marqueurs
    marqueurs.erreurR = "";
    marqueurs.erreurQ = "";
    marqueurs.question = "Question 1";
    
    page = page.supplant(marqueurs);

    page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
 }
 module.exports = trait;
