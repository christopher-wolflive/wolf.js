let assign = (target, source) => {
    try {
        let keys = Object.keys(target).reduce((keys, key) => { keys[key.toLowerCase()] = key; return keys; }, {});
        Object.keys(source).forEach(key => {
            try {
                if (typeof source[key] === 'object' && !Array.isArray(source[key]) && !Buffer.isBuffer(source[key]))
                    return assign(target[keys[key.toLowerCase()]], source[key]);
        
                target[keys[key.toLowerCase()] ?? key] = source[key];
            } catch { };
        });
        return target;
    } catch { }
}

module.exports = { 
    assign
}