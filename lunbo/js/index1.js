function lunBo(imgWid,imgNum) {
    //获取一堆元素
    var container = document.getElementsByClassName('container')[0];
    var imgList = document.getElementsByClassName('imgList')[0];
    var images = imgList.children;
    var dotList = document.getElementsByClassName('dotList')[0];
    var dots = dotList.children;
    var prev = document.getElementsByClassName('prev')[0];
    var next = document.getElementsByClassName('next')[0];
    var timer;//这是一个定时器
    var imgWid;
    var imgNum;
    //点击事件
    prev.onclick = function(){//如果是function(imgWid,imgNum)错误，
        //直接就执行了方法function(),而没有正确把这个方法对象赋给btn.onclick事件. 
        leftMove(imgWid,imgNum);
        tab(imgWid,imgNum);
    }
    next.onclick = function(){
        rightMove(imgWid,imgNum);
        tab(imgWid,imgNum);
    }
    //点击向左移动
    function leftMove(imgWid,imgNum){
        imgList.style.left = parseInt(imgList.style.left) + imgWid +'px';
        //判断一下点击到头的情况
        if(parseInt(imgList.style.left) > 0){
            imgList.style.left = -(imgWid*(imgNum-1)) + 'px';
        }
    }
    //点击向右移动
    function rightMove(imgWid,imgNum){
        imgList.style.left = parseInt(imgList.style.left) - imgWid + 'px';
        //判断一下移到头的情况
        if(parseInt(imgList.style.left) < -(imgWid*(imgNum-1))){
            imgList.style.left = 0 + 'px';
        }
    }
    function dotHover(imgWid,imgNum){
        for (var i = 0; i < imgNum; i++) {
        //让所有圆点都是未点击状态
            dots[i].onmouseover = function () {
                for (var i = 0; i < imgNum; i++) {
                    if (dots[i].className == 'on') {
                        dots[i].className = '';
                    }
                }
                this.className = 'on';
                //让点的index对应图片的index
                for (var i = 0; i < imgNum; i++) {
                    if (dots[i].className == 'on') {
                        imgList.style.left = -imgWid * i + 'px';
                    }
                }

            }
        }
    }
    // dotHover(imgWid,imgNum);
    //点击时候正好对应这个点
    function tab(imgWid,imgNum) {
        var index = Math.abs(parseInt(imgList.style.left) / imgWid);
        for (var i = 0; i < imgNum; i++) {
            if (i !== index) {
                if (dots[i].className == 'on') {
                    dots[i].className = '';
                } else {
                    dots[index].className = 'on';
                }
            }
        }
    }
    //设置个定时器自动轮播,实际上就是触发点击事件
    function go() {
        timer = setInterval(function () {
            next.onclick(imgWid,imgNum);
        }, 4000)
    }
    go();
    //鼠标放上去清除定时器,鼠标移开再重新开始
    container.onmouseover = function () {
        clearTimeout(timer);
    };
    container.onmouseout = function () {
        go();
    };

}
