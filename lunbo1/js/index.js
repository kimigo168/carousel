$(document).ready(function(){
    // 底部navigation points悬停时变换背景色，并切换图片
    $('.banner ol li').hover(function(){
        $(this).addClass('current').siblings().removeClass('current');
        var i = $(this).index();//获取当前index编号
        num =i;//把当前hover的编号给num，让num沿着继续播放
        $('.banner ul').stop().animate({left:-i*800},500);
    });
    //自动播放
    var timer = null;
    var num = 0;
    timer = setInterval(autoPlay,3000);
    //自动播放函数
    function autoPlay(){
        num++;
        if(num>5){
            num=0;
            $('.banner ul').css("left",'0').stop().animate({left:-800},500);
            // 播放到第二张时
            num = 1;
            // 导航点列定位到1
            $('.banner ol li').eq(1).addClass('current').siblings().removeClass('current');
        }else{
            $('.banner ul').stop().animate({left:-num*800},500);
            $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');
        }
        if(num==5){//播放到编号5，第6张图时，将其点设到第一个
            $('ol li').eq(0).addClass('current').siblings().removeClass('current');
        }
    }
    // 向左自动播放函数
    function prevPlay(){
        num--;
        if(num<0){
            $('.banner ul').css('left','-4000px').stop().animate({left:-3200},500);
            num = 4;
            // 导航点列定位到1
            $('.banner ol li').eq(4).addClass('current').siblings().removeClass('current');
        }else{
            $('.banner ul').stop().animate({left:-num*800},500);
            $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');
        }
    }
    //鼠标经过，停止轮播
    $('.banner').mouseenter(function(){
        clearInterval(timer);
        $('.banner i').fadeIn();
    }).mouseleave(function(){
        timer = setInterval(autoPlay,3000);
        $('.banner i').fadeOut();
    });
    //向右点击
    $('.banner .right').click(function(){
        autoPlay();
    });
    // 向左点击
    $('.banner .left').click(function(){
        prevPlay();
    });
});