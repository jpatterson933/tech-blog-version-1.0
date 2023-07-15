const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3000;
const app = require('./app');

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`I can hear your thoughts now...on PORT: ${PORT}`));
});