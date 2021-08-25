module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "ssl": true,
   "entities": ["src/app/models/*.js"],
   "logging": false,
   "migrations": ["src/database/migrations/*.js"],
   "cli": {
      "migrationsDir": "src/database/migrations"
   },
   "extra": {
      "ssl": {
         rejectUnauthorized: false,
      }
   }
}
