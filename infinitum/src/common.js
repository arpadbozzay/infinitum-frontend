export function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function checkBasicField(cname, min, max) {
    return cname.length < min || cname.length > max ? true : false;
}

export function validateEmail(email) {
    if (email.length === 0) return true;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
}

export function validateNumber(nr, min, max) {
    if (!nr) return true;
    if (isNaN(nr)) return true;
    return parseInt(nr) < min || parseInt(nr) > max ? true : false;
}

export const errorBasicFieldMessage = "Field should be between 3 and 40 characters!";
export const errorVerificationFieldMessage = "Field should be 6 numbers!";
export const errorPasswordMatchMessage = "Passwords should mathch!";
export const errorEmailFieldMessage = "Field must be a valid email!";
export const errorValidNumber = "Field must be a valid number between 0 and 10.000.000!";