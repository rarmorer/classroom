const {Pool} = require('pg');
const connectionString = ''

const pool = new Pool({
    connectionString: connectionString
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback)
    }
};