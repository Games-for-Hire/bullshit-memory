const readCookie = function(key) {
    var value = "";
    if (document.cookie) {
        var start = document.cookie.indexOf("=") + 1;
        var end = document.cookie.indexOf(";");
        if (end == -1) {
            end = document.cookie.length;
        }
        value = document.cookie.substring(start, end);
    }
    return value;
}

// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
const setCookie = function (key, value) {
    var now = new Date();
    var expires = 1000 * 60 * 10;
    var expireDate = new Date(now.getTime() + expires);
    document.cookie = key + "=" + value + "; expires=" + expireDate.toGMTString() + "; path=/;SameSite=Strict;";
}

const clearCookie = function(key) {
    var now = new Date();
    var expires = 1000 * 60 * 10;
    var expireDate = new Date(now.getTime() - expires);
    document.cookie = key + "=; expires=" + expireDate.toGMTString() + "; path=/;SameSite=Strict;";
}

const mapValues = function(objectMap, callback) {
    for (const k in objectMap) {
        callback(k, objectMap[k]);
    }
}