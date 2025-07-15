import sql from 'mysql2'

const mydb= sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Samuel@2006#',
    database: 'countries'
})

mydb.connect(err=>{
    if(err){
        console.error('Database connection failed:', err);
        return;
    }
    return console.log('Connected to the database');
})

const db= sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Samuel@2006#',
    database: 'countries'
}).promise();

export async function getStateCode(country, state) {
    const newCountry=country.toLowerCase();
    const [getState]=await db.query(`SELECT state_code from ${newCountry} WHERE state=?`, [state]);
    if(getState.length===0) return {error:'State not found'};
    return getState[0]
}

export async function getAnsiReq(country, stateCode) {
        const newCountry=country.toLowerCase()
        const [getState]=await db.query(`SELECT *from ${newCountry} WHERE state_code=?`, [stateCode]);
        if(getState.lenght===0) return {error:'State not found'};
        return getState[0]
}

getStateCode('USA', 'California').then(res=>{
    console.log(res)
}).catch(err=>{
    console.error(err)
})

/*export async function getAnsiFormat(stateCode) {
    const [format]= await db.query('SELECT * FROM ansi_format WHERE state_code=?', [stateCode]);
    if(format.length===0) return {error:'State format not found'};
    return format
}*/