var crypto = require('crypto')

module.exports = function (str) {
    return cyt(cyt(str).substr(11,7)+cyt(str))
}

function cyt(str) {
    const hash = crypto.createHash('md5');
    return hash.update(str).digest('base64')
}