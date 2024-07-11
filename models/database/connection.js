// database/connection.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'root', 'quickServe', {
  dialect: 'postgres', // or 'sqlite', 'postgres', etc.
  // other options
});

export default sequelize;
