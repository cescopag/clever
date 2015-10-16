var request = require('request');
var cheerio = require('cheerio');
var colors = require('colors');
var clear = require('cli-clear');
var url_impianto = 'http://www.connetcontrolcenter.com/webview/include/pwrOutLabel.php?idPlant=685';

function measure() {
    clear();
    request( url_impianto, function( err, response, body ) {
        if (err) return console.log(err);
        $ = cheerio.load(body);
        var n = parseFloat($('body').html().trim());
        if (n>0) {
            bene(n);
        } else {
            male(n);
        }
        barra(n*8);
    });
}

function bene(n) {
    var out = n + ' kW';
    console.log('Produzione: ' + out.green.bold); 
}

function male(n) {
    var out = n + ' kW';
    console.log('Produzione: ' + out.red.bold); 
}

function barra(n) {
    var meno = "";
    for (var i=-20; i<0; i++) {
        if (i<n) {
            meno += "-";
        } else {
            meno += "#";
        }
    }
    var piu = "";
    for (var i=0; i<20; i++) {
        if (i>n) {
            piu += "-";
        } else {
            piu += "#";
        }
    }
    if (n < 0) {
        console.log(meno.red + "|" + piu);
    } else {
        console.log(meno + "|" + piu.green);    
    }
}

measure();
setInterval(measure, 10*1000);