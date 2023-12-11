## In English

Hi Dear Game Weavers:

Welcome to the Coding Challenge `Whac-A-Mole` part-2: Loop Statement.

In this challenge, you will learn how to use javascript `for` loop statement to do repetitive jobs.

So, What is a loop statement?

Loops can execute a block of code a number of times.

Computers can do two things best than human beings could:

1. Computation

2. Repeat the same job, such as computation

We human beings surely could do some repetitive jobs, such as carving a shape from a piece of wood, but without the computer's help,

We couldn't produce thounsands of hundreds of sculptures with the exact same size, stroke, and depth.

To instruct the computer do the repetitive work in Javascript programming language, we use `for` loop statement.

`for` means that you are telling computer to do a job under some condtion. for...loop statement consists of two parts:

The first part starts with key word `for`, followd by a loop scope or condition.

Second part is `Looping Body`, that contains the jobs to be doing.

Lets take a look at the first part of the format of the `for` loop statement:

```
for (looping scope or condition)
```

The `looping scrope or condition` included by a pair of parentheses mentioned above could be expressed as a format like this:

```
let x = 0; x < 6; x++
```

There are 3 parts here separated by semicolon:

First part is `let x = 0`, it means we have defined a variable(`let`) named `x` initialized a value of `0`.

The second part is `x < 6`, it limits the looping end to less than 6.

The third part is `x++`, it changes counter `x` by one each time after one loop done.

Then, lets take a look at the second part of the `for` loop statement after parentheses:

```

{
  looping body
}

```

`looping body` inside of brackets could be any job(or different jobs) to be repeated execution.

In this challenge, for example, we will draw a bunch of dots by just putting one dot drawing function within the looping body.

We could abstract the for...loop structure to a simple formula:

> for...loop = for head + for body

Ok, this is my explination to Javascript for loop statement and its usage.

Now it's your time to complete this challenge by writing another loop statement inside an already existing for loop structure.

The code in the editor looks weird?

A little bit, that's called `Nested Looping`, or double layer looping, that means the jobs need to be done with two looping condition,

to do a repetitive job.

In our case, our mission is to draw a 6 rows and 6 columns grid with dot drawing function, so we need nested looping.

Don't feel frustrated, I show you how to do it.

First, lets press `Run` button to see what would happen?

Oh yeah! We got the first row of 6 dots!

Lets write a new code line at line 4 in the editor like this:

```
for (let y = 0; y < 6; y++) {
```

Then, write the end character for loop body at line 7.

```
}
```

Its done! lets press `Run` button again!

Bingo!

You did it!

Congratulations, you completed the second coding challenge!

Don't forget to press `submit` to mark the challenge as completed and unlock more achievement badges.



## 中文版本

嗨，亲爱的游戏编织者：

欢迎来到编码挑战“打地鼠”第 2 部分：循环语句。

在本次挑战中，您将学习如何使用 JavaScript `for` 循环语句来完成重复性工作。

那么，什么是循环语句？

循环可以多次执行一段代码。

计算机可以比人类做得更好的两件事：

1. 计算

2.重复相同的工作，例如计算

我们人类当然可以做一些重复性的工作，比如用一块木头雕刻一个形状，但没有计算机的帮助，

我们无法制作出成千上万个尺寸、笔触和深度完全相同的雕塑。

为了指示计算机在 Javascript 编程语言中执行重复性工作，我们使用“for”循环语句。

“for”表示您告诉计算机在某种条件下执行某项工作。 for...循环语句由两部分组成：

第一部分以关键字“for”开头，后跟循环范围或条件。

第二部分是 Looping Body 主体，其中包含要执行的工作。

我们看一下 for 循环语句的第一部分格式：

````
for（循环范围或条件）
````

上面提到的一对括号包含的“循环范围或条件”可以表示为如下格式：

````
let x = 0； x < 6； x++
````

这里有 3 个部分，用分号分隔：

第一部分是“let x = 0”，这意味着我们定义了一个名为“x”的变量（“let”）并初始化了值“0”。

第二部分是`x < 6`，它将循环结束限制为小于6。

第三部分是`x++`，它在一个循环完成后每次将计数器`x`更改1。

然后，我们看一下 for 循环语句中括号后面的第二部分：

````
{
  循环体
}

````

括号内的“循环体”可以是任何要重复执行的作业（或不同的作业）。

例如，在本次挑战中，我们将通过在循环体内放置一个点绘制函数来绘制一堆点。

我们可以将 for...循环结构抽象为一个简单的公式：

> for...循环 = for head + for body

好的，这就是我对 Javascript for 循环语句及其用法的解释。

现在是时候通过在现有的 for 循环结构中编写另一个循环语句来完成此挑战了。

编辑器中的代码看起来很奇怪？

一点点，这被称为“嵌套循环”，或双层循环，这意味着工作需要在两个循环条件下完成，

做重复性的工作。

在我们的例子中，我们的任务是用点画功能绘制一个6行6列的网格，所以我们需要嵌套循环。

不要感到沮丧，我将向您展示如何做到这一点。

首先，让我们按“运行”按钮看看会发生什么？

哦耶！ 我们得到了第一行 6 个点！

让我们在编辑器的第 4 行编写一个新代码行，如下所示：

````
for (令 y = 0; y < 6; y++) {
````

然后，在第 7 行写入循环体的结束字符。

````
}
````

完成！ 让我们再次按下“运行”按钮！

答对了！

你做到了！

恭喜您完成了第二个编码挑战！

不要忘记按“提交”将挑战标记为已完成并解锁更多成就徽章。