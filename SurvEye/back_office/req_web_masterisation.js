/*=========================================================================
 
*/

"use strict";

var fs = require('fs');
var remedial = require('remedial');

var web_masterisation = function (req, res, query) {
    var marqueurs;
    var page;
    var sondages; //liste des sondages du site   
    var membres; // liste des membres du site
    var i;

    page = fs.readFileSync("./back_office/res_sondages_web_master.html", "utf-8");
    marqueurs = {};

    sondages = fs.readFileSync("./json/liste.json", "utf-8");
    sondages = JSON.parse(sondages);

    membres = fs.readFileSync("./json/membres.json", "utf-8");
    membres = JSON.parse(membres);

    for (i = 0; i < sondages.length; i++) {
        marqueurs.liste += "<option value="+sondages[i]+">"+sondages[i]+"</option>";
    }

    for (i = 0; i < membres.length; i++) {
        marqueurs.liste2 += "<option value="+membres[i]+">"+membres[i].id+"</option>";        
    }

    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(page);
    res.end();
};

module.exports = web_masterisation;
