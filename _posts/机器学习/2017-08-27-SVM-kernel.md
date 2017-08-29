---
layout: post
title: SVM：非线性-核函数
category: 机器学习
tags: SVM
keywords: SVM 机器学习
description: 
---

如果数据完全线性不可分，使用使用一个映射函数-核函数，将原n维数据映射到n+k (k 0到∞)空间，在这个空间存在一个超平面分开数据。
![1](/public/img/machineL/svm/p_03.png)

假设映射函数为Φ，则原目标函数改为
$min_{\alpha}(\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}\alpha_i\alpha_jc_ic_j\Phi(x_i)\Phi(x_j) - \sum_{i=1}^{n}\alpha_i)$


核函数做了映射与点积，定义核函数为K。目标函数为
$min_{\alpha}(\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}\alpha_i\alpha_jc_ic_jK(x_i x_j) - \sum_{i=1}^{n}\alpha_i)$