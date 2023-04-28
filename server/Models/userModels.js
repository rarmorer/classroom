const {Pool} = require('pg');

const pool = new Pool({
    connectionString: 'postgres://tyhubsii:YgukJpuBLT0PXJ4yTMcPcxWZ_eZEKOQl@suleiman.db.elephantsql.com/tyhubsii'
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback)
    }
};