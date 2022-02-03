module.exports = {
  async up(db, client) {
    return await db.creationCollection('players', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [ 'userId', 'userName', 'score', 'chips', 'age'],
          properties: {
            userId: {
              bsonType: 'string',
            },
            userName: {
              bsonType: 'string',
            },
            score: {
              bsonType: 'number',
            },
            dailyProgress: {
              bsonType: 'array',
            },            
            chips: {
              bsonType: 'number',
            },
            age: {
              bsonType: 'number',
            },
          },
        },
      },
      validationLevel: 'strict',
      validationAction: 'error',
    })
  },

  async down(db, client) {
    return await db.collection('players').deleteMany({})
  }
};
