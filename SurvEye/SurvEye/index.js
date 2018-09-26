//=========================================================================
// Site WEB de SurvEye
// Auteur : Groupe SurvEye
// Version : 29/11/2017
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req/req_commencer.js");
var req_afficher_formulaire_inscription = require("./req/req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req/req_inscrire.js");
var req_identifier = require("./req/req_identifier.js");
var req_consulter_sondages = require("./req/req_consulter_sondages.js");
var acceder = require("./req/acceder.js");
var req_creer_un_sondage = require("./req/req_creer_un_sondage.js");
var fermer = require("./req/fermer.js");
var ouvrir = require("./req/ouvrir.js");
var del = require("./req/delete.js");
var confirm_del = require("./req/req_confirm_delete.js");
var req_static = require("./req/req_static.js");
var req_erreur = require("./req/req_erreur.js");
var req_ajouter_une_question = require("./req/req_ajouter_une_question.js");
var req_confirmer_creation_sondage = require("./req/req_confirmer_creation_sondage.js");
var req_retour_accueil_membre = require("./req/req_retour_accueil_membre.js");
var req_valider_reponse = require("./req/req_valider_reponse.js");
var valider = require("./req/valider.js");
var req_valider_sondage = require("./req/req_valider_sondage.js");
var req_deconnexion = require("./req/req_deconnexion.js");
var req_historique = require("./req/req_historique.js");
var supprimer = require("./req/supprimer.js");
var req_editer_sondage = require("./req/req_editer_sondage.js");
var req_preferences = require("./req/req_preferences.js");
var req_nouveau_mdp = require("./req/req_nouveau_mdp.js");
var req_retour_creation_sondage = require("./req/req_retour_creation_sondage.js");
var voir_url = require("./req/req_url.js");
var req_retour_accueil = require("./req/req_retour_accueil.js");


//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

	var ressource;
	var requete;
	var pathname;;
	var query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_consulter_sondages':
				req_consulter_sondages(req,res,query);
				break;
			case '/req_traiter_sondage' :
				if (query.bouton === "Accueil") {
					req_retour_accueil_membre(req, res, query);
				}else if(query.bouton === "Voir") {
					acceder(req, res, query);
				}else if(query.bouton === "Fermer") {
					fermer(req, res, query);
				}else if(query.bouton === "Ouvrir") {
					ouvrir(req, res, query);
				}else if(query.bouton === "Supprimer") {
					del(req, res, query);
				}else if(query.bouton === "URL") {
					voir_url(req, res, query);
				}
				break;
			case '/req_editer_sondage' :
				if(query.p === "Valider") {
					valider(req,res,query);
				}else if (query.p === "Supprimer") {
					supprimer(req, res, query);
				}else if (query.p === "Valider sondage") {
					req_valider_sondage(req, res, query);
				}
				break;
			case '/req_confirmer_creation_sondage' :
				req_confirmer_creation_sondage(req, res, query);
				break;
			case '/req_historique' :
				req_historique(req, res, query);
				break;
			case '/req_confirm_delete' :
				confirm_del(req, res, query);
				break;
			case '/req_creer_un_sondage':
				req_creer_un_sondage(req, res, query);
				break;
			case '/req_valider_reponse' :
				req_valider_reponse(req,res,query);
				break;
			case '/req_ajouter_une_question':
				req_ajouter_une_question(req, res, query);
				break;
			case'/req_retour_accueil_membre':
				req_retour_accueil_membre(req, res, query);
				break;
			case '/req_deconnexion':
				req_deconnexion(req, res, query);
				break;
			case '/req_preferences':
				req_preferences(req, res, query);
				break;
			case '/req_nouveau_mdp':
				req_nouveau_mdp(req, res, query);
				break;
			case '/req_retour_creation_sondage':
				req_retour_creation_sondage(req, res, query);
				break;
			case '/req_retour_accueil':
				req_retour_accueil(req, res, query);
				break;
			default:
				req_static(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = process.argv[2];
console.log("En écoute sur " + port);
mon_serveur.listen(port);
