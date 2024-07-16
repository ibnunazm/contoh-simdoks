import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:@localhost:3306', {
  dialect: 'mysql',
});

export const createDatabase = async () => {
  try {
    const [results] = await sequelize.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'simdoks'");
    
    if (results.length === 0) {
      await sequelize.query('CREATE DATABASE simdoks');
      console.log('Database "simdoks" created successfully.');
    }
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await sequelize.close();
  }
};
