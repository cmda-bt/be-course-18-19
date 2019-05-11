# Week 2

> Roses are red\
> Violets are blue\
> Unexpected `{` on line 32
>
> — [@kvlly](https://twitter.com/kvlly/status/959827106384490496)

## Table of Contents

*   [Inspiration](#inspiration)
*   [Comic](#comic)
*   [Slides](#slides)
*   [Assignments](#assignments)
*   [Homework](#homework)

## Inspiration

[![][inspiration-cover]][inspiration-link]

> HTTP cat by [**@girlie_mac**][inspiration-author].

## Comic

[![][comic-cover]][comic-link]

> Compiling by [**@xkcd**][comic-author].

## Slides
*   [**Lecture-2**][slides-lecture]
*   [**Lab-2**][slides-lab]

### Theory
* [_How to use or execute a package installed using npm_](https://nodejs.dev/how-to-use-or-execute-a-package-installed-using-npm)
* [_npm global or local packages_](https://nodejs.dev/npm-global-or-local-packages)

## Assignments

### Transfer (practice)

[![][transfer-cover]][transfer-cover-source]

> Downtown & Brooklyn by [**@trapnation**][transfer-cover-author].

In this assignment you’ll learn the basics of HTTP.

#### Synopsis

*   **Practice**
*   **Time**: 1:00h
*   **Goals**: subgoal 7
*   **Due**: before [lab 3][w3lab]

#### Tips

*   [`httpstatuses.com`](https://httpstatuses.com)
    (**website**) — List of HTTP status codes
*   Stuck?  See the [Bugs][] section of the course readme to find a list of
    troubleshooting tips

#### Description

Take about 1 hour to follow the [transfer][] tutorial through to completion.

Install:

1. Clone the `be-course-18-19` repository.
2. `cd` into `/be-course-18-19/examples/transfer`
3. Run `npm install --global`

…and then start it by running `transfer`.
This tutorial is interactive.
Answer any questions it asks you, until completion.

#### Extra resources

*   [Choosing an HTTP Status Code](http://racksburg.com/choosing-an-http-status-code/)
*   [Answers for Young People by Tim Berners-Lee](https://www.w3.org/People/Berners-Lee/Kids.html)
*   [`httpbin.org`](https://httpbin.org)

## Homework

### Listing (feature)

[![][listing-cover]][listing-cover-source]

> Plan a lifetime adventure by [**@glenncarstenspeters**][listing-cover-author].

In this assignment you’ll apply your HTTP knowledge in Node by building a static
file server with a little help from Express.

#### Synopsis

*   **Practice**
*   **Time**: 5:00h
*   **Goals**: subgoal s7
*   **Due**: before [lab 3][w3lab]

#### Tips

*   [`plain-server`](examples/plain-server)
    (**example**)
*   [`express-server`](examples/express-server)
    (**example**)
*   Stuck?  See the [Bugs][] section of the course readme to find a list of
    troubleshooting tips

#### Description

Take ± 5 hours to create a server that handles routes and serves static files in Node.js. Feel free to write your server from scratch if you feel adventurous, otherwise [`express`](https://expressjs.com/) is your best option.

Your static server should:

*   Have a couple of different `routes` (e.g. `/about` `/login`)
*   Respond with `404 Not Found`
*   Serve `static files`
    * Images
    * JavaScript
    * CSS
    * Any other?
*   Use a `template engine` (`pug`, `ejs`, `handlebars`) to dynamically render data
    * Create different `partials` (includes) for components of your page

#### Extra resources

*   [Basic Routing](https://expressjs.com/en/starter/basic-routing.html)
*   [Static Files](https://expressjs.com/en/starter/static-files.html)
*   [Templating Engines](https://expressjs.com/en/guide/using-template-engines.html)

### Hand in

1. **Push your changes:**
Hand in your progess in your repository on GitHub under your username.

1. **Create an issue:**
Mark this assignment as complete by opening an issue on our [GitHub issue tracker][issues]. Fill in the issue template with the correct information. Make sure, in your repository, you include the resources used and update your `readme.md` and wiki with additional information.

3. **Feedback:**
Let us know what you thought of the homework, what part you spend a lot of time on and give us any feedback. Your project will be reviewed and receive feedback, so expect people to read it, and be ready for tips and tops!



[bugs]: https://github.com/cmda-bt/be-course-18-19#communication

[inspiration-cover]: https://http.cat/403

[inspiration-link]: https://http.cat

[inspiration-author]: https://twitter.com/girlie_mac

[comic-cover]: https://imgs.xkcd.com/comics/tech_support_cheat_sheet.png

[comic-link]: https://xkcd.com/627/

[comic-author]: https://xkcd.com

[slides-lecture]: https://docs.google.com/presentation/d/1uT6CVMdNig-I9oSwEHI-QiadINH96HYyRC-BIIPxhSI/edit?usp=sharing

[slides-lab]: https://docs.google.com/presentation/d/1DM7uDHM47PPvr3qjULJF-9qeP8StxW-BS8sSZWMLzYQ/edit?usp=sharing

[w3lab]: week-3.md

[w1a]: week-1.md#assignments

[issues]: https://github.com/cmda-bt/be-course-18-19/issues/new/choose

[transfer]: https://github.com/cmda-bt/be-course-18-19/tree/master/examples/transfer

[transfer-cover]: assets/images/transfer.jpg

[transfer-cover-source]: https://unsplash.com/photos/XAqaeyzj3NM

[transfer-cover-author]: https://unsplash.com/@trapnation

[listing-cover]: assets/images/listing.jpg

[listing-cover-source]: https://unsplash.com/photos/RLw-UC03Gwc

[listing-cover-author]: https://unsplash.com/@glenncarstenspeters

[mime-types]: https://www.npmjs.com/package/mime-types
