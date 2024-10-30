## Description

Working With Api Gallery.

## Documention

http://localhost:3000/api

### create file .env

```env
MONGODB =mongodb://localhost:27017/Gallery
PORT = 3000
SECRET_KEY = secret
```

### Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Users

The administrator is unable to register and enters manually!

Users can register by entering <b>http://localhost:3000/users/register</b> page(<mark>METHOD = POST</mark>)

```json
{
    "username" : "ali",
    "password" : "ahmadi@ali"
}
```

For Login http://localhost:3000/auth/login AND <mark>METHOD = POST</mark>

```json
{
    "username" : "ali",
    "password" : "ahmadi@ali"
}
```

After Login You Get Api For upload Photo, get all photos user and more

```json
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hc2VyIiwic3ViIjoiNjcxZWZjOTIzNmEzZmQ2ODVmZTY3YWVhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzAyMDI0ODMsImV4cCI6MTczMDIwOTY4M30.RY4lEz_FGiLEBA8CQXG1Gcjd-iFwhmNl4uF8OyBnvX0"
}
```

## Authentication
After logging in, you will get a token. and expire in 2h
Now you have to put that token in the Authorization tab of the <mark>Bearer Token</mark> type

### Photos
The user can upload the photo by entering the page http://localhost:3000/photos/upload and sending the desired information through from-data.

<mark>METHOD = POST</mark>

#### you can get ID Categories From http://localhost:3000/category <br>
 <mark>METHOD = GET</mark>

Example : 

```json
{
  "file":"Type file and upload",
  "title" : "sun",
  "description" : "i love sun",
  "categories" : "671ef49ccc0cc0bb42d3d9be"
}
```
<br>
Now , User can see all uploaded photos
http://localhost:3000/photos/my-photos  <br>
Method = GET 

###### Also, the user can see all the photos on the site (confirmed photos).<br>
<mark>METHOD = GET</mark> <br>
http://localhost:3000/photos 


