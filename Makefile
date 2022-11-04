start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

lint:
	make -C frontend lint

install:
	make -C frontend install
