const client = require('./client.js');

const createActiv_Rout = async (count) => {
  try {
    const { rows: [newlyCreatedActiv_Rout] } = await client.query(`
    INSERT INTO activities_routines (count)
    VALUES ('${count}')
    RETURNING *;
    `);
    return newlyCreatedActiv_Rout;
  } catch (err) {
    console.log(err);
  }
}

const getActiv_Rout = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM activities_routines;
    `);

    return rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createActiv_Rout,
  getActiv_Rout
}