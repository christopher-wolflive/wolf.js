const { AssignValues } = require('./Polyfill');

/**
 * See if an Entity is Cached in an Array
 * @param {any[]} cache 
 * @param {string} key 
 * @param {any} value 
 */
let entityInCache = (cache, key, value) => {
    let entity = cache.find(e => e[key] === value);

    return {
        [key.toLowerCase()]: value,
        cached: entity ? true : false,
        value: entity
    }
}

/**
 * See if an Entity is Cached in an Array
 * @param {any[]} cache
 * @param {string} key
 * @param {any[]} values
 */
let entitiesInCache = (cache, key, values) => {
    let cachedValues = cache.filter(t => values.includes(t[key])).map(t => t[key]);

    return values.map(t => {
        return {
            [key.toLowerCase()]: t,
            cached: cachedValues.includes(t),
            value: cache.find(x => x[key] === t)
        }
    });
}

/**
 * 
 * @param {any[]} cache 
 * @param {string} key 
 * @param {number} value 
 * @param {any} newValue 
 */
let updateValues = (cache, key, value, newValue) => {
    let item = entityInCache(cache, key, value);

    if (!item.cached)
        return false;
    
    let index = cache.indexOf(item.value);

    AssignValues(cache[index], newValue);

    return true;
}

module.exports = {
    entityInCache,
    entitiesInCache,
    updateValues
}