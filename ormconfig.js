module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "extra": {
      "ssl": {
         rejectUnauthorized: false,
      }
   },
   "ssl": true,
   "entities": [
      "dist/src/app/models/*.js"
   ],
   "migrations": [
      "dist/src/database/migrations/*.js"
   ],
   "cli": {
      "migrationsDir": "src/database/migrations"
   }
}
