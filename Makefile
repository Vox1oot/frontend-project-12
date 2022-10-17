install:
	npm ci

start-server:
	npx start-server

lint:
	make -C frontend lint

start-frontend:
	make -C frontend start

start:
	make start-server & make start-frontend