var root = window.player;
var len;
var audio = root.audioManager;//接收音频暴露的对象
var control = null;
var timer = null;
var duration = 0;

//获取信息
function getDate(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            // console.log(data);
            len = data.length;
            control = new root.controlIndex(len);//接收indexControl里暴露出来的构造函数
            root.render(data[0])//默认加载第一条数据
            audio.getAudio(data[0].audio)
            root.loading.randerAllTime(data[0].duration)
            duration = data[0].duration;
            bindEvent(data)
            bindTouchEvent();
        },
        error:function(){
            console.log("error");
        }
    })
}

//点击事件
function bindEvent(data){
    $('body').on('play:change',function(e,index){//自定义事件
        audio.getAudio(data[index].audio)//重新加载音频
        root.render(data[index])//重新渲染数据
        root.loading.randerAllTime(data[index].duration)
        duration = data[index].duration
        if(audio.status == 'play'){
            audio.play();
            root.loading.start()
            rotated(0);
        }
        $('.img-box').attr('data-deg',0)
        $('.img-box').css({
            'transform' : 'rotateZ('+ 0 +'deg)',
            'transition' : 'none',
        })
    })
    $('.prev-btn').on('click',function(){//点击向前按钮重新渲染数据
        var i = control.prev()
        $('body').trigger('play:change',i)//触发自定义事件
        
    })
    $('.next-btn').on('click',function(){
        var i = control.next()
        $('body').trigger('play:change',i)
    })
    $('.play-btn').on('click',function(){
        if(audio.status == 'pause'){//如果音频状态为暂停
            audio.play();//执行音频的play方法
            root.loading.start()
            var deg = $('.img-box').attr('data-deg')
            rotated(deg);
        }else{
            audio.pause();
            root.loading.stop()
            clearInterval(timer)
        }
        $(this).toggleClass('playing')//切换播放按钮图片
    })
}

function bindTouchEvent(){
    var left = $('.loading-bottom').offset().left;
    var width = $('.loading-bottom').offset().width;
    $('.spot').on('touchstart',function(e){
        root.loading.stop();
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX - left
        var per = x / width;
        if(per >=0 && per < 1){
            root.loading.update(per)
        }
        
        console.log(per)
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX - left
        var per = x / width;
        var curTime = per * duration;
        if(per >=0 && per < 1){
            root.loading.update(curTime)
            audio.play()
        }
        
    })
}

// 图片旋转
function rotated(deg){
    clearInterval(timer)
    deg = +deg;//字符串类型转换成数据类型
    timer = setInterval(function(){
        deg += 2;
        $('.img-box').attr('data-deg',deg)
        $('.img-box').css({
            'transform' : 'rotateZ('+ deg +'deg)',
            'transition' : 'all 1s ease-out',
        })
    },400)
}

getDate("../mock/data.json");