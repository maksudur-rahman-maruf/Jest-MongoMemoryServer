const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


describe('Single MongoMemoryServer', () => {
    let con = mongoose;
    let mongoServer = MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        con = await mongoose.connect(mongoServer.getUri(), { dbName: "verifyMASTER" });
        // con = await mongoose.connect('mongodb://127.0.0.1:27017', { dbName: "verifyMASTER" });  
        console.log(mongoServer.getUri());

    });

    afterAll(async () => {
        if (con) {
            await con.disconnect();
        }
        if (mongoServer) {
            await mongoServer.stop();
        }
    });

    it('should successfully set & get information from the database', async () => {


        const Note = require('../note.js').Note;
        const note = new Note({
            name: "My Mongo Memory Server Name",
            text: "My Mongo Memory Server Text"
        });
        await note.save();

        // const schema = new mongoose.Schema(
        //     {
        //         name: {
        //             type: String,
        //             required: true,
        //             unique: true,
        //         },
        //         text: {
        //             type: String,
        //             required: true,
        //         },
        //     }
        // );
        // const Model = mongoose.model('Test', schema);

        // const doc = new Model({
        //     name: "My Mongo Memory Server Name",
        //     text: "My Mongo Memory Server Text"
        // });
        // await doc.save();


        // console.log(con);
        const db = con.connections[0].db;
        // console.log(db);
        // console.log(con.connections[0].collections);


        // expect(db).toBeDefined();
        // const col = db.collection('test');
        // console.log(col);

        // const result = await col.insertMany([{ a: 1 }, { b: 1 }]);
        // expect(result.insertedCount).toStrictEqual(2);
        // expect(await col.countDocuments({})).toBe(2);
    });
});