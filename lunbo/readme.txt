index.html是一个实例，而index1.html为一个模板，已经封装成一个插件使用
逻辑思路：

1.轮播图的要求：
    1）自动播放，从左向右或从右向左
    2）点击左右按钮可以切换
    3）悬停时暂停播放，离开恢复
    4）悬停于dot可以切换到相应图片

2.所需要函数，分步：
    1)向左，向右点击切换函数
    2）悬停于dot时切换图片
    3）自动播放，定时器
    4）悬停时取消定时播放

注意事项：
//点击事件
    prev.onclick = function(){//如果是function(imgWid,imgNum)错误，
        //直接就执行了方法function(),而没有正确把这个方法对象赋给btn.onclick事件. 
        leftMove(imgWid,imgNum);
        tab(imgWid,imgNum);
    }


