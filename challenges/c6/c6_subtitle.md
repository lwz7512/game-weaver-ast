## In English

Hi Dear Game Weavers:

Welcome to Coding Challenge `Whac-A-Mole` part-6: Hit Testing.

In this challenge, we are going to learn how to detect if a mole is being hit!

That is to say, how do we know our hammer has hit the mole above its burrow?

We will use mathematical formula to help us describe the relationship of two game objects, in our game, they are `hammer` and `mole`!

By understanding the basic theory of `Collision Detection`, we could check the relationship of two game object, 

and setup a `threshold`, then, we could decide if two objects are successfully colliding.

Not very clear? 

That's all right! let's move on!


## First step: 

Lets first click the `Run` button, try to see what would happen?

The game is running, but we got one test failure in message panel, it saying: 

> ✘ 🤔 test `checkCollision` implementation under threshold case!

That is expected, because we havent finished the coding tasks in this challenge!

Let's take a look at the coding editor, to find out what's the tasks...

In the code line `18`, we could see a `NOTE` mark, that reveals us the description of function `checkCollision`.

The function is designed to implement a very simple two-objects collision testing method, just like the description of the function said, we just need checking the straight distance of two objects, if it's below the threshold value, we could think of collision success, otherwise not!

You may wonder, how to know the distance of two objects which are mole and hammer? 

No worries, let's proceed to the function body to discover more details!

## Second step:

By checking code of `checkCollision` function, we can see two constant declaration `xDiff` and `yDiff`.

What does it mean?

Actually, `xDiff` means the horizontal distance of two objects, `yDiff` means the vertical distance of two objects.

So, since we got the got the horizontal and the vertical distance of two objects, how do we know the straight distance?

This is the key point of this challenge!

In a 2D space or 2D coordinate system, there is only one way to calculate the distance of two points:

> Pythagorean theorem

![stackoverflow_pythagoras_theorem](https://raw.githubusercontent.com/lwz7512/game-weaver-ast/master/images/stackoverflow_pythagoras_theorem.png)

A simple pseudo-code to implement the `pythagorean theorem` in javascript may like this:

```
var a = x1 - x2;
var b = y1 - y2;
// c is the distance
var c = Math.sqrt( a*a + b*b );
```



## Third step:



...