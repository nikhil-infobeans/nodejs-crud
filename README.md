# nodejs-crud

# Setup

#### Step 1: clone git repo

```
git clone https://github.com/nikhil-infobeans/nodejs-crud.git
```
#### Step 2: Configure .env file

```
cp .dist.env .env
```
#### Step 3: Run npm install command

```
npm install
```
#### Step 4: Create database with the below database name

```
node-crud-app
```
#### Step 5: Run database migration

```
node node_modules/db-migrate/bin/db-migrate up
```
#### Step 6: Run application (Default port number is 5000)

```
npm start
```

# Docker Setup 
### Development

#### Step 1: clone git repo

```
git clone https://github.com/nikhil-infobeans/nodejs-crud.git
```

#### Step 2: Configure .env file

```
cp .dist.env .env
```

#### Step 3: Build and run docker container

```
docker-compose build
docker-compose up -d
```
#### Step 4: Run application (Port number is 5000 )

```
https://localhost:5000
```

Webhook test 10


