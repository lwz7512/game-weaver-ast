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

Very interesting right? 

Just put your last step expression into a new function, then you could get a new result as you expect!

Press the `Run` button!

You pass one task of this challenge!

### Third step: Declare a size value with a ternary expression


...