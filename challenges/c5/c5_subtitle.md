## In English

Hi Dear Game Weavers:

Welcome to Coding Challenge `Whac-A-Mole` part-5: Response to hammer hit.


In this challenge, we will learn how to achieve game interaction with our mouse, and explore a bit of the mechanism behind a computer game!

To simply put, by listening mouse events such as `mousemove` or `mousedown`, we could do some responding work to achive the game interaction!

Let's move on to the code editor in this challenge to see, how could we listen events, and what kind of event handler work to make our game alive!

For some curious weavers, you could press the `Run` button to see what would happen!


## First step: Understanding event listeners

Since our mini game `Whac-A-Mole` is a web game running inside a browser page environment, all we could utilize is `Web API`.

In this challenge, we will use API `addEventListener(type, listener)` from the top level object `document`.

Let's explain it with more detail:

`type` is an event name, in our game they are `mousemove`, `mousedown` and `mouseup`.

`listener` is an event responding function, in our game we are defining 3 functions to save game state.

For example in our starting code line 7 to 10:

> document.addEventListener('mousemove', function (mouseEvent){})

We defined an `mousemove` event handler to save current mouse position.

Your maybe curious how could we know the mouse position?

Good question!

For each user defined event `listener` function, it can include an argument which is an event object!

In our starter code, we declare it as `mouseEvent` from which we could access `clientX` and `clientY` properties, 

thus to get the latest mouse postion.


## Second step: Make hammer moving

Now, let's finish the first job: to make hammer moving with mouse!

Uncomment line 32 and 33 to expose the real hammer position that relative the top-left corner of the game stage:

```
 const hammerX = globalMouseX - canvasPosition.x;
 const hammerY = globalMouseY - canvasPosition.y;
```

> Tip: by selecting those two lines and pressing Ctrl + / or CMD + /, to uncomment it!


If you saw the `//` before the two lines are gone and turned into black, that means it's uncommented!

Then, we need to replace the two `100` in code line `35` with `hammerX` and `hammerY`!

> Tip: move your mouse cursor to the code line 35, you will see a popover to describe the function!


The function `paintHammerUp` take 3 parameters to draw a hammer in up state:

- drawing context, we dont need to care about.
- hammerX, the horizontal coordinate of hammer in black game stage.
- hammerY, the vertical coordinate of hammer in black game stage.

Currently the two coordinate parameters are both writen as a fixed value `100`, so if you press the `Run` button before code changing,

you could see a hammer staying on the stage regardless you moving the mouse.

After we changed the code line 35 to this:

```
paintHammerUp(ctx, hammerX, hammerY);
```

And, press `Run` button again, then your hammer will be alive following your mouse moving!

You first job in this challenge is done!


## Third step: Respond with mouse click

Now that our hammer could move as we will, another question is how could we make it respond to `hit` action?

You may feel it's tricky and have no idea how to do that... but actually it's not so hard to simulate a `hitting` behavior in code logic.

Let's decompose the `hit` action into two parts:

- Mouse down state
- Mouse up state

If we could catch the `Mouse down` moment and show the hammer-down-skin, and in the same way to catch the `Mouse up` moment to show the hammer-up-skin, then we could achieve `hitting` effect!

Yes, this is the general idea(mechanism) of game running, all the computer games under the hood are state driven machine!

More specifically, that workflow may be abstracted like this:

> 1. listening user input --> 2. produce new state --> 3. draw game scene with new state --> next loop...

`next loop...` in this steps means another `1. .... 2. ... 3. ...` and more...


In our game `Whac-A-Mole` part 5, we are listening mouse events though document `addEventListener`, and then save current game state in the liseners function, lastly do draw the hammer state in the function `paintMouseFollowHammer`.

The function `paintMouseFollowHammer` will keep running as long as you pressed the `Run` button, it will constantly paint the latest hammer skin.

So, if we want the hammer to be painted corresponding to the two state switching, we could just use `if...else` statement:


```
  if(isMouseDown) {
    paintHammerDown(ctx, hammerX, hammerY);
  } else {
    paintHammerUp(ctx, hammerX, hammerY);
  }
```

By checking hammer state variable `isMouseDown`, we could decide when to draw hammer down and when to draw hamer up!

Replace the code line `35` with above if else code snippet, we could achieve a mouse hitting effect!


That's it!

Press the `Run` button, and press your mouse on the right side game stage, the hammer can do hitting now!

Is it interesting?

Congratulations!

See you next challenge!