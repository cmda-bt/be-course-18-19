# transfer

> Learn HTTP interactively.

![](screenshot.png)

**transfer**(1) is an interactive tutorial that learns you HTTP.

It runs in Node and is installed with npm.
You’re expected to talk to it with Curl.

It mocks a movie API, but you discover that while walking through the tutorial
and interacting with it over HTTP.

The tutorial covers:

*   HTTP methods: OPTIONS, HEAD, GET, POST, PUT, PATCH, and DELETE
*   HTTP statuses: 200 OK, 201 Created, 204 No Content, 400 Bad Request,
    404 Not Found, 401 Unauthorized, 405 Method Not Allowed, 410 Gone, and
    422 Unprocessable Entity
*   HTTP headers: Accept and Content-Type, Accept-Encoding and Content-Encoding,
    and Authorization

## Install

[npm][]:

```bash
npm install cmda-be/transfer --global
```

## Usage

Run `transfer` in a terminal like so:

```bash
transfer
# TUTORIAL
#
# Hi! 👋 Welcome to the transfer tutorial!
#
# I just started a server for you.  It is an API for movies.
# …
```

See also: `man 1 transfer`.

## Contents

1.   HTTP in the browser
1.   HTTP with Curl
1.   Curl’s verbose mode
1.   Options
1.   Method not allowed
1.   Head
1.   Bad request
1.   Unprocessable entity
1.   Post & Created
1.   Parameters
1.   Not found
1.   Put
1.   Patch
1.   Delete & No content
1.   Gone
1.   Accept
1.   Accept-Encoding
1.   Unauthorized
1.   Authorized

## Summary

<details>
<summary>Spoilers ahead!</summary>

###### HTTP in the browser

```sh
> GET / # Browser
< 200 OK
```

###### HTTP with Curl

```sh
> GET / # Curl
< 200 OK
```

###### Curl’s verbose mode

```sh
--verbose
```

###### Options

```sh
> OPTIONS /
< 200 OK
```

###### Method not allowed

```sh
> DELETE /
< 405 Method Not Allowed
```

###### Head

```sh
> HEAD /
< 200 OK
```

###### Bad request

```sh
> POST /
< 400 Bad Request
```

###### Unprocessable entity

```sh
> POST /
>
> {}
< 422 Unprocessable Entity
```

###### Post & Created

```sh
> POST /
>
> {"title":"Wonder Woman"}
< 201 Created
```

###### Parameters

```sh
> OPTIONS /wonder-woman
< 200 OK
```

###### Not found

```sh
> HEAD /nonexistent-movie
< 404 Not Found
```

###### Put

```sh
> PUT /wonder-woman
>
> {"title":"Wonder Woman","plot":"Diana fights a war"}
< 200 OK
```

###### Patch

```sh
> PATCH /wonder-woman
>
> {"description":"Diana leaves home to fight a war."}
< 200 OK
```

###### Delete & No content

```sh
> DELETE /wonder-woman
< 204 No Content
```

###### Gone

```sh
> GET /wonder-woman
< 410 Gone
```

###### Accept

```sh
> GET / --header 'Accept: application/xml'
< 200 OK
< Content-Type: application/xml
```

###### Accept-Encoding

```sh
> GET / --header 'Accept-Encoding: gzip'
< 200 OK
< Content-Type: gzip
```

###### Unauthorized

```sh
> DELETE /evil-dead
< 401 Unauthorized
```

###### Authorized

```sh
> DELETE /evil-dead --header 'Authentication: token 123'
< 204 No Content
```

</details>

## License

[MIT][] © [Titus Wormer][author]

[npm]: https://docs.npmjs.com/cli/install
[mit]: license
[author]: http://wooorm.com
