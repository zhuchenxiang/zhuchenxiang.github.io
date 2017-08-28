---
layout: post
title: Markdown输入LaTeX数学公式
category: 技术
tags: Markdown
keywords: 
description: 
---

[TOC]

### 解决办法：

- 将数学公式以图片形式保存，再在Markdown中将其插入。
- 或者，使用LaTeX在线编辑器，输入数学公式，获得html代码，将其插入Markdown。

### 步骤：

- 进入[CodeCogs](http://www.codecogs.com/latex/eqneditor.php)
- 在盒子里书写公式
- 在页面下方复制html代码
- 将复制的html代码拷贝到Markdown里

### 缺点：
Markdown文件的易读性却因此下降了很多。

        $h(x) = \theta_0 + \theta_1 x$

### LaTex 
- Github 上在线 [Markdown MathJax 编辑器](https://kerzol.github.io/markdown-mathjax/editor.html)
-  [MathJax 支持的数学符号表](https://mirrors.tuna.tsinghua.edu.cn/CTAN/info/symbols/math/maths-symbols.pdf)

 $h(x) = \theta_0 + \theta_1 x$

 $ h(x) = \theta_0 + \theta_1 x $

$$
\theta_i = \theta_i - \alpha\frac\partial{\partial\theta_i}J(\theta)
$$