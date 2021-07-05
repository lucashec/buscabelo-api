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
      "dist/app/models/*.js"
   ],
   "migrations": [
      "dist/database/migrations/*.js"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "migrationsDir": "src/database/migrations"
   }
}
