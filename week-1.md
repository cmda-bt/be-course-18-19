# Week 1

> Always bet on JavaScript.
>
> — [**@BrendanEich**][quote-author]

## Table of Contents

*   [Inspiration](#inspiration)
*   [Comic](#comic)
*   [Slides](#slides)
*   [Assignments](#assignments)
*   [Homework](#homework)

## Inspiration

[![][inspiration-cover]][inspiration-link]

> Visualisation of npm dependencies by [**@anvaka**][inspiration-author].

## Comic

[![][comic-cover]][comic-link]

> Compiling by [**@xkcd**][comic-author].

## Slides
*   [**Lecture-1**][slides-lecture]
*   [**Lab-1**][slides-lab]

## Assignments

### learnyounode (practice)

[![][learnyounode-cover]][learnyounode-cover-source]

> Lose Yourself by [**@claybanks1989**][learnyounode-cover-author].

In this assignment you’ll learn the basics of Node.

#### Synopsis

*   **Practice**
*   **Time**: 3:00h
*   **Goals**: subgoal 1, subgoal 2
*   **Due**: before [lab 3][w3lab]

#### Tips

*   Stuck?  See the [Bugs][bugs] section of the course readme to find a list of
    troubleshooting tips

#### Description

Take ± 3 hours to follow the [learnyounode][] workshopper through to completion.

Workshoppers are interactive, self guided lesson modules, used as curriculum in
[NodeSchool][]: free and in-person hosted workshops.
At NodeSchool, mentors help attendees work through the challenges, but you can
also work through workshoppers on your own, or with friends or colleagues.

[NodeSchool Amsterdam][nsa] is pretty active: about once per month there’s a
workshop.
It’s also a lot of fun.
Need some extra help?
Want to meet more developers?
Definitely attend one of the workshops!

Other than `learnyounode`, workshoppers exist for JavaScript, npm, Express,
Electron, and much more.  Feel free to peruse the
[list of workshoppers][workshoppers] and try anything that sounds interesting.

#### Extra resources

*   [Introduction to Node with Ryan Dahl](https://youtu.be/jo_B4LTHi3I)
*   [I hate almost all software](http://tinyclouds.org/rant.html)
*   [Node Guides](https://nodejs.org/en/docs/guides/)
*   [The Art of Node](https://github.com/maxogden/art-of-node)
*   [javascript.info](https://javascript.info)

## Homework

You’re expected to spend about 6 hours on assignments outside of class. Submit your assignments before [lab 3][w3lab].

### Package (Feature)

[![][package-cover]][package-cover-source]

> Parcel, package, candy cane and string by
> [**@kadh**][package-cover-author].

You’ll learn the basics of node modules and npm packages and setup a boilerplate for your own feature.

#### Synopsis

*   **Homework**
*   **Time**: 6:00h
*   **Goals**: subgoal 1, subgoal 2
*   **Due**: before [lab 3][w3lab]

#### Tips

*   Stuck?  See the [Bugs][bugs] section of the course readme to find a list of
    troubleshooting tips

#### Description

1. Create the boilerplate for the feature you are going to create. Include a `package.json` with a correct name, version, dependencies, and other
metadata.
See npm’s documentation on [`package.json`](https://docs.npmjs.com/files/package.json).
For examples of `package.json` files, see
[`repeat-string`](https://github.com/jonschlinkert/repeat-string/blob/master/package.json),
[`longest-streak`](https://github.com/wooorm/longest-streak/blob/master/package.json),
or [`skin-tone`](https://github.com/sindresorhus/skin-tone/blob/master/package.json).

2. Pick a package from [npm][npmjs] that would be helpful for your feature and use it in your `index.js`
    * Not sure what dependency to pick? You can try to get [`nodemon`](https://nodemon.io/) up and runnning or make an example using the [`lodash`](https://lodash.com/) package.
    * Can you create some [`scripts`](https://docs.npmjs.com/misc/scripts) in your `package.json` to start your `index.js`?

3. Add a `readme.md` to your repo, documenting the code: how to install it, how to use
it (with examples), a license.
For examples of `readme.md` files, see
[`concat-stream`](https://github.com/maxogden/concat-stream#readme),
[`ccount`](https://github.com/wooorm/ccount#readme),
or [`normalize-url`](https://github.com/sindresorhus/normalize-url#readme).

If you have some time left and would like to dig further, you can:

*   Add a [license](https://help.github.com/articles/licensing-a-repository/)
*   Add a [`.gitignore`](https://help.github.com/articles/ignoring-files/)
*   Add a [`.editorconfig`](http://editorconfig.org)

…most of the previously linked to projects have the above in place, look at
them for examples.

#### Extra resources

*   [11 npm tricks](https://nodesource.com/blog/eleven-npm-tricks-that-will-knock-your-wombat-socks-off/)
*   [Participating in Open Source](https://github.com/btford/participating-in-open-source)
*   [Guide to Idiomatic Contributing](https://github.com/jonschlinkert/idiomatic-contributing)
*   [Start your open source career](https://blog.algolia.com/start-your-open-source-career/)


### Hand in

1. **Push your changes:**  
Hand in your progess in your repository on GitHub under your username.

1. **Create an issue:**  
Mark this assignment as complete by opening an issue on our [GitHub issue tracker][issues]. Fill in the issue template with the correct information. Make sure, in your repository, you include the resources used and update your `readme.md` and wiki with additional information.

3. **Feedback:**  
Let us know what you thought of the homework, what part you spend a lot of time on and give us any feedback. Your project will be reviewed and receive feedback, so expect people to read it, and be ready for tips and tops!



[bugs]: readme.md#communication

[quote-author]: https://twitter.com/BrendanEich

[inspiration-cover]: assets/images/npmgraph.png

[inspiration-link]: http://npm.anvaka.com/#/view/2d/express

[inspiration-author]: https://github.com/anvaka

[comic-cover]: https://imgs.xkcd.com/comics/compiling.png

[comic-link]: https://www.xkcd.com/303/

[comic-author]: https://xkcd.com

[slides-lecture]: https://docs.google.com/presentation/d/1k7m98hB0hct_kL6fb7g5IbxI_YZqdPMmZApbAn8qYTo/edit?usp=sharing

[slides-lab]: https://docs.google.com/presentation/d/1vTD5Rm0aZW95BqOSekngZZkzsT6nghpPmkoFSAAr8Hw/edit?usp=sharing

[w3lab]: week-3.md

[w1a]: week-1.md#assignments

[learnyounode-cover]: assets/images/learnyounode.jpg

[learnyounode-cover-source]: https://unsplash.com/photos/GX8KBbVmC6c

[learnyounode-cover-author]: https://unsplash.com/@claybanks

[issues]: https://github.com/cmda-bt/be-course-18-19/issues/new/choose

[learnyounode]: https://github.com/workshopper/learnyounode#readme

[nodeschool]: https://nodeschool.io

[nsa]: https://nodeschool.io/amsterdam/

[workshoppers]: https://nodeschool.io/#workshopper-list

[package-cover]: assets/images/package.jpg

[package-cover-source]: https://unsplash.com/photos/fV4-DdSdcpI

[package-cover-author]: https://unsplash.com/@kadh

[npmjs]: https://www.npmjs.com/