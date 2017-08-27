---
layout: post
title: SVM：线性可分
category: 机器学习
tags: SVM
keywords: SVM 机器学习
description: 
---

[TOC]

## 引例
    平面上有两种颜色(红色,蓝色)的点，如果用一条线可以完美的分开它们,即平面上的点线性可分。
    分开两种颜色的直线，有多种画法。SVM就是在无数条可以分类的直线中选择一条最佳的，这条直线距离两个类别最近点，都一样远。  
    而距离这分界线最近的点，就是Support  vector。这些vectors（点点）support了这条线，如果去掉这些点，分界线多半需要改变位置。
![1](/public/img/machineL/svm/p_01.png)

### 超平面
    平面上有两种颜色的球，用一条线分开它们。
    三维空间有两种颜色的球，用一个平面分开它们。
    n维空间上有两种颜色的离散立体，可以用一个(n-1维)面分开两种它们。
    将这个 (n-1维)面 统一叫 超平面（Hyper Plane）

## 如何选择最佳超平面
    假设样本点到超平面距离为d，则最近样本点为min[d]。
    我们希望最靠近的点，到分割面的距离尽量大，即 max[min[d]]。

## 推导

### 公式1: 点到线、面距离 

|       直线      |         平面         |             超平面              |
|-----------------|----------------------|---------------------------------|
| $w_1x+w_2y+b=0$ | $w_1x+w_2y+w_3z+b=0$ | $w_1x+w_2y+w_3z+ ... +w_nn+b=0$ |
| 点P($x_0,y_0$)  | 点P($x_0,y_0,z_0$)   | 点P($x_0,y_0,z_0,...n_0$)       |

点($x_0,y_0$)到直线距离$
d = \frac{|w_1 x_0 + w_2 y_0 + b|}{\sqrt{w_1^2+w_2^2}}
$
点($x_0,y_0,z_0$) 到面距离$
d = \frac{|w_1 x_0 + w_2 y_0 + w_3 z_0 + b|}{\sqrt{w_1^2+w_2^2+w_3^2}}
$
点($x_0,y_0,z_0,...n_0$)到超平面距离$
d = \frac{|w_1 x_0 + w_2 y_0 + w_3 z_0 + ... +w_nn_0 + b|}{\sqrt{w_1^2+w_2^2+w_3^2+...++w_n^2}}
$
### 公式1: 向量表现形式
$
f(x)=w_1x+w_2y+w_3z+ ... +w_nn+b 
 =  \begin{bmatrix}
      w_1 w_2 ... w_n
    \end{bmatrix} . 
    \begin{bmatrix}
      x y ... n
    \end{bmatrix}
    ^\mathsf{T} + b
 = \vec{w}.\vec{x}+b=0
$
$
d = \frac{|w_1 x_0 + w_2 y_0 + w_3 z_0 + b|}{\sqrt{w_1^2+w_2^2+w_3^2}}
  =\frac{|\vec{w}.\vec{x}+b|}{||\vec{w}||}
  =\frac{|f(x_i)|}{||\vec{w}||} 
$
$||\vec{w}||$为向量w的2范数。


### 目标函数
定义点$x_i$,属于类别$c_i$,($c_i$ $\in$ (+1,-1)， +1表示在法线方向上，-1表示在法线反方向)。
 
$f(x_i)>0$  $\Longleftrightarrow$ $c_i=+1$ $\Longleftrightarrow$ $f(x_i)c_i$>0
$f(x_i)<0$  $\Longleftrightarrow$ $c_i=-1$ $\Longleftrightarrow$ $f(x_i)c_i$>0
则距离公式可以表达为 $ d =\frac{|f(x_i)|}{||\vec{w}||} = \frac{c_if(x_i)}{||\vec{w}||} =\frac{c_i(\vec{w}.\vec{x}+b)}{||\vec{w}||}$

所以目标函数为$max_{w,b}[\min_{i}\frac{c_i(\vec{w}.\vec{x_i}+b)}{||\vec{w}||}]$


### 函数间隔 几何间隔
样本点$x_{i}$与超平面f(x)之间的函数间隔定义为
$\gamma_{i} = c_if(x_i)=c_i(\vec{w}.\vec{x_i}+b) $ 
函数间隔决定了数据点被分为某一类的确信度。因为$c_if(x_i)$>0则表示分类正确,$c_if(x_i)$值越大，表示越可信。
但是当(w,b)进行缩放时，超平面并没有改变，但是函数间隔却变化了。所以需要$||\vec{w}||$大小固定。
几何间隔实际就是点到平面距离。
固定$||\vec{w}||$ $\Longleftrightarrow$ 增加一个约束,使$||\vec{w}||$=常数。
我们不妨设置这个约束为，缩放$\vec{w}$后，距离超平面最近的点$x_{i}$使得$|f(x_i)|=1$

### 重新建立目标函数
$max_{w,b}[\min_{i}\frac{c_i(\vec{w}.\vec{x_i}+b)}{||\vec{w}||}]$
$\Longleftrightarrow$
$max_{w,b}[\frac{1}{||\vec{w}||}\min_{i}c_i(\vec{w}.\vec{x_i}+b)]$
约束条件
$c_i(\vec{w}.\vec{x_i}+b)\ge1$
$|f(x_i)|=1$
$\Longleftrightarrow$
新目标函数
$max_{w,b}\frac{1}{||\vec{w}||}$
约束条件
$c_i(\vec{w}.\vec{x_i}+b)\ge1$
$\Longleftrightarrow$
$min_{w,b}\frac{1}{2}||\vec{w}||^2$
$c_i(\vec{w}.\vec{x_i}+b)\ge1$

