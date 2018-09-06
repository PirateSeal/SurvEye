/* *
*
*
*
*
*/

"use strict";
var fs = require('fs');
var remedial = require('remedial');

var inviter = function (req,res,query) {

    var page;
    var marqueurs;
    var membres;
    var i;

    page = fs.readFileSync("./res/res_invite.html","utf-8");
    
    membres = fs.readFileSync("./json/membres.json","utf-8");
    membres = JSON.parse(membres);
    marqueurs = {};
    marqueurs.membre = "";

    for (i = 0; i < membres.length; i++) {
        marqueurs.membre += '<input type="checkbox" name="'+membres[i].id+'" value="'+i+'">'+membres[i].id+'<br>';
    };

    page = page.supplant(marqueurs);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

module.exports = inviter;
