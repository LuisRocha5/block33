const client = require('./client.js');
const { createActivity } = require('./activity.js');
const { createRoutines } = require('./routines.js');

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS activities_routines;
      DROP TABLE IF EXISTS activity;
      DROP TABLE IF EXISTS routines;
    `);
    console.log('Tables dropped successfully');
  } catch (err) {
    console.error('Error dropping tables:', err);
  }
};

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE activity (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        description TEXT
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        is_public BOOLEAN,
        goal TEXT
      );

      CREATE TABLE activities_routines (
        id SERIAL PRIMARY KEY,
        activity_id INT REFERENCES activity(id),
        routines_id INT REFERENCES routines(id),
        count INT
      );

    
    `);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

const syncAndSeed = async () => {
    await client.connect();
    console.log('Connected to the database');

    await dropTables();
    console.log('Tables dropped');

    await createTables();
    console.log('Tables created');

    const Weightlifting = await createActivity('Weightlifting');
    const Swimming = await createActivity('Swimming');
    const Abductor = await createActivity('Abductor');
    const Laterial = await createActivity('Laterial');
    console.log('Activity created');

    const beginner =await createRoutines('beginner');
    const strength = await createRoutines('strength');
    const cardio = await createRoutines('cardio');
    const bodyweight = await createRoutines('bodyweight');
    console.log('Routines created');

    await client.end();
    console.log('Connection ended');
};

syncAndSeed();
