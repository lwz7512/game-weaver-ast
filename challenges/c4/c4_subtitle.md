## In English

Hi Dear Game Weavers:

Welcome to the Coding Challenge `Whac-A-Mole` part-4: Make it moving.

In this challenge, we will create randomly appearing moles by a simple approach: 

> Generate a random position with javascript random function Math.random()

By applying this approach, we pick a random postion of mole grid to draw the mole with an appropriate mole size at the painting function.

The painting function is called `paintOnEachSecond`, like it's name, this function will be executed on each second.

So, we just change the outstanding mole position, draw it, then as the time changes, the game start running like a charm!


### First step: Generate a random value within two boundary values


In this step, we need to generate a list of random numbers which are between two boundary values, specifically:

> Generate a random integer between 0 and 16, except for 16

How?

Lets take a look at `random` function in `Math` library from w3schools.com:

> let x = Math.random();

Click `Try it Youself`, and you will see the output result in the right part of editor:

> JavaScript Math
> The Math.random() Method
> Math.random() returns a random number between 0 (inclusive) and 1 (exclusive):
> 0.6430746309743869

Refresh the editor page, you may see a new random value at the end of right part!

Yes, every time you refresh the web page, it will run the `Math.random()` once, then you will get a new decimal number.

As you can see, the random function can only generate decimal number less than `1`, how could we make the random number bigger?

Continue to try the second example:

> let x = Math.random() * 10;

You could see the new output in the right part:

> JavaScript Math
> The Math.random() Method
> Math.random()*10 returns a random number between 0 and 10:
> 6.52850770282641

Is it bigger? Yes, by multiplying a bigger number `10`, the random number is 10 times bigger!

In this way, if you can generate any random numbers regardless how big it is!

Lets go back to our challenge content, the first `TODO` in line 12 is:

> generate a random integer between 0 and 16, except for 16

So, in line 14, we could write an expression which generate random value between 0 and 16:

> const randomMole = Math.random() * 16;

Lets see if we got the right random value saved in `randomMole`:

In line 15, input this `log` statement to show the value of `randomMole`:

> log(randomMole);

And click `Run` button!

It worked! right? the values constantly update in the game info panel is just the decimal number between `0` and `16` as we expected!

So, our first step is done! Let go forward to the second step!

### Second step: Round down a decimal value

Lets uncomment the `log` statement in line 15 first!

To change a decimal number into a integer that less than the original decimal number, we use `floor` function:

> Math.floor()

For example, we want to round down a decimal number `1.6`, we could do this:

> let x = Math.floor(1.6);

The `x` value will be `1`.

By the way, if we want to round up a decimal number, we could use `ceil` function like this:

> let y = Math.ceil(1.6);

The `y` value will be `2`

So, in this step, we need to use `floor` function to round down our `randomMole` value.

Update the line 14 into this:

> const randomMole = Math.floor(Math.random() * 16);

What's that? A two-function combination? Yes! 

To make a value as the `argument` of a function, just put your expression in last step into the parentheses of the target function, then you could get a new result of `rounded` and `random` number!

Press the `Run` button!

You pass one task of this challenge!

### Third step: Declare a size value with a ternary expression


Now, let move on to the last task, write a `ternary` expression!

What is `ternary` expression?

Ternary expression is also named as `Conditional operator`, it is used to determine some simple cases that only have one `yes or no` condition to check. Take a common question in our daily life for example:

> As parents you kids may once ask you: Can i drink alcohol?
> you answer them: if your age is lager than 18, you could, otherwise you couldn't! 

The simple answer above could be translated into a `ternary` expression like this:

> answer = kid_age > 18 ? 'yes' : 'no'


So a typical ternary expression have a structure like this:

> condition ? exprIfTrue : exprIfFalse


The `condition` in a ternary expression could do any type of comparision such as `equal`, `not equal`, `larger`, `smaller`...etc that could result in a `boolean` value. 

The question mark `?` in a ternary evaluate the result of the `condition`, if the value of the `condition` expression is `true`, then we got the case before the colon(:), if the value of the `condition` expression is `false`, we got the the case after the colon(:).

Unlike its peer `if...else` need at lease `5` lines code to the same job, ternary expression only need just `1` line code to do a simple flow control.


Go back our challenge, we need to compare `randomMole` with `index`, if they are `equal`, so, we got the condtion:

> randomMole == index

NOTE here: we use double `Equals sign` to do a equal check, rather than one equals sign!

Then, we know the first case after the checking is `45`, and the second case after the colon is `0`.

So, our ternary expression is:

> randomMole == index ? 45 : 0


Finally, we assign this ternary expression to the constant `dynaHeightForMole` in line `31`:

> const dynaHeightForMole = randomMole == index ? 45 : 0;

That means, we save the condition height value from the ternary exprresion above to the constant `dynaHeightForMole`.

NOTE again: here we use one `Equals sign` between the `dynaHeightForMole` and `randomMole` to do a `assign` or keeping work!


All done!

Lets hit the `Run` button again to finish this challenge!


Congratulations!


You pass the fourth coding challenge!