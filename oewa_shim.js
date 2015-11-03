/**
Oewa 1 to 2.0 transition shim
**/

var use_version=2;

function loadJavaScriptSync(filePath)
{
    var req = new XMLHttpRequest();
    req.open("GET", filePath, false); // 'false': synchronous.
    req.send(null);
    var headElement = document.getElementsByTagName("head")[0];
    var newScriptElement = document.createElement("script");
    newScriptElement.type = "text/javascript";
    newScriptElement.text = req.responseText;
    headElement.appendChild(newScriptElement);
}




if(!oewa) {


	if(use_version == 2) {
		// this fires a deprecation warning in common new browsers, but it should be supported
		// to load sync xhr requests, atleast for a few years.
		// loads the http://dispatcher.oewabox.at/oewa.js - ensures that oewa.c() calls will work
		// *** NOTE ****
		// for demo use, oewa2 is loaded from local directory - as the dispatcher.oewabox.at does not support CORS

		loadJavaScriptSync("oewa2.js");
		console.log("USING 2.0 Lib");
	}  else {
		// no oewa lib found, and version 1 should be used
		// create the "oewa" object with ".c()" function, and fire an v1 pixel
		// this should work 1:1 as the old one, except that no-script is not supported anymore (but who cares)
		var oewa =  {
				c: function(obj) {
						var d = new Date();
						var OEWA_old="http://" + obj.s + ".oewabox.at/cgi-bin/ivw/CP" + obj.cp + "?" + d.getTime();
						console.log("FIRE 1.0 Pixel:" + OEWA_old);
						var i = new Image();
						i.src=OEWA_old;
				}
		}
	}

}
