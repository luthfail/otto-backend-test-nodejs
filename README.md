# otto-backend-test-nodejs

## this api has been deployed at :
## https://otto-backend-nodejs.herokuapp.com/

## tech stack yang digunakan :

- `node.js`
- `express js`
- `bcryptjs`
- `dotenv`
- `postgresql`
- `sequelize orm`
- `jsonwebtoken`
- `xendit API`

## step jika ingin melakukan run di local :

jalankan npm i di terminal
ubah config/config json development :

username : username database
password : password database
host : localhost db

lalu jalankan command di terminal
`npx sequelize-cli db:create`
`npx sequelize-cli db:migrate`
`npx sequelize-cli db:seed:all`

buatlah .env sesuai env-example yang tertera
