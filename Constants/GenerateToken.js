/**
 * 
 * @param {number} length 
 */
let GenerateToken = (length) => {
    let d = new Date().getTime();
    return 'WolfJs' + 'x'.repeat(length).replace(/[x]/gi, c => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

module.exports = { GenerateToken }