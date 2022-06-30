# Payment Documentation

## Endpoints:

list of available endpoints :

-   `POST /register`
-   `POST /login`
-   `GET /account/info`
-   `GET /account/balance`
-   `PATCH /account/topup`
-   `GET /payment`
-   `GET /payment/history`
-   `GET /payment/:billerid`
-   `POST /Payment/:billerid`
-   `PUT /payment/:paymentid`

## POST /register

desc: registering a new account with creating new wallet

-body `x-www-form-urlencoded`
`body`
```json
{
    "username" : "string",
    "email" : "string",
    "password" : "string",
    "phoneNumber" : "string"
}

```

condition when you success registering your account :

_Response (201 - Created)_

```json
{
    "status": 201,
    "message": "your account has been created",
    "username": "username",
    "email": "email",
    "phoneNumber": "phoneNumber"
}
```

condition when body is empty :

_Response (400 - Bad Request)_

```json
    {
        "code": 400,
        "status": "BAD REQUEST",
        "message": "something is required"
    }
```

&nbsp;

## POST /login

desc : after created a new account you can login and can get some benefit from this API after you log in.

-body: `x-www-form-urlencoded`
`body`

```json
    {
        "email": "email@email.com",
        "password": "secret"
    }
```

condition when you success loggin in an account: 

_Response (200 - ok)_

```json
{
    "access_token": "token",
    "id": 1,
    "email": "testing@mail.com"
}
```

_Response (401 - Unauthorized)_

condition if email or password incorrect:

```json
{
    "code": 401,
    "status": "INVALID",
    "message": "ERROR Invalid email or password"
}
```

&nbsp;

## GET /account/info

desc : after you logged in you can see your profile detail with this endpoint.

_Response (200 - OK)_

```json
{
    "code": 200,
    "status": "success",
    "message": "",
    "id": "integer",
    "username": "username",
    "email": "email@email"
    "phoneNumber": "phoneNumber"
}
```

_Response (401 - Unauthorized)_

condition: when you don't put access_token at req.headers and want to hit this endpoint.

```json
{
    "code" : 401,
    "status": "UNAUTHORIZED",
    "message": "invalid token"
}
```

&nbsp;

## GET /account/balance

desc: an endpoint to see users account balance.

_Response (200 - OK)_

```json
{
    "code": 200,
    "status": "success",
    "message": "",
    "data": "number"
}
```

## POST /account/topup

desc: topup your Wallet balance.

-body: `x-www-form-urlencoded`
`body`

```json
    {
        "balance": "Number"
    }
```

_Response (200 - OK)_

```json
{
    "code": 200,
    "status": "success",
    "message": "",
    "data": "xendit URL"
}
```

&nbsp;

## GET /payment

desc: a list of transactions that can be purchased.

_Response (200 - OK)_

```json
{
    "code": 200,
    "status":"success",
    "message": "",
    "data": [
        {
            "id": 1,
            "category": "Listrik",
            "product": "PLN Token",
            "description": "Token 50000",
            "price": 50000,
            "fee": 2000
        },
        ....
    ]
}
```

&nbsp;

## GET /payment/:id

desc: detail of transactions list that can be purchased.

_Response (200 - OK)_

```json
{
    "code": 200,
    "status":"success",
    "message": "",
    "data":
        {
            "id": 1,
            "category": "Listrik",
            "product": "PLN Token",
            "description": "Token 50000",
            "price": 50000,
            "fee": 2000
        }
}
```

&nbsp;

## POST /payment/:id

desc: create transactions and ready to purchase.

_Response (201 - CREATED)_

```json
{
    "code": 200,
    "status":"success",
    "message": "",
    "data":
        {
            "id": 1,
            "UserId": "id",
            "BillerId": "id"
        }
}
```

&nbsp;

## PUT /payment/:id

desc: confirm your transactions and pay to purchase item.

_Response (200 - OK)_

```json
{
    "code": 200,
    "status": "success",
    "message": "your payment has been updated"
}
```

## GET /payment/history

desc: read all users transactions history.

_Response (200 - OK)_

```json
{
    "code": 200,
    "status": "success",
    "message": "",
    "data": [
        {
            "isPaid": "id",
            "Biller": {
                "category": "string",
                "product": "string",
                "price": "number",
                "fee": "number",
                "totalPay": "number"
            }
        }
    ]
}
```