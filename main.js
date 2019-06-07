// all javascript files
//initial
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
}

var dispatchType = window.location.search;
//dispatch.js
document.write("<script language=javascript src=\"js/dispatch.js\"></script>");

if(dispatchType=="?first-fit"){
    document.write("<script language=javascript src=\"js/first-fit.js\"></script>");
}
else{
    document.write("<script language=javascript src=\"js/best-fit.js\"></script>");
}