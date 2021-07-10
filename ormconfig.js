module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "ssl": true,
   "entities": ["src/app/models/*.ts"],
   "migrations": ["src/database/migrations/*.ts"],
   "cli": {
      "migrationsDir": "src/database/migrations"
   },
   "extra": {
      "ssl": {
         rejectUnauthorized: false,
      }
   }
}
