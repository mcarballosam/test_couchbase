// Know if object is empty.  This should work both there and elsewhere.
var isEmptyObject = function (obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
};

var uid = function (len) {
    var buf = []
            , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//lpad
var pad = function (str, len, pad, dir) {
    str = str.toString();
    //return str.length < max ? pad("0" + str, max) : str;
    //str_pad(string,length,pad_string,pad_type)
    //return str.length < max ? str_pad(str, max, "0") : str;

    var STR_PAD_LEFT = 1;
    var STR_PAD_RIGHT = 2;
    var STR_PAD_BOTH = 3;

    if (typeof (len) == "undefined") {
        var len = 4;
    }
    if (typeof (pad) == "undefined") {
        var pad = '0';
    }
    if (typeof (dir) == "undefined") {
        var dir = STR_PAD_RIGHT;
    }

    if (len + 1 >= str.length) {

        switch (dir) {
            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
                break;
            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
                break;
            default:
                str = str + Array(len + 1 - str.length).join(pad);
                break;
        }
    }
    return str;
};

var a1 = function (txt, literal) {
    if (!literal)
        txt = txt.toLowerCase();
    return txt.split('').map(function (c) {
        return 'abcdefghijklmnopqrstuvwxyz_@.-0123456789'.indexOf(c) + 1 || (literal ? c : '');
    }).join('');
};

var arrayUnique = function (array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

//unique strings for device numbers country+user.created+a1(user.username) mailbox_temp.substring(0, 29);
var generateDeviceNumber = function (user) {
    var username = a1(user.username);
    var temp = "" + user.country + user.created + username;
    var final = temp.substring(0, 29);
    return final;
};

//unique string for groupcall number
var generateGroupCallNumber = function (ownerExtension, groupCallTimestamp) {
    if(groupCallTimestamp == undefined || groupCallTimestamp == null || groupCallTimestamp === '')
        groupCallTimestamp = Date.now();
    
    var groupCallNumber = '' + 8800 + ownerExtension + groupCallTimestamp;
    return groupCallNumber;
};

//convert custom values
var convertValue = function (value, convertion) {
    var result;
    
    switch (convertion) {
        case 'duration_to_minutes':
            //convert hh:mm:ss to minutes
            var hours = 0;
            var minutes = 0;
            
            var time = value.split(':');
            
            if(time.length == 3){
                if(Number(time[0]) > 0)
                    hours = Number(time[0]) * 60;
                minutes = +time[1];
            }
            if(time.length == 2 && Number(time[0]) > 0)
                minutes = Number(time[0]);
            
            result = +hours + +minutes;
            break;
        default:
            result = value;
    }
    
    return result;
};

module.exports = {
    isEmptyObject: isEmptyObject,
    uid: uid,
    pad: pad,
    a1: a1,
    arrayUnique: arrayUnique,
    generateDeviceNumber: generateDeviceNumber,
    generateGroupCallNumber: generateGroupCallNumber,
    convertValue: convertValue
};