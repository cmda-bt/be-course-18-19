# Grading

## Table of Contents

*   [Grade](#grade)
*   [Assesments](#assesments)
*   [Publishing](#publishing)
*   [Plagiarism](#plagiarism)

## Grade

| Task                                |   Weight |
| ----------------------------------  | -------: |
| [Participation](#participation)     |      10% |
| [Assesment 1][a1] (oral test)       |      60% |
| [Assesment 2][a2] (oral test)       |      30% |
| **Total**                           | **100%** |


```js
if (!participation && !a1 && !a2) {
  grade = 'GR'
} else if (a1 < 5.5 || a2 < 5.5) {
  grade = 1
} else {
  grade = (participation * 0.1) + (a1 * 0.6) + (a2 * 0.3)
}
```

### Effort

The below table breaks down the general time needed to complete activities.

| Activity                |     Effort |
| ----------------------- | ---------: |
| Lecture (6 × 1:40h)     |     10:00h |
| Lab (8 × 1:40h)         |     13:20h |
| Assessment 1            |     40:00h |
| Assessment 2            |     20:40h |
| **Total**               | **84:00h** |

### Participation

Participation makes up 10% of your final grade. It’s calculated based on how students engage in class and if you completed the JS Bootcamp assignments. Each assignment is graded **ok** or **not ok**.

## Assesments

### Assesment 1 - Individual
This is an oral test where you individually present the feature you created. You will show you can create a quality project in which you apply the subject matter of this course and that you understand it. You will answer questions in such a way as to demonstrate sufficient knowledge of our goals.

* [Learning goals](/readme#goals)
* [Subgoals](/readme#goals)
* [Competences](/readme#goals)

> [Rubic of Assesment 1](a1)

### Assesment 2 - Team
This is an oral test where you present your prototype with your team. You will show how you contributed to the project and explain if you reached your own goals you've set at the beginning of the project.

* [Learning goals](/readme#goals)
* [Subgoals](/readme#goals)
* [Competences](/readme#goals)

> [Rubic of Assesment 2][a2]


## Publishing
Grades will be published and communicated trough _Email_, _Moodle_ and/or _Slack_ based on student numbers.

* Final grades will be **published** _one week_ after test date.
* Final grades will be put in **SIS** _two weeks_ after test date.

> After the oral test you can request **viewing time** for additional feedback, this can be useful for a resit. Feel free to [contact your lecturer](/readme#synopsis) if you want to do so.

## Plagiarism

💁  We don’t like plagiarism and report it to our assessment committee
([examencommissie](https://moodle.cmd.hva.nl/mod/page/view.php?id=1738) in Dutch). See ¶ 6.1.2 of Teaching and Examination
Regulations (TER) 2017-2018 (in Dutch: Onderwijs- en examenregeling, OER) for
a full definition, but here are a few cases that count as plagiarism:

> a. using or copying someone else’s texts, data or ideas without a full and
> correct acknowledgement of sources;
> b. presenting the structure or central ideas developed by someone else as
> your own work or ideas, even when a reference to other authors has been
> included;
>
> \[…]
>
> e. copying (parts of) media files or other sources, software source codes,
> models and other diagrams of other people without acknowledgement and
> allowing it to be held as your own work;
>
> \[…]
>
> g. copying the work of fellow-students and allowing it to be held as your
> own work;
>
> \[…]

You are not allowed to simply use portions of someone else's work in your project. The copyright is owned by the creator of the work. You must cite the sources used. Quoting or using material without a source citation is plagiarism and is punishable. More information on the [Student Copyright Information Point](https://www.amsterdamuas.com/library/services/copyright/students.html)

The manner in which you cite your sources depends. The most widely used style at the AUAS is [APA](https://www.amsterdamuas.com/library/services/acknowledging-sources/apa-style/apa-style.html) of the American Psychological Association. Make sure you cite your sources in the repository or documentation of your project on GitHub.

[a1]: assesments/a1.md
[a2]: assesments/a2.md
