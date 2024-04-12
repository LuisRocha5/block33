const client = require('./client.js');

const createActivity =async(activityName, activityDescription) => {
  try{
    const { rows: [ newlyCreatedActivity ] } = await client.query(`
    INSERT INTO activity (name, description)
    VALUES ('${activityName}, ${activityDescription}')
    RETURNING *;
    `);
    return newlyCreatedActivity;
  } catch(err){
    console.log(err);
  }
}

const getActivity = async() => {
  try{
    const { rows } = await client.query(`
    SELECT * FROM activity;
    `);

    return rows;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createActivity,
  getActivity
}