## 求目标函数极值
### 公式2：拉格朗日乘子法
$c_i(\vec{w}.\vec{x_i}+b)\ge1$
$\Longleftrightarrow$
$c_i(\vec{w}.\vec{x_i}+b)-1\ge0$ (等于0的点，即为距离超平面最近点)

$\Longleftrightarrow$ 写出如下表达式(拉格朗日乘子法,增加系数$\alpha$)

$L(\vec{w},b,\alpha) = \frac{1}{2}||\vec{w}||^2 - \sum_{i=1}^{n}\alpha_i(c_i(\vec{w}.\vec{x_i}+b)-1)$

$\Longleftrightarrow$ 原问题$min_{w,b}\frac{1}{2}||\vec{w}||^2$转化为

$min_{w,b}max_{\alpha}L(\vec{w},b,\vec{\alpha})$

### 公式3：对偶问题

$\Longleftrightarrow$ 对偶问题
$max_{\alpha}min_{w,b}L(\vec{w},b,\vec{\alpha})$

### 公式4：偏导 求极值
将拉格朗日函数$L(\vec{w},b,\alpha)$分别对w,b求偏导，并令其为0
$\frac{\partial L}{\partial w}=0$ $\Longrightarrow$ $w^\mathsf{T}=\sum_{i=1}^{n}\alpha_ic_ix_i$
$\frac{\partial L}{\partial b}=0$ $\Longrightarrow$ $0=\sum_{i=1}^{n}\alpha_ic_i$ 

### 将结果代入拉格朗日函数
$L(\vec{w},b,\alpha) = \frac{1}{2}||\vec{w}||^2 - \sum_{i=1}^{n}\alpha_i(c_i(\vec{w}.\vec{x_i}+b)-1)$

=$\frac{1}{2}\vec{w}\vec{w}^\mathsf{T} + \sum_{i=1}^{n}\alpha_i -b\sum_{i=1}^{n}\alpha_i c_i - \vec{w}\sum_{i=1}^{n}\alpha_i c_i \vec{x_i}$

(代入公式4求出的0=$\sum_{i=1}^{n}\alpha_ic_i$ )

=$\frac{1}{2}\vec{w}\vec{w}^\mathsf{T} + \sum_{i=1}^{n}\alpha_i -b *0 - \vec{w}\sum_{i=1}^{n}\alpha_i c_i \vec{x_i}$

=$\frac{1}{2}\vec{w}\vec{w}^\mathsf{T} + \sum_{i=1}^{n}\alpha_i - \vec{w}\sum_{i=1}^{n}\alpha_i c_i \vec{x_i}$

=$ \sum_{i=1}^{n}\alpha_i + \frac{1}{2}\vec{w}\vec{w}^\mathsf{T} - \vec{w}\sum_{i=1}^{n}\alpha_i c_i \vec{x_i}$

(代入公式4求出的$w^\mathsf{T}=\sum_{i=1}^{n}\alpha_ic_ix_i$ )

=$ \sum_{i=1}^{n}\alpha_i + \frac{1}{2}\vec{w}\vec{w}^\mathsf{T} - \vec{w}\vec{w}^\mathsf{T}$

=$ \sum_{i=1}^{n}\alpha_i - \frac{1}{2}\vec{w}\vec{w}^\mathsf{T}$

=$ \sum_{i=1}^{n}\alpha_i - \frac{1}{2}\sum_{ij=1}^{n}\alpha_i\alpha_jc_ic_jx_ix_j$

### 整理出最终目标函数
$max_{\alpha}L(\vec{w},b,\vec{\alpha})$  $\Longrightarrow$ 
$a^{*} = max_{\alpha}(\sum_{i=1}^{n}\alpha_i - \frac{1}{2}\sum_{ij=1}^{n}\alpha_i\alpha_jc_ic_jx_ix_j)$

$\Longrightarrow$ 

$a^{*} = min_{\alpha}(\frac{1}{2}\sum_{ij=1}^{n}\alpha_i\alpha_jc_ic_jx_ix_j - \sum_{i=1}^{n}\alpha_i)$

$\Longrightarrow$ 

$a^{*} = min_{\alpha}(\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}\alpha_i\alpha_jc_ic_j(x_ix_j) - \sum_{i=1}^{n}\alpha_i)$


约束条件0=$\sum_{i=1}^{n}\alpha_ic_i$

求出最优$a^{*}$

## 列出最终结论

目标函数 $a^{*} = min_{\alpha}(\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}\alpha_i\alpha_jc_ic_j(x_ix_j) - \sum_{i=1}^{n}\alpha_i)$

约束 0=$\sum_{i=1}^{n}\alpha_ic_i$  且 $\alpha_i>0$


超平面系数

$w^{*} =\sum_{i=1}^{n}\alpha_ic_ix_i$

$b^{*} =ci-\sum_{i=1}^{n}\alpha_ic_i(x_ix_j)$

超平面
w*x  + b* = 0

分类器函数

f = sign(w*x  + b*)




