/**
 * Polyfill Wrapper Really
 */
module.exports = class IModel {
    static Assign = (target, source) => {
        let keys = Object.keys(target).reduce((keys, k) => { keys[k.toLowerCase()] = k; return keys }, {});
        Object.keys(source).forEach(key => target[keys[key.toLowerCase()] ?? key] = source[key]);
    }
}