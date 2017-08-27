---
layout: post
title: Markdown输入LaTeX数学公式
category: 技术
tags: Markdown
keywords: 
description: 
---



<p>在pygments的CSS选择器前都加上<code>.highlight code</code>，防止pygments的CSS影响<a href="#mathjax">mathjax</a>公式的CSS。<a href="http://www.stehem.net/2012/02/14/how-to-get-pygments-to-work-with-jekyll.html">pygments也可能会和bootstrap.min.css冲突</a>，需要修改css。上面的<code>pygmentize</code>命令就是pygments代码高亮的效果。代码高亮的highlight标签使用方法<a href="https://github.com/mojombo/jekyll/wiki/Liquid-Extensions">可以参考这里</a>。</p>

<p>另一个比较特殊的代码高亮插件是<a href="http://octopress.org/docs/plugins/include-code/">include-code</a>，可以直接显示目录中的代码文件，在_config.yml中设置好<code>code_dir</code>参数后，直接用<code>&#123;% include_code excerpt.rb %&#125;</code>，即可显示高亮代码（布局可自己定义，代码高亮的CSS可以用pygments的）。<a href="https://gist.github.com/2890453#working-with-code-partials">pygments也支持类似的方法</a>，但效果不太好。</p>

<p><span id="mathjax"></span></p>

<h3 id="latex"><script type="math/tex">\LaTeX</script>公式</h3>

<p>github可支持的<script type="math/tex">\LaTeX</script>方案需要绕过自定义插件，利用类似<a href="http://www.mathjax.org/">mathjax</a>的javascript方案或采用支持<script type="math/tex">\LaTeX</script>的markdown解析器（比如<a href="http://maruku.rubyforge.org/">maruku</a>）。</p>

<p><a href="http://www.mathjax.org/">mathjax</a>通过javascript的方式生成<script type="math/tex">\LaTeX</script>公式可以参考<a href="http://chen.yanping.me/cn/blog/2012/03/10/octopress-with-latex/">在Octopress中使用<script type="math/tex">\LaTeX</script></a>，不过，不必把markdown解析引擎设置为kramdown。当markdown解析引擎为kramdown时，只需要在页面中插入下面这段代码：</p>

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;script </span><span class="na">type=</span><span class="s">&quot;text/javascript&quot;</span> <span class="na">src=</span><span class="s">&quot;http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML&quot;</span><span class="nt">&gt;&lt;/script&gt;</span></code></pre></div>

<p>下面这段代码：</p>

<div class="highlight"><pre><code class="language-html" data-lang="html">$$ 
e^x = \sum\_{n=0}^\infty \frac{x^n}{n!} = \lim\_{n\rightarrow\infty} (1+x/n)^n 
$$</code></pre></div>

<p>显示的效果：
<script type="math/tex"> 
e^x = \sum\_{n=0}^\infty \frac{x^n}{n!} = \lim\_{n\rightarrow\infty} (1+x/n)^n 
</script>
显示行内公式<script type="math/tex">\alpha + \beta</script>的代码如下：</p>

<div class="highlight"><pre><code class="language-html" data-lang="html">$$\alpha + \beta$$</code></pre></div>

<p>但是kramdown的解析引擎和转帖gist代码的插件、直接高亮文件中代码的插件include-code有冲突。</p>

<p>利用<a href="https://gist.github.com/834610">mathjax插件</a>定义的新标签，也可插入<script type="math/tex">\LaTeX</script>公式。这段代码<code>&#123;% math %&#125; e&#94;x = \sum\_{n=0}&#94;\infty \frac{x&#94;n}{n!} = \lim\_{n\rightarrow\infty} (1+x/n)&#94;n &#123;% endmath %&#125;</code>也可显示和上面一样的公式，利用标签<code>&#123;% m %&#125; \alpha + \beta &#123;% em %&#125;</code>可显示行内公式<script type="math/tex">\alpha + \beta</script>。mathjax还<a href="http://docs.mathjax.org/en/latest/tex.html#tex-eq-numbers">支持公式编号</a>，引用公式\eqref{eq:sample}很方便。</p>

<p>\begin{equation}
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
  \label{eq:sample}
\end{equation}</p>

<p>另外一些支持<script type="math/tex">\LaTeX</script>公式的方案可参考：Kramdown的<a href="http://kramdown.rubyforge.org/syntax.html#math-blocks">Math Blocks</a>、<a href="http://maruku.rubyforge.org/math.xhtml">Maruku的公式支持</a>。 其他和学术写作相关的插件有：<a href="https://github.com/inukshuk/jekyll-scholar">jekyll-scholar</a>、<a href="https://github.com/archome/jekyll-citation">jekyll-citation</a>、<a href="https://github.com/pablooliveira/bibjekyll">bibjekyll</a>。</p>


[TOC]

Markdown是读写性都非常好的轻量文本编辑语言，这个博客以及世界上许多博客的文章都是用其书写的。但是，在写“科研”博客时，难免会需要频繁地输入数学公式，而Markdown本身并不支持数学公式的输入。我曾经想偷懒直接用Markdown的语法去代替LaTeX数学公式，最后页面显示的结果有点儿丑。却一直也没有去修改。直到前天收到了[印卧涛](http://www.math.ucla.edu/%7Ewotaoyin/)老师的一封邮件，邮件里所有的数学公式都是用LaTeX代码写的，正规而美观。由此觉得自己做事还是水了点。做事要认真啊亲。

本文默认我们是会使用LaTeX编辑数学公式的。

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