/**
 * Repply JS
 */

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var repply = function (text, config) {
    var default_data = [
        {
            text: ["HOLA", "OLA"],
            reply: ["Hola!"]
        },
        {
            text: ["HOLA COMO ESTAS", "HOLA QUE TAL"],
            reply: ["Hola! Yo muy bien, y tu?"]
        },
        {
            text: ["COMO ESTAS", "QUE TAL", "COMO VAS"],
            reply: ["Yo muy bien, y tu?"]
        },
        {
            text: ["BIEN", "IGUAL", "GENIAL", "FELIZ"],
            reply: ["Genial, me alegro por ti"]
        },
        {
            text: ["MAL", "TRISTE", "MASOMENOS"],
            reply: [":( bueno espero que pronto estes bien"]
        }
    ];
    if (config === void 0) {
        config = {
            data: null, default_data: true, error_message: "Lo siento, no puedo entender lo que tratas de decir"
        };
    }
    var data;
    config = {
        data: typeof config.data !== 'undefined' ? config.data : null,
        default_data: typeof config.default_data !== 'undefined' ? config.default_data : true,
        error_message: typeof config.error_message !== 'undefined' ? config.error_message : "Lo siento, no puedo entender lo que tratas de decir"
    };
    if (config.data != null && config.default_data) {
        data = __spreadArrays(default_data, config.data);
    }
    else if (config.data != null) {
        data = config.data;
    }
    else {
        data = default_data;
    }
    var fuseOptions = {
        includeScore: true,
        keys: ['text']
    };
    var fuse = new Fuse(data, fuseOptions);
    var result = fuse.search((text).toUpperCase());
    var scoreData = 0;
    var reply = null;
    result.forEach(function (res) {
        var score = parseFloat((res.score).toString().slice(0, 5));
        if (score > scoreData) {
            scoreData = score;
            var n = Math.floor(Math.random() * (res.item.reply).length);
            reply = res.item.reply[n];
        }
    });
    if (scoreData > 0.6) {
        return reply;
    }
    else {
        return config.error_message;
    }
};