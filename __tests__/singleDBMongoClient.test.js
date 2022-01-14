const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');


describe('Single MongoMemoryServer', () => { 
    let con = MongoClient; // Alternative is 'mongoose' 
    let mongoServer = MongoMemoryServer; 

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        con = await MongoClient.connect(mongoServer.getUri(), {});  //{ dbName: "verifyMASTER" }
        //  con = await MongoClient.connect('mongodb://127.0.0.1:27017', {});  //{ dbName: "verifyMASTER" }
        // console.log(mongoServer.getUri());
    });

    afterAll(async () => {
        if (con) {
            await con.close();
        }
        if (mongoServer) {
            await mongoServer.stop();
        }
    });

    it('should successfully set & get information from the database', async () => {
        const db = con.db(mongoServer.instanceInfo.dbName);
        // console.log(db);

        expect(db).toBeDefined();
        const col = db.collection('test');
        // console.log(col);

        const result = await col.insertMany([{ a: 1 }, { b: 1 }]);
        expect(result.insertedCount).toStrictEqual(2);
        expect(await col.countDocuments({})).toBe(2);
    });
});