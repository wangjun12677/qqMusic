(function($,root){
    // 播放play 暂停pause 获取音频资源getAudio
    function AudioManager(){
        // 创建一个音频Audio对象
        this.audio = new Audio();
        this.status = 'pause';//音频默认状态 暂停

    }

    AudioManager.prototype = {
        play : function(){
            this.audio.play();//播放音频
            this.status = 'play';//状态变成播放
        },
        pause : function(){
            this.audio.pause();//暂停音频
            this.status = 'pause';//状态变成播放
        },
        getAudio : function(src){
            console.log(src)
            this.audio.src = src;
            this.audio.load();
        },
        playTo : function(){
            this.audio.currentTime = time;
        }
    }

    root.audioManager = new AudioManager();

    // 也可以用下面这种方法暴露和接收
    // root.audioManager = AudioManage;//这里不new构造函数执行
    // //把构造函数暴露出去,方便在外部执行传参进来
    // var audio = root.audioManager;
    // new audio();


})(window.Zepto,window.player || (window.play = {}))