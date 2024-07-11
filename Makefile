postgres: 
	docker run --name postgres12 -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=quickServe -d postgres

createdb: 
	docker exec -it postgres12 createdb --username=root --owner=root quick_serve

dropdb: 
	docker exec -it postgres12 dropdb --username=root --owner=root quick_serve

createtable:
	npx sequelize-cli db:migrate

droptable:
	npx sequelize-cli db:migrate:undo

.PHONY: postgres createdb dropdb createtable droptable