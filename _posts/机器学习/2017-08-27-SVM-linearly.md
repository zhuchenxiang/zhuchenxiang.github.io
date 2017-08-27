---
layout: post
title: SVM：线性
category: 机器学习
tags: SVM
keywords: SVM 机器学习
description: 
---

* TOC
{:toc}

## 引言
上一节讨论了svm线性可分情况，一条直线可以完美的划分出两种类别。但是如果两种类别分布有交集呢数据本身线性不可分，或者说完全正确的分类就是最好的吗？

## 松弛因子
松弛变量 ($\xi\ge0$)。松弛变量允许错误的分类，引入松弛变量，约束条件改变为
$c_i(\vec{w}\vec{x_i}+b)\ge1-\xi_i$
完全错误的分类 $\xi_i\gt1$
正确分类，但是在过渡区外的域(边缘区域)内的 $0\lt\xi_i\lt1$
正确分类，且在过渡区外的 $\xi_i=0$
如果把$\xi$看成对每个点分错的惩罚，对于这次整体的惩罚，用超参数$\gamma$衡量

##目标函数
原目标函数及约束
$min_{w,b}\frac{1}{2}||\vec{w}||^2$
$c_i(\vec{w}.\vec{x_i}+b)\ge1$
 
$\Longrightarrow$ 

$min_{w,b,\xi}\frac{1}{2}||\vec{w}||^2 + \gamma\sum_{i=1}^{n}\xi_i $ 
约束 $c_i(\vec{w}\vec{x_i}+b)\ge1-\xi_i$  
     $\xi_i\ge0$

## 拉格朗日函数
原函数 $L(\vec{w},b,\alpha) = \frac{1}{2}||\vec{w}||^2 - \sum_{i=1}^{n}\alpha_i(c_i(\vec{w}.\vec{x_i}+b)-1)$

$\Longrightarrow$ 
$L(\vec{w},b,\xi,\alpha,\mu) = \frac{1}{2}||\vec{w}||^2 + \gamma\sum_{i=1}^{n}\xi_i - \sum_{i=1}^{n}\alpha_i(c_i(\vec{w}.\vec{x_i}+b)-1) - \sum_{i=1}^{n}\mu_i\xi_i$

### 按照线性可分步骤  对偶问题 求偏导 代入原L 
#### 对偶问题
$min_{w,b,\xi}max_{\alpha,\mu}L$
$\Longleftrightarrow$
$max_{\alpha,\mu}min_{w,b,\xi}L$

#### 对$w,b,\xi$求偏导
$\frac{\partial L}{\partial w}=0$ $\Longrightarrow$ $w^\mathsf{T}=\sum_{i=1}^{n}\alpha_ic_ix_i$
$\frac{\partial L}{\partial b}=0$ $\Longrightarrow$ $0=\sum_{i=1}^{n}\alpha_ic_i$ 
$\frac{\partial L}{\partial \xi}=0$ $\Longrightarrow$ $\gamma - \alpha_i -\mu_i = 0 $ 

#### 代入值
$L=\sum_{i=1}^{n}\alpha_i - \frac{1}{2}\sum_{ij=1}^{n}\alpha_i\alpha_jc_ic_jx_ix_j $

原问题$max_{\alpha,\mu}L$,对上式$\alpha$求max,同样处理为
$\frac{1}{2}\sum_{ij=1}^{n}\alpha_i\alpha_jc_ic_jx_ix_j-\sum_{i=1}^{n}\alpha_i$求min
约束 $0\lt\alpha_i\lt\gamma$ ; $0=\sum_{i=1}^{n}\alpha_ic_i$ 

## 列出最终结论
目标函数 $a^{*} = min_{\alpha}(\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}\alpha_i\alpha_jc_ic_j(x_ix_j) - \sum_{i=1}^{n}\alpha_i)$

约束 $0\lt\alpha_i\lt\gamma$ ; $0=\sum_{i=1}^{n}\alpha_ic_i$ 

超平面系数

$w^{*} =\sum_{i=1}^{n}\alpha_ic_ix_i$

$$b^{*} =\frac{max_{i:ci=-1}(wx_i) + min_{i:ci=1}(wx_i)}{2}$$

$b^{*}$即满足$0\lt\alpha_i\lt\gamma$的支撑向量所有值求平均

超平面
w*x  + b* = 0

分类器函数

f = sign(w*x  + b*)





