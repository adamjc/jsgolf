const crypto = require('crypto');
const DEFAULT_HASH_SIZE = 256;

/* Returns a promise that will resolve to a hash */
function hash(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, DEFAULT_HASH_SIZE, 'sha256', (err, key) => {
            if (err) console.error('Error Hashing', err);
            resolve(key.toString('hex'));
        });
    });
}

function salt(byteSize) {
    this.byteSize = byteSize || DEFAULT_HASH_SIZE
    
    return crypto.randomBytes(this.byteSize);
}

module.exports = {
    hash,
    salt
};
