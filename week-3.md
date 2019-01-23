# Week 3

> Any sufficiently advanced technology is indistinguishable from magic.
>
> — Arthur C. Clarke

## Table of Contents

*   [Inspiration](#inspiration)
*   [Comic](#comic)
*   [Slides](#slides)
*   [Assignments](#assignments)
*   [Homework](#homework)

[![][inspiration-cover]][inspiration-link]

> `dog-ceo-api` by [**@ElliottLandsborough**][inspiration-author].

## Comic

[![][comic-cover]][comic-link]

> Duty Calls by [**@xkcd**][comic-author].

## Slides
*   [**Lecture-3**][slides-lecture]
*   [**Lab-3**][slides-lab]

## Assignments

### Request (practice)

[![][request-cover]][request-cover-source]

> Outer Space by [**@nasa**][request-cover-author].

In this assignment you’ll fetch data from an `external rest api`.

#### Synopsis

*   **Homework**
*   **Time**: 2:00h
*   **Goals**: subgoal 7, subgoal 8, subgoal 9,
    subgoal 10, and subgoal 12
*   **Due**: before [lab 4][w4lab]

#### Tips

*   Stuck?  See the [Bugs][] section of the course readme to find a list of
    troubleshooting tips

#### Description

Take ± 2 hours to make a request to an `external api` and render the data coming back.

**Research**

Take about 0:30h to investigate different ways to get data from an api.
*   What's the difference between client-side requests (using `XMLHttpRequest` or `Fetch`) and doing these server-side (using `http` or `request`)?
*   What types of API's are there?
*   Which `types of data` do you get?

**Build**
* Make a request to an external public API
  * [`public APIs`](https://github.com/toddmotto/public-apis) is a collective list of free APIs you can use.
  * You can pick one which has no `auth` such as [`RandomCat`](https://aws.random.cat/meow) or [`MetaWeather`](https://www.metaweather.com/api/)
* Render the data coming back using your `template engine`
  * You will likely recieve [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) you'll need to convert

**Optional:**
* You can pick an API with `auth` but then you need to work with API keys, can you get that working?
* Can you normalize or make a subset of the data?
  * These [`array.protoype`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype) higher order functions might come in handy. 

## Homework

### Data (feature)

[![][data-cover]][data-cover-source]

> Archive storage by [**@samuelzeller**][data-cover-author].

Work on receiving user input and manipulating data for your own Job Story.

#### Synopsis

*   **Homework**
*   **Time**: 6:00h
*   **Goals**: subgoal 7, subgoal 8, subgoal 9,
    subgoal 10, and subgoal 12
*   **Due**: before [lab 4][w4lab]

#### Tips

*   Stuck?  See the [Bugs][] section of the course readme to find a list of
    troubleshooting tips

#### Description

Take ± 6 hours to build out a feature were you'll receive **user input** and manipulate the data. This is quite a vague assignment and the end result will be specific to your Job Story. Make sure you at least spend the alloted hours on this. Commit your work early and often. Push your work to GitHub. Don’t worry if it’s not perfect. Try and get as far as you can.

Some examples to get you started, think about the movie example from the lecture:

*   You can make users upload a profile picture
*   Add new users to an overview list of people
*   Make users enter their hobbies and interests
*   Etc.


### Hand in

1. **Push your changes:**  
Hand in your progess in your repository on GitHub under your username.

1. **Create an issue:**  
Mark this assignment as complete by opening an issue on our [GitHub issue tracker][issues]. Fill in the issue template with the correct information. Make sure, in your repository, you include the resources used and update your `readme.md` and wiki with additional information.

3. **Feedback:**  
Let us know what you thought of the homework, what part you spend a lot of time on and give us any feedback. Your project will be reviewed and receive feedback, so expect people to read it, and be ready for tips and tops!


[bugs]: readme.md#communication

[inspiration-cover]: assets/images/dog-ceo.png

[inspiration-link]: https://dog.ceo

[inspiration-author]: https://github.com/ElliottLandsborough

[comic-cover]: https://imgs.xkcd.com/comics/duty_calls.png

[comic-link]: https://xkcd.com/386/

[comic-author]: https://xkcd.com

[slides-lecture]: https://docs.google.com/presentation/d/137YTmMadaUNCJ2ksKHzU_NCZT-BIv3q9tGhXc38EZ3g/edit?usp=sharing

[slides-lab]: https://docs.google.com/presentation/d/1nWvyLUyl7yjXR5uKpmSymsUWMcOhzTeErE6WTKWv404/edit?usp=sharing

[w4lab]: week-4.md

[w1a]: week-1.md#assignments

[issues]: https://github.com/cmda-bt/be-course-18-19/issues/new/choose

[request-cover]: https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80

[request-cover-source]: https://unsplash.com/photos/Q1p7bh3SHj8

[request-cover-author]: https://unsplash.com/@nasa

[data-cover]: https://images.unsplash.com/photo-1470173274384-c4e8e2f9ea4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80

[data-cover-source]: https://unsplash.com/photos/JuFcQxgCXwA

[data-cover-author]: https://unsplash.com/@samuelzeller
