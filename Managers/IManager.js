module.exports = class IManager {
    Entities;
    IdKey = '';

    /**
     * Create a new IManager with Entities
     * @param {any[]} entities 
     */
    constructor(entities = []) {
        this.Entities = entities;
    }

    /**
     * Add an Entity to the Entities Array
     * @param {...any} entity
     */
    AddEntities = (...entities) => this.Entities.push(...entities);

    /**
     * Get an Entity from the Entities Array
     * @param {number | string} id
     */
    GetEntity = (id) => this.Entities.find(t => t[this.IdKey] === id) ?? null;

    /**
     * Get multiple Entities from the Entities array
     * @param  {...string | number} ids
     */
    GetEntities = (...ids) => this.Entities.filter(t => ids.includes(t[this.IdKey]));

    FillValues = (entity, values) => {
        let keys = Object.keys(entity).reduce((keys, k) => { keys[k.toLowerCase()] = k; return keys }, {});
        Object.keys(values).forEach(key => entity[keys[key.toLowerCase()] ?? key] = values[key]);
        return entity;
    }

    /**
     * 
     * @param {number | string} id 
     * @param {} values 
     */
    UpdateEntity = (id, values) => {
        let entity = this.GetEntity(id);

        if (!entity)
            return null;
        
        let index = this.Entities.indexOf(entity);

        let keys = Object.keys(entity).reduce((keys, k) => { keys[k.toLowerCase()] = k; return keys; }, {});
        Object.keys(values).forEach(key => this.Entities[index][keys[key.toLowerCase()] ?? key] = values[key]);

        return this.Entities[index];
    }

    /**
     * Dump all cache (when login is called)
     * We can't trust what is in cache at this point
     */
    ClearEntities = () => {
        this.Entities = [];
    }
}