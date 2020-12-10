/**
 * 
 * @param {any} target 
 * @param {any} source
 */
let AssignValues = (target, source) => {
    let keys = Object.keys(target).reduce((keys, k) => { keys[k.toLowerCase()] = k; return keys }, {});
    Object.keys(source).forEach(key => target[keys[key.toLowerCase()] ?? key] = source[key]);
}

module.exports = {
    AssignValues
}