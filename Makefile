setup:
	npm install
	npm run build
	npx knex migrate:latest

db-migrate:
	npx knex migrate:latest

test:
	npm test