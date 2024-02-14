## In English

Hi Dear Game Weavers:

Welcome to the Coding Challenge `Whac-A-Mole` part-3: Calculate Position.

In this challenge, you willl draw a 4x4 mole grid with mole-drawing function, specifically, learn how to layout moles with a starting point and mole size.

### First step: draw one mole

Lets first uncomment line 11 in our starting code by clicking the line 11 and pressing key combination `Ctrl + /` in Windows or `CMD + /` in Mac.

Once the double slash characters at the start of line 11 is disappeared, we could then press the `Run` button beside the coding area.

What would happen? A cute mole out of its burrow on a beautiful grassland! right?

This is the first step of our challenge 3.

Next, lets move our mouse cursor to the line 11, to see what would happen?

There would be small pane that describe the current `drawMoleHoleWithDynaHead`:

- the 1st parameter is `posX`, a number, it defines the mole start point horizontal coordinate.
- the 2nd parameter is `posY`, a number, it defines mole start point vertical coordinate.
- the 3rd parameter is `position?`, a number, `?` means its an optional parameter that can define the mole body height above its burrow.

The pane is an complete instruction about the usage of this `drawMoleHoleWithDynaHead` function, which includes decription, params explanations, lastly the `return` type. In this function, it returns nothing to user, that is what `void` means.


Ok, before we move forward to the real challenge, lets comment the line 11, since the line 11 is just for demo use, and not supposed to use in our final code. By clicking on the line 11, and then press the key combination `Ctrl + /` in Windows or `CMD + /` in Mac, it will comment the line 11.

### Second step: Hack the position formula

Now, lets enable(remove the double slash at the head of each line) the rest of lines in our game editor, they are line 16, line 17, line 20, and line 21!

These 4 line code are doing a double-layer loop, the outter layer loop is for row layout iteration, the inner layer loop is for column layout iteration.

Dont rush to press `Run` button before implement a mole grid in line 19, to start real coding, lets first review the first 2 checking points:

- How to layout moles horizontally?
- How to layout moles vertically?

The first question refers to the formula that decides the first parameter of `drawMoleHoleWithDynaHead`, that is `posX`.
The second question refers to the formula that decides the second parameter of `drawMoleHoleWithDynaHead`, that is `posY`.

Lets figure it out!

To put a row of moles, we need a start position and a gap or width size to determine the position of each mole, that structure may like this:

```
Mole(in start_point_x) gap Mole gap Mole gap ....
```

So, to describe the principle of horizontal layout approach, we would conclude it as a formula that maybe like this:

```
startX + gap value(or mole width) * i
```

the variable `i` in our formula could be mole's column sequence number that start with `0`. In our code it is `col` in code line 17:

```
for (let col = 0; col < 4; col++) {
```


> NOTE: `let` in line 17 means we `declared a variable` named `col`. In human's language that is we `created a box` named `col`.


So, we got the answer to the first checking point:

```
drawMoleHoleWithDynaHead(mStartX + mWidth * col ...)
```

> NOTE: `mWidth` in our formula refers to mole width defined in code line 6 above


### Third step: Repeat the pattern

Simillarly, we could figure out the mole layout pattern in veritical direction, that may be like is:

```
Mole(in start_point_y) v_gap Mole v_gap Mole ...
```

Then, we could abstract this pattern to a formula that describe the vertical position of each mole:

```
startY + vertical gap value(or mole height) * j
```

`j` in this case should be the row sequence numbr that start with `0`. In our code, we could use `row` in code line 16:

```
for (let row = 0; row < 4; row++) {
```

> NOTE: varaible `row` value could be one of `0|1|2|3`, it represents the vertical sequence of each mole.

Now, we got the answer of the second checking point:

```
drawMoleHoleWithDynaHead(mStartX + mWidth * col, mStartY + mHeight * row)
```

> NOTE: we could use `mHeight` to mimic the vertical gap of each mole, and leave the third parameter of the drawMoleHoleWithDynaHead alone, it's save to do this.


### Third step: Run

It seems we finished the mole grid layout algorithm with fill the two parameters of function `drawMoleHoleWithDynaHead`!

Can we have a try and see what's the result?

Sure, hit the `Run` button!


Bingo! We did it!