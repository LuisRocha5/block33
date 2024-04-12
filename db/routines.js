const client = require('./client.js');

const createRoutines = async (routinesName, is_public, goal) => {
  try {
    const { rows: [newlyCreatedRoutines] } = await client.query(`
    INSERT INTO routines (name, is_public, goal )
    VALUES ('${routinesName}, ${is_public}, ${goal}')
    RETURNING *;
    `);
    return newlyCreatedRoutines;
  } catch (err) {
    console.log(err);
  }
}

const getRoutines = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines;
    `);

    return rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createRoutines,
  getRoutines
}