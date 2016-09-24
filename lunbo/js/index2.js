function Lunbo(imgWid,imgNum){
    var container = $(".container");
    var imgList = $(".imgList");
    var dotList = $(".dotList");
    var dots = dotList.children();
    var prev = $(".prev");
    var next = $(".next");
    var imgWid,imgNum;
    var timer;//定时器
    // 左右按钮点击
    prev.click(function(){
        leftMove(imgWid,imgNum);
        tab(imgWid,imgNum);
    });
    next.click(function(){
        rightMove(imgWid,imgNum);
        tab(imgWid,imgNum);
    });
    //点击向左移动
    function leftMove(imgWid,imgNum){
        var left = parseInt(imgList.css("left")) + imgWid +'px';
        imgList.css('left',left);
        //判断一下点击到头的情况
        if(parseInt(imgList.css("left") ) > 0){
            imgList.css("left",-(imgWid*(imgNum-1)) + 'px');
        }
    }
    //点击向右移动
    function rightMove(imgWid,imgNum){
        var left = parseInt(imgList.css("left")) - imgWid + 'px';
        imgList.css('left',left);
        //判断一下移到头的情况
        if(parseInt(imgList.css("left")) < -(imgWid*(imgNum-1))){
            imgList.css("left", 0 + 'px');
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
                        imgList.css("left",(-imgWid * i + 'px'));
                    }
                }

            }
        }
    }
    dotHover(imgWid,imgNum);
    //点击时候正好对应这个点
    function tab(imgWid,imgNum) {
        var index = Math.abs(parseInt(imgList.css("left")) / imgWid);
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
            next.click();
        }, 3000)
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