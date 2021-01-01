let assign = (target, source) => {
    let keys = Object.keys(target).reduce((keys, key) => { keys[key.toLowerCase()] = key; return keys; }, {});
    Object.keys(source).forEach(key => {
        try {
            if (!source[key])
                return;
            
            if (typeof source[key] === 'object' && !Array.isArray(source[key]))
                return assign(target[keys[key.toLowerCase()]], source[key]);
        
            if (keys[key.toLowerCase()]) {
                target[keys[key.toLowerCase()]] = source[key];
            }
        } catch (e) { console.log(key, !keys[key.toLowerCase()], e); }
    });
    return target;
}

module.exports = { 
    assign
}