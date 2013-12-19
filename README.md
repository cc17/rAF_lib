# 基于脚本的动画的计时控制 requestAnimationFrame

## 背景介绍
> 使用 setTimeout 和 setInterval 绘制的动画并没有为 Web 开发人员提供有效的方法来规划动画的图形计时器。这导致了动画过度绘制，浪费 CPU 周期以及消耗额外的电能等问题。而且，即使看不到网站，特别是当网站使用背景选项卡中的页面或浏览器已最小化时，动画都会频繁出现。随着浏览器tab页面生命周期越长，
你会发现动画越来越慢，动画将变得异常卡滞。

例如：假设我们需要每30秒执行一次动画，而动画本身完成是需要时间的，这样会导致每次轮询的时候，实质上上一次动画并没有结束。而我们知道js是单线程执行，所以传统的轮询方式将会形成一个时间队列。而requestAnimationFrame使得这一状况得以改变。浏览器将会自动优化，使得上一次循环结束才开始下一次循环，不会出现循环累加的情况。


## 为什么要封装

w3c并没有正式规范 reqestAnimationFrame，所以不同浏览器的实现不太一样，加上还有讨厌的ie6,7，我们希望用统一的api来调用，省去每次兼容性代码编写。

## 封装后主要接口

* add(name,fn[,context]) name 队列名称  fn需要执行的函数，context可以绑定作用域

~~~js
    function Test1() {
			//stats.begin();
			count++;
			logger('test1 ');
			//stats.end();
		};
		rAF.add('test1', Test1);
~~~

* remove([name])  name队列名称，不传则会情况所有注册的队列函数

~~~js
   rAF.add('test1'); 
~~~

* start()  启动动画

* stop() 终止动画

* toggle 启动/终止动画





