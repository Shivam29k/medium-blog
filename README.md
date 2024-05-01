# Intialization 

## Backend

```
npm install

npx prisma migrate dev --name init_schema

npx prisma generate --no-engine

npm run dev
```

```
npm run deploy
```


#### ./.env
```
DATABASE_URL="prostgres connection string"
```


#### ./wrangler.toml
```
name = "backend"
compatibility_date = "2023-12-01"


[vars]

DATABASE_URL="prisma connection pool string"
JWT_SECRET="jwt secret key"
```

## frontend

```
npm install
npm run dev
``` 