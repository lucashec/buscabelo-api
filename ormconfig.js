module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "logging": false,
   "entities": [process.env.ENTITIES_DEV],
   "migrations": [process.env.MIGRATIONS_DEV ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "migrationsDir": "src/database/migrations"
   }
}
