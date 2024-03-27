## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## How to build and run Dockerfile

```bash
$ docker build -t web-board .
$ docker build -t mysql-web-board -f Dockerfile-db .

docker network create my-network
docker run -d --network my-network --name mysql-container mysql-web-board:latest
docker run -d --network my-network -p 3000:3000 --name nestjs-container web-board:latest

```