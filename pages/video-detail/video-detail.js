// pages/video-detail/video-detail.js
var app = getApp()

Page({
  data:{
    video: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    video_context: '',
    video_paused: true,
    last_tap_time: 0,
    db_tap_time: '',
    sig_tap_time: '', 
    tap_type: 1,
    collect: {
      src: '../../assets/thumb-up.gif',
      show: false
    },
    avar: '../../assets/morentouxiang@2x.png',
    like_src: '../../assets/like-gray@2x.png',
    liked_src: '../../assets/like-red@2x.png',
    sound_src: '../../assets/sounds-icon@2x.png',
    comment_src: '../../assets/comment@2x.png',
    comment_poke_src: '../../assets/poke.png',
    comment_poked_src: '../../assets/poked.png',
    video_data: null,
    comments_data: null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.data.video_context = wx.createVideoContext('videoDetail');
    that.initVideoDetail(options.id);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    var that = this;
    that.data.video_context.pause();
  },
  onUnload:function(){
    // 页面关闭
  },
  dealVideoTime: function(){
    var that = this;
    var cur_time = parseInt(new Date().getTime()/1000);
    var diff_time = cur_time-parseInt(that.data.video_data.createtime);
    var day = parseInt(Math.floor(diff_time / (60*60*24)));
    var hour = day >0 ? Math.floor((diff_time - day*1440)/60) : Math.floor(diff_time/60); 
    var minute = hour > 0 ? Math.floor(diff_time -day*1440 - hour*60) : diff_time;
    console.log(cur_time+'-'+that.data.video_data.createtime);
    if(day > 0){
      var month = new Date(parseInt(that.data.video_data.createtime)*1000).getMonth()+1;
      var date = new Date(parseInt(that.data.video_data.createtime)*1000).getDate();
      that.setData({
        'video_data.createtime': month+'-'+date
      });
    }else if(hour >= 0){
      that.setData({
        'video_data.createtime': hour+'小时前'
      });
    }else{
      if(minute>0){
        that.setData({
          'video_data.createtime': minute+'分钟前'
        });
      }else{
        that.setData({
          'video_data.createtime': '刚刚'
        });
      }
    }
  },
  dealCommentsTime: function(){
    var that = this;
    var cur_time = parseInt(new Date().getTime()/1000);
    var tmp_arr = that.data.comments_data.comments;
    for(let i = 0;i<that.data.comments_data.comments.length;i++){
      let diff_time = cur_time-parseInt(that.data.comments_data.comments[i].createtime);
      let day = parseInt(Math.floor(diff_time / (60*60*24)));
      console.log(diff_time);
      let hour = day >0 ? Math.floor((diff_time - day*1440)/60) : Math.floor(diff_time/(60*60));
      let minute = hour > 0 ? Math.floor(diff_time -day*1440 - hour*60) : Math.floor(diff_time/60);
      console.log(day+'--'+hour+'--'+minute);
      if(day > 0){
        let month = new Date(parseInt(that.data.comments_data.comments[i].createtime)*1000).getMonth()+1;
        let date = new Date(parseInt(that.data.comments_data.comments[i].createtime)*1000).getDate();
        that.data.comments_data.comments[i].createtime = month+'-'+date;
      }else if(hour > 0){
        that.data.comments_data.comments[i].createtime = hour+'小时前';
      }else{
        if(minute>0){
          that.data.comments_data.comments[i].createtime = minute+'分钟前';
        }else{
          that.data.comments_data.comments[i].createtime = diff_time+'秒前';
        }
      }
    }
    for(let i = 0;i<that.data.comments_data.hot_comments.length;i++){
      let diff_time = cur_time-parseInt(that.data.comments_data.hot_comments[i].createtime);
      let day = parseInt(Math.floor(diff_time / (60*60*24)));
      let hour = day >0 ? Math.floor((diff_time - day*1440)/60) : Math.floor(diff_time/(60*60)); 
      let minute = hour > 0 ? Math.floor(diff_time -day*1440 - hour*60) : Math.floor(diff_time/60);
      if(day > 0){
        let month = new Date(parseInt(that.data.comments_data.hot_comments[i].createtime)*1000).getMonth()+1;
        let date = new Date(parseInt(that.data.comments_data.hot_comments[i].createtime)*1000).getDate();
        that.data.comments_data.hot_comments[i].createtime = month+'-'+date;
      }else if(hour > 0){
        that.data.comments_data.hot_comments[i].createtime = hour+'小时前';
      }else{
        if(minute>0){
          that.data.comments_data.hot_comments[i].createtime = minute+'分钟前';
        }else{
          that.data.comments_data.hot_comments[i].createtime = diff_time+'秒前';
        }
      }
    }
    that.setData({
      'comments_data': that.data.comments_data
    });
  },
  pauseHandler: function(){
    var that = this;
    that.data.video_paused = true;
  },
  playHandler: function(){
    var that = this;
    that.data.video_paused = false;
  },
  initVideoDetail: function(videoid){
    var that = this;
    var data = {
      videoid: videoid
    };
    var data2 = {
      videoid: videoid,
      page: 1,
      limit: 20
    }
    app.post_request(app.globalData.API_LIST.TEST.video_detail, data, that.initVideoSuccess);
    app.post_request(app.globalData.API_LIST.TEST.video_comments, data2, that.initCommentsSuccess);
  },
  initVideoSuccess: function(res){
    var that = this;
    if(res.data.code == 200){
      that.setData({
        video_data: res.data.data
      });
      that.dealVideoTime();
    }else{
      
    }
  },
  initCommentsSuccess: function(res){
    var that = this;
    if(res.data.code == 200){
      var tmp_arr = res.data.data;
      for(let i=0;i<tmp_arr.comments.length;i++){
        tmp_arr.comments[i].ispoked = false;
      }
      that.setData({
        comments_data: tmp_arr
      });
      that.dealCommentsTime();
    }else{

    }
  },
  videoTapHandler: function(e){
    var that = this;
    var cur_time = e.timeStamp;
    var last_time = that.data.last_tap_time;
    if(last_time > 0){
      if(cur_time - last_time < 500){
        if(that.data.tap_type == 2){
          that.sigTapHandler();
        }else{
          that.dbTapHandler();
        that.setData({
          db_tap_time: e.timeStamp,
          tap_type: 2
        });
        }
      }else{
        that.setData({
          sig_tap_time: e.timeStamp,
          tap_type: 1
        });
      }
    }else{
      that.setData({
        sig_tap_time: e.timeStamp,
        tap_type: 1
      });
    }
    that.setData({
      last_tap_time: e.timeStamp
    });
    setTimeout(function(){
      if(that.data.tap_type == 1){
        if(that.data.sig_tap_time <= that.data.db_tap_time){
          return;
        }else{
          that.sigTapHandler();
        }
      }
    }, 500);
  },
  collectHandler: function(e){
    var that = this;
    var data = {
      videoid: that.data.video_data.videoid
    }
    if(that.data.video_data.ispraise){
      app.post_request(app.globalData.API_LIST.TEST.cancel_praise_video, data, that.collectSuccess);
    }else{
      app.post_request(app.globalData.API_LIST.TEST.praise_video, data, that.collectSuccess);
    }
  },
  collectSuccess: function(res){
    var that = this;
    if(res.data.code == 200){
      if(that.data.video_data.ispraise){
        that.setData({
          'video_data.ispraise': 0,
          'video_data.praisecount': that.data.video_data.praisecount-1
        });
      }else{
        that.setData({
          'video_data.ispraise': 1,
          'video_data.praisecount': that.data.video_data.praisecount+1
        });
      }
    }else{
      
    }
  },
  sigTapHandler: function(){
    var that = this;
    if(!that.data.video_paused){
      that.data.video_context.pause();
    }else{
      that.data.video_context.play();
    }
    that.setData({
      video_paused: !that.data.video_paused
    });
  },
  dbTapHandler: function(){
    var that = this;
    console.log('db tap');
    if(that.data.collect.show){
      return;
    }
    that.setData({
      'collect.show': true
    });
    setTimeout(function(){
      that.setData({
        'collect.show': false
      });
    }, 1600);
  },
  praiseHandler: function(e){
    var that = this;
    var index = e.currentTarget.dataset.cindex;
    var commentid = e.currentTarget.dataset.commentid;
    var data = {
      commentid: commentid,
      videoid: that.data.video_data.videoid
    }
    app.post_request(app.globalData.API_LIST.TEST.praise_comment, data, function(res){
      if(res.data.code == 200){
        that.data.comments_data.comments[index].ispoked = true;
        that.data.comments_data.comments[index].praises = parseInt(that.data.comments_data.comments[index].praises)+1;
        that.setData({
          comments_data: that.data.comments_data
        });
      }
    });
  },
  hotPraiseHandler: function(e){
    var that = this;
    var index = e.currentTarget.dataset.cindex;
    var commentid = e.currentTarget.dataset.commentid;
    var data = {
      commentid: commentid,
      videoid: that.data.video_data.videoid
    }
    app.post_request(app.globalData.API_LIST.TEST.praise_comment, data, function(res){
      if(res.data.code == 200){
        that.data.comments_data.hot_comments[index].ispoked = true;
        that.data.comments_data.hot_comments[index].praises = parseInt(that.data.comments_data.hot_comments[index].praises)+1;
        that.setData({
          comments_data: that.data.comments_data
        });
      }
    });
  }
})