window.onload = function () {
    var container = document.getElementsByClassName('container')[0];
    var imgList = document.getElementsByClassName('imgList')[0];
    var images = imgList.children;
    var dotList = document.getElementsByClassName('dotList')[0];
    var dots = dotList.children;
    var prev = document.getElementsByClassName('prev')[0];
    var next = document.getElementsByClassName('next')[0];
    var timer;//定时器
    // 左右按钮点击
    prev.onclick = function(){
        leftMove();
        tab();
    }
    next.onclick = function(){
        rightMove();
        tab();
    }
    //向左点击移动
    function leftMove() {
        imgList.style.left = parseInt(imgList.style.left) + 800 + 'px';
        //判断一下点击到头的情况
        if (parseInt(imgList.style.left) > 0) {
            imgList.style.left = -3200 + 'px';
        }
    }
    //向右点击移动
    function rightMove() {
        imgList.style.left = parseInt(imgList.style.left) - 800 + 'px';
        //判断一下点击到头的情况
        if (parseInt(imgList.style.left) < -3200) {
            console.log(imgList.style.left);
            imgList.style.left = 0 + 'px';
        }
    }
    //小圆点hover时显示对应的图片
    for(var i =0;i<dots.length;i++){
        dots[i].onmouseover = function(){
            //让所有的圆点都处于未点击状态
            for(var i=0;i<dots.length;i++){
                if(dots[i].className == 'on'){
                    dots[i].className = '';
                }
            }
            this.className = 'on';
            //并让点的index对应图片的index
            for(var i=0;i<dots.length;i++){
                if(dots[i].className=='on'){
                    imgList.style.left = -800 * i +'px';
                }
            }
        }
    }
    // 左右按钮点击时正好对应相关索引的点
    function tab() {
        var index = Math.abs(parseInt(imgList.style.left)/800);
        for (var i = 0; i < dots.length; i++) {
            if (i !== index) {
                if (dots[i].className == 'on') {
                    dots[i].className = '';
                } else {
                    dots[index].className='on';
                }
            }
        }
    }
    //设置定义器自动轮播，实际触发向右点击事件
    function go(){
        timer = setInterval(function(){
            next.onclick();
        },3000);
    }
    go();
    //鼠标悬停时暂停轮播
    container.onmouseover = function(){
        clearTimeout(timer);
    };
    container.onmouseout = function(){
        go();
    };
}