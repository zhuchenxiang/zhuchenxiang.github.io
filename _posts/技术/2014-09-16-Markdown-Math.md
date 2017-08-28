---
layout: post
title: Markdown输入LaTeX数学公式
category: 技术
tags: Markdown
keywords: 
description: 
---

Markdown输入数学公式

### 可用方法：

- 以图片形式插入Markdown中。
- 使用LaTeX Mathjax表达式。

### Mathjax：

- [Mathjax在线编辑器](http://www.codecogs.com/latex/eqneditor.php)

### LaTex 
- Github 上在线 [Markdown MathJax 编辑器](https://kerzol.github.io/markdown-mathjax/editor.html)
-  [MathJax 支持的数学符号表](https://mirrors.tuna.tsinghua.edu.cn/CTAN/info/symbols/math/maths-symbols.pdf)

### pajx与mathjax兼容
```
<script>
 
$(document).on('pjax:complete', function() {
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
})

</script>
```