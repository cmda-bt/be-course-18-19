# Grading

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

## Effort

The below table breaks down the general time needed to complete activities.

| Activity                |     Effort |
| ----------------------- | ---------: |
| Lecture (6 × 1:40h)     |     10:00h |
| Lab (8 × 1:40h)         |     13:20h |
| Assessment 1            |     40:00h |
| Assessment 2            |     20:40h |
| **Total**               | **84:00h** |

## Participation

Participation makes up 10% of your final grade. It’s calculated based on how students engage in class and if you completed the JS Bootcamp assignments. Each assignment is graded **ok** or **not ok**.

## Assesments

### Assesment 1 - Individual
This is an oral test where you individually present the feature you created. You will show you can create a quality project in which you apply the subject matter of this course and that you understand it. You will answer questions in such a way as to demonstrate sufficient knowledge of our goals.

> [Rubic of Assesment 1](a1)

### Assesment 2 - Team
This is an oral test where you present your prototype with your team. You will show how you contributed to the project and explain if you reached your own goals you've set at the beginning of the project. 

> [Rubic of Assesment 2][a2]

[a1]: assesments/a1.md
[a2]: assesments/a2.md