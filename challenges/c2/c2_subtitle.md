## In English

Hi Dear Game Weavers:

Welcome to Coding Challenge `Whac-A-Mole` part-2: Loop statement.

In this challenge, you will learn how to use javascript `for` loop statement to do repetitive jobs.

So, What is loop statement?

Loops can execute a block of code a number of times.

Computers can do two things best than human beings could:

1. Computation
2. Repeat a same job such as computation


We human beings surely could do some repetitive jobs, such as carving a shape from a piece of wood, but without the computer's help,

we couldn't produce thounsands of hundreds of sculptures with the exact same size, stroke and depth.

To instruct the computer do the repetitive work in Javascript programming language, we use `for` loop statement.

`for` means you are telling computer to do a job under some condtion. for...loop statement consist of two parts:

First part starts with key word `for`, followd by a loop scope or condition.

Second part is looping body, that contains the jobs to be doing.

Lets take a look at FIRST part of the format of `for` loop statement:

```
for ( looping scope or condition )
```

The `looping scrope or condition` included by a pair of parentheses mentioned above could be expressed as a format like this:

```
let x = 0; x < 6; x++
```

There are 3 parts here separated by semicolon:

First part is `let x = 0`, it means we defined a variable(`let`) named `x` initialized a value of `0`.

Second part is `x < 6`, it limits the loopping end to less than 6.

Third part is `x++`, it changes counter `x` value by one each time after one loop done.

Then, lets take a look at the SECOND part of `for` loop statement after parentheses:

```
{
  looping body
}
```

`looping body` inside of brackets could be any job(or different jobs) to be repeated execution.

In this challenge for example, we will be drawing a bunch of dots by just putting one dot drawing function into the looping body.


We could abstract the for...loop sturcture as a simple formula:

> for...loop = for head + for body

Ok, this is my explination to Javascript for loop statement and usage.

Now its your time to complete this challenge by writing another loop statement inside an already existing for loop structure.

The code in the editor looks weird?  

a little bit, thats called `Nested Looping`, or double layer looping, that means the jobs need to be done with two looping condition,

to do a repetitive job.

In our case, our mission is to draw a 6 rows and 6 columns grid with dot drawing function, so we need nested looping.

Dont feel frustrated, I show you how to do it.

First, lets press `Run` button to see what would happen?

Oh yeah! we got the first row of 6 dots!


Lets write a new code line at line 4 in editor like this:

```
for (let y = 0; y < 6; y++) {
```

Then, write the end character for loop body at line 7:

```
}
```

Its done! lets press `Run` button again!

Bingo!

You did it!

Congratulations, you completed the second coding challenge!

Dont forget to press `submit` to mark challenge completed and unlock more achivement badges.