module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "ssl": true,
   "entities": [process.env.ROUTER_ENTITIES],
   "logging": false,
   "migrations": [process.env.ROUTER_MIGRATIONS],
   "cli": {
      "migrationsDir": "src/database/migrations"
   },
   "extra": {
      "ssl": {
         rejectUnauthorized: false,
      }
   }
}
