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
for (let col = 0; col < 4; col += 1) {
```


> NOTE: `let` in line 17 means we `declared a variable` named `col`. In human's language that is we `created a box` named `col`.


So, we got the answer to the first checking point:

```
drawMoleHoleWithDynaHead(mStartX + mWidth * col ...);
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
for (let row = 0; row < 4; row += 1) {
```

> NOTE: varaible `row` value could be one of `0|1|2|3`, it represents the vertical sequence of each mole.

Now, we got the answer of the second checking point:

```
drawMoleHoleWithDynaHead(mStartX + mWidth * col, mStartY + mHeight * row);
```

> NOTE: we could use `mHeight` to mimic the vertical gap of each mole, and leave the third parameter of the drawMoleHoleWithDynaHead alone, it's save to do this.


### Third step: Run

It seems we finished the mole grid layout algorithm with fill the two parameters of function `drawMoleHoleWithDynaHead`!

Can we have a try and see what's the result?

Sure, hit the `Run` button!


Hooray! We did it!



## 中文版本

嗨，亲爱的游戏编织者：

欢迎来到编码挑战“打地鼠”第 3 部分：计算位置。

在本次挑战中，您将使用绘图功能绘制 4x4 的痣网格，具体来说，学习如何通过起点和痣大小来布局痣。

### 第一步：画第一个鼹鼠

首先，通过单击第 11 行并按组合键“Ctrl + /”（在 Windows 中）或“CMD + /”（在 Mac 中），取消起始代码中第 11 行的注释。

一旦第 11 行开头的双斜杠字符消失，我们就可以按编码区域旁边的“运行”按钮。

会发生什么？ 美丽的草原上，一只可爱的鼹鼠从洞穴里出来了！ 正确的？

这是我们挑战 3 的第一步。

接下来，我们将鼠标光标移动到第 11 行，看看会发生什么？

将会有一个小窗格描述当前的“drawMoleHoleWithDynaHead”：

- 第一个参数是“posX”，一个数字，它定义鼹鼠起点的水平坐标。
- 第二个参数是“posY”，一个数字，它定义鼹鼠起点的垂直坐标。
- 第三个参数是“position?”，一个数字，“?”表示它是一个可选参数，可以定义鼹鼠体在其洞穴上方的高度。

该窗格是有关“drawMoleHoleWithDynaHead”函数使用的完整说明，其中包括说明、参数说明，最后是“返回”类型。 在这个函数中，它不会向用户返回任何内容，这就是“void”的含义。


好的，在我们进入真正的挑战之前，让我们注释一下第 11 行，因为第 11 行仅供演示使用，不应该在我们的最终代码中使用。 点击第11行，然后按组合键“Ctrl + /”（Windows）或“CMD + /”（Mac），它将注释第11行。

### 第二步：破解位置公式

现在，让我们在游戏编辑器中启用（删除每行开头的双斜杠）其余行，它们是第 16 行、第 17 行、第 20 行和第 21 行！

这4行代码做了一个双层循环，外层循环用于行布局迭代，内层循环用于列布局迭代。

在第 19 行实现鼹鼠网格之前，不要急于按“运行”按钮，要开始真正的编码，让我们首先回顾一下前 2 个检查点：

- 如何水平布置痣？
- 如何垂直布置痣？

第一个问题涉及到决定`drawMoleHoleWithDynaHead`第一个参数的公式，即`posX`。
第二个问题涉及到决定`drawMoleHoleWithDynaHead`第二个参数的公式，即`posY`。

让我们弄清楚吧！

为了放置一排痣，我们需要一个起始位置和一个间隙或宽度大小来确定每个鼹鼠的位置，该结构可能是这样的：

````
鼹鼠（在 start_point_x 中） 鼹鼠 间隙 摩尔 间隙 ....
````

因此，为了描述水平布局方法的原理，我们将其总结为一个公式，可能如下所示：

````
startX + 间隙值（或鼹鼠宽度）* i
````

我们公式中的变量“i”可以是鼹鼠以“0”开头的列序列号。 在我们的代码中，它是代码行 17 中的“col”：

````
for (let col = 0; col < 4; col += 1) {
````


> 注意：第 17 行中的 `let` 意味着我们`声明了一个名为 `col` 的变量。 用人类的语言来说，就是我们“创建了一个盒子”，名为“col”。


这样，我们就得到了第一个检查点的答案：

````
drawMoleHoleWithDynaHead(mStartX + mWidth * col ...);
````

> 注意：公式中的“mWidth”是指上面第 6 行代码中定义的摩尔宽度


### 第三步：重复该模式

同样，我们可以计算出垂直方向上的鼹鼠的布局模式，可能是这样的：

````
鼹鼠（在 start_point_y 中） v_gap 摩尔 v_gap 摩尔 ...
````

然后，我们可以将此模式抽象为描述每个痣的垂直位置的公式：

````
startY + 垂直间隙值（或鼹鼠高度）* j
````

在这种情况下，“j”应该是以“0”开头的行序列号。 在我们的代码中，我们可以在代码第 16 行中使用“row”：

````
for (let row = 0;row < 4;row += 1) {
````

> 注意：变量“row”值可以是“0|1|2|3”之一，它代表每个摩尔的垂直顺序。

现在，我们得到了第二个检查点的答案：

````
drawMoleHoleWithDynaHead(mStartX + mWidth * col, mStartY + mHeight * row);
````

> 注意：我们可以使用`mHeight`来模拟每个痣的垂直间隙，并单独保留drawMoleHoleWithDynaHead的第三个参数，这样做是省事的。


### 第三步：运行

看来我们通过填充函数“drawMoleHoleWithDynaHead”的两个参数完成了鼹鼠网格布局算法！

我们可以尝试一下，看看结果如何吗？

当然，点击“运行”按钮！


万岁！ 我们做到了！