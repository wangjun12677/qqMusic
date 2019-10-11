(function($,root){
    // 渲染总的时间
    var duration = 0;
    var frameId = null;
    var startTime = null;
    var lastPer = 0;
    
    function randerAllTime(time){
        duration = time;
        time = formatTime(time);
        $('.all-time').html(time)
    }

    // 格式化：将秒转换成分
    function formatTime(t){
        t = Math.round(t);//取整
        //t为传过来的总秒数
        var m = Math.floor(t / 60);//把传过来的秒单位时间转换成分钟
        var s = t - m * 60;//余下的秒数
        if(m < 10){
            m = '0' + m
        }
        if(s < 10){
            s = '0' + s
        }
        return m + ':' + s
    }

    // 渲染当前播放事件
    function start(){
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            update(per)
            frameId = requestAnimationFrame(frame);//动画
        }
        frame();
    }

    function stop(){
        cancelAnimationFrame(frameId);
        var curTime = new Date().getTime();
        var per = (curTime - startTime) / (duration * 1000);
        lastPer += per
    }

    // 更新当前时间
    function update(per){
        var curTime = per * duration;
        curTime = formatTime(curTime);
        $('.cur-time').html(curTime);
        var translateX = (per - 1) * 100 + '%';
        $('.loading-top').css({
            transform : 'translateX('+ translateX +')'
        })
        console.log(per)
    }




    // 进度条运动

    root.loading = {
        randerAllTime : randerAllTime,//暴露总时间
        start : start,//暴露当前时间
        stop : stop,
        update : update
    }

})(window.Zepto,window.player || (window.player = {}))