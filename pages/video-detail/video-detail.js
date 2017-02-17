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
    comment_link_src: '../../assets/like@2x.png',
    video_data: {
      "videoid":"13201381",
      "scid":"jzx0DKta1LtnJcPYpOZPqA__",
      "title":"原创视频",
      "memberid":"10003754",
      "cover":"https://gslb.miaopai.com/stream/jzx0DKta1LtnJcPYpOZPqA___m.jpg",
      "linkurl":"https://gslb.miaopai.com/stream/jzx0DKta1LtnJcPYpOZPqA__.mp4",
      "voiceid":999, // 音乐ID，999表示是原创视频，没有音乐
      "hits":0, // 视频浏览数
      "topiccount":3,  // 视频评论数
      "praisecount":25, // 视频被赞数
      "status":"1",
      "lon":"0",
      "lat":"0",
      "type":4,
      "desc":null,
      "updatetime":"1486461470",
      "createip":"168434004",
      "createtime":"1486461470",
      "upkey":21,
      "sign":"f3bbc4a9b91051b28469dfc255b7bb64",
      "expiration_time":1486979451000,
      "nickname":"小丁测试",
      "avatar":"https://alcdn.img.xiaoka.tv/20170105/d8c/e3c/0/d8ce3c7fae8b2b41f45ae11090e9448e.jpg",
      "mtype":0,
      "mtypename":"普通",
      "integral":0,
      "sex":0,
      "ispraise":0, // 登录用户是否赞过该视频
      "musictitle":"" // 音乐ID
    },
    comments_data: {
      "current_page":1,
      "limit":30,
      "count":3,
      "total":3,

      // 热门评论列表
      "hot_comments":[        ],
      // 最新评论列表
      "comments":[
          {
              "id":"1071017",
              "videoid":"13201381",
              "memberid":"10003754",
              "ts":"100",
              "content":"[微笑][微笑] ", // 评论内容
              "createtime":"1486951990", // 评论时间
              "praises":"0", // 评论赞数
              "nickname":"小丁测试", // 评论人昵称
              "avatar":"https://alcdn.img.xiaoka.tv/20170105/d8c/e3c/0/d8ce3c7fae8b2b41f45ae11090e9448e.jpg",
              "mtype":0, // 用户类型 0普通用户 1达人 2明星
              "mtypename":"普通",
              "integral":0
          },
          {
              "id":"1071016",
              "videoid":"13201381",
              "memberid":"10003754",
              "ts":"100",
              "content":"[哈哈][哈哈] ",
              "createtime":"1486951821",
              "praises":"0",
              "nickname":"小丁测试",
              "avatar":"https://alcdn.img.xiaoka.tv/20170105/d8c/e3c/0/d8ce3c7fae8b2b41f45ae11090e9448e.jpg",
              "mtype":0,
              "mtypename":"普通",
              "integral":0
          },
          {
              "id":"1071015",
              "videoid":"13201381",
              "memberid":"10003754",
              "ts":"3000",
              "content":"[嘻嘻][嘻嘻][嘻嘻] ",
              "createtime":"1486951775",
              "praises":"0",
              "nickname":"小丁测试",
              "avatar":"https://alcdn.img.xiaoka.tv/20170105/d8c/e3c/0/d8ce3c7fae8b2b41f45ae11090e9448e.jpg",
              "mtype":0,
              "mtypename":"普通",
              "integral":0
          }
      ],
      "page":1
    }
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
  },
  onUnload:function(){
    // 页面关闭
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
    }else{
      
    }
  },
  initCommentsSuccess: function(res){
    var that = this;
    if(res.data.code == 200){
      that.setData({
        comments_data: res.data.data
      });
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
  }
})