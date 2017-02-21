// pages/sound-detail/sound-detail.js
var app = getApp()
const ImgLoader = require('../../img-loader/img-loader.js')

//生成一些测试数据
function genImgListData() {
    let images = [
      'https://vi0.6rooms.com/live/2016/05/14/13/1010v1463205486224638751_s.jpg',
      'https://vi0.6rooms.com/live/2017/02/07/22/1010v1486477746478348170_s.jpg',
      'https://vi3.6rooms.com/live/2017/01/17/16/1010v1484642985877067700_s.jpg',
      'https://vi1.6rooms.com/live/2017/02/06/23/1010v1486394883504544980_s.jpg'
    ]
    images = images.concat(images.slice(0, 4))
    return images.map(item => {
        return {
            url: item,
            loaded: false
        }
    })
}

Page({
  data: {
    img_list: [],
    sound_context: '',
    sound_paused: true,
    avar: '../../assets/morentouxiang@2x.png',
    sound_pause_src: '../../assets/sound-pause@2x.png',
    sound_play_src: '../../assets/sound-play@2x.png',
    cover_src: 'https://vi1.6rooms.com/live/2017/02/06/23/1010v1486394883504544980_s.jpg',
    animation_data: {},
    animation_deg: 0, 
    animation_interval: null,
    sound_data: {
      "country":"cn",
      "video":"",
      "dig":"21130",  // 收藏数
      "audio":"http://wscdn.miaopai.com/xkx4/2015/0729/c4e142e0099cff7b46e7fff2968f1a3b.mp3",
      "subtitles":"",
      "language":"zh-cn-0",
      "lyricfile":"",
      "filtername":"",
      "parentid":"#1#",
      "score":"0",
      "figure":"",
      "mood":"2",
      "shorttitle":"萌萌哒", // 音乐短标题
      "title":"萌萌哒", // 音乐标题
      "filters":{"ios":"","android":""},
      // 封面
      "cover":"http://wscdn.miaopai.com/xkx4/2015/0729/adc9179a08583e62e3d8a4610a967485.png", 
      "opusnum":"1884", // 作品数
      "updatetime":"1480496280",
      "level":"2",
      "videos":{"h":"","m":""},
      "duration":"33024",
      "actor":"童可可", // 作者
      "num":"1",
      "topic":"#沪上网红节#", // 话题
      "musicid":"201232",
      "status":"1",
      "class_order":"0",
      "package_id":"0",
      "pack_start":0,
      "account_lyric":"",
      "classid":"#1001#",
      "smallcover":"",
      "pack_end":0,
      "createtime":"1438152381",
      "themeType":"0",
      "package_info":"",
      "iscollect":0,
      // 演员
      "actors":[
          {
              "classid":"20224",
              "name":"蔡少芬",
              "parentid":"4",
              "listorder":"0",
              "classtype":"0",
              "ishide":"0",
              "createtime":"0",
              "updatetime":"0",
              "cover":"",
              "description":"",
              "dig":"0",
              "opusnum":"27189",
              "musicids":"",
              "isdel":"1",
              "no_collect":"",
              "icon":""
          }
      ]
    },
    video_data: {
      "current_page":1,
      "limit":30,
      "count":5,
      "total":6,
      "music":{
          "country":"cn",
          "video":"",
          "dig":"21130",
          "audio":"http://wscdn.miaopai.com/xkx4/2015/0729/c4e142e0099cff7b46e7fff2968f1a3b.mp3",
          "subtitles":"",
          "language":"zh-cn-0",
          "lyricfile":"",
          "filtername":"",
          "parentid":"#1#",
          "score":"0",
          "figure":"",
          "mood":"2",
          "shorttitle":"萌萌哒",
          "title":"萌萌哒",
          "filters":{"ios":"","android":""},
          "cover":"http://wscdn.miaopai.com/xkx4/2015/0729/adc9179a08583e62e3d8a4610a967485.png",
          "opusnum":"1884",
          "updatetime":"1480496280",
          "level":"2",
          "videos":{"h":"","m":""},
          "duration":"33024",
          "actor":"童可可",
          "num":"1",
          "topic":"#沪上网红节#",
          "musicid":"201232",
          "status":"1",
          "class_order":"0",
          "package_id":"0",
          "pack_start":0,
          "account_lyric":"",
          "classid":"#1001#",
          "smallcover":"",
          "pack_end":0,
          "createtime":"1438152381",
          "themeType":"0",
          "package_info":"",
          "iscollect":0
      },
      "videos":[
          {
              "videoid":"13201076",
              "scid":"L68qBIjOUtNz8D8a1FFMyQ__",
              "title":"萌萌哒",
              "memberid":"16626015",
              "cover":"http://qncdn.miaopai.com/stream/L68qBIjOUtNz8D8a1FFMyQ___m.jpg",
              "linkurl":"https://gslb.miaopai.com/stream/L68qBIjOUtNz8D8a1FFMyQ__.mp4",
              "voiceid":"201232",
              "hits":19,
              "topiccount":0,
              "praisecount":1,
              "status":"1",
              "lon":"116",
              "lat":"40",
              "type":0,
              "desc":"",
              "updatetime":"1480665312",
              "createip":"168435255",
              "createtime":"1480665312",
              "upkey":21,
              "sign":"209da0eccfaf172546f56562f03b21d3",
              "expiration_time":1487055467000
          },
          {
              "videoid":"13201281",
              "scid":"L8T6Zi4BeZRqACdAOGqQsQ__",
              "title":"萌萌哒",
              "memberid":"10003746",
              "cover":"https://gslb.miaopai.com/stream/L8T6Zi4BeZRqACdAOGqQsQ___m.jpg",
              "linkurl":"https://gslb.miaopai.com/stream/L8T6Zi4BeZRqACdAOGqQsQ__.mp4",
              "voiceid":"201232",
              "hits":3,
              "topiccount":0,
              "praisecount":0,
              "status":"1",
              "lon":"116",
              "lat":"40",
              "type":2,
              "desc":"",
              "updatetime":"1484029621",
              "createip":"168434093",
              "createtime":"1484029621",
              "parentid":"13201279",
              "cmemberid":"10003746",
              "cmember_nickname":"和尚讲故事",
              "cmember_avatar":"https://alcdn.img.xiaoka.tv/20170105/d06/bc7/0/d06bc7f17f3aed6763d58f04dd9a5b62.jpg",
              "cmember_sex":0,
              "cmember_mtype":0,
              "cmember_integral":0,
              "cmember_mtypename":"普通",
              "cmember_linkurl":"https://gslb.miaopai.com/stream/uJq2AyBurgTrhcpkop~gjw__.mp4",
              "musiclinkurl":"http://wscdn.miaopai.com/xkx4/2015/0729/c4e142e0099cff7b46e7fff2968f1a3b.mp3",
              "cmember_createtime":"1484028428",
              "cmember_cover":"https://gslb.miaopai.com/stream/uJq2AyBurgTrhcpkop~gjw___m.jpg",
              "upkey":21,
              "sign":"932b89bb4bf507417429dd2636ddcd11",
              "expiration_time":1487055467000,
              "nickname":"和尚讲故事",
              "avatar":"https://alcdn.img.xiaoka.tv/20170105/d06/bc7/0/d06bc7f17f3aed6763d58f04dd9a5b62.jpg",
              "mtype":0,
              "mtypename":"普通",
              "integral":0,
              "sex":0
          },
          {
              "videoid":"13201279",
              "scid":"uJq2AyBurgTrhcpkop~gjw__",
              "title":"萌萌哒",
              "memberid":"10003746",
              "cover":"https://gslb.miaopai.com/stream/uJq2AyBurgTrhcpkop~gjw___m.jpg",
              "linkurl":"https://gslb.miaopai.com/stream/uJq2AyBurgTrhcpkop~gjw__.mp4",
              "voiceid":"201232",
              "hits":4,
              "topiccount":0,
              "praisecount":0,
              "status":"1",
              "lon":"116",
              "lat":"40",
              "type":1,
              "desc":"",
              "updatetime":"1484028428",
              "createip":"168434093",
              "createtime":"1484028428",
              "musiclinkurl":"http://wscdn.miaopai.com/xkx4/2015/0729/c4e142e0099cff7b46e7fff2968f1a3b.mp3",
              "upkey":21,
              "sign":"e19254968f3edffdb5d4eb877e0fe088",
              "expiration_time":1487055467000,
              "nickname":"和尚讲故事",
              "avatar":"https://alcdn.img.xiaoka.tv/20170105/d06/bc7/0/d06bc7f17f3aed6763d58f04dd9a5b62.jpg",
              "mtype":0,
              "mtypename":"普通",
              "integral":0,
              "sex":0
          },
          {
              "videoid":"13201142",
              "scid":"Uj7Fog~Jcp76j1ojnmPG0w__",
              "title":"萌萌哒",
              "memberid":"16626046",
              "cover":"http://wsqncdn.miaopai.com/stream/Uj7Fog~Jcp76j1ojnmPG0w___m.jpg",
              "linkurl":"https://gslb.miaopai.com/stream/Uj7Fog~Jcp76j1ojnmPG0w__.mp4",
              "voiceid":"201232",
              "hits":9,
              "topiccount":0,
              "praisecount":0,
              "status":"1",
              "lon":"116",
              "lat":"40",
              "type":1,
              "desc":"社会活动和速度",
              "updatetime":"1481109030",
              "createip":"168435473",
              "createtime":"1481108983",
              "musiclinkurl":"http://wscdn.miaopai.com/xkx4/2015/0729/c4e142e0099cff7b46e7fff2968f1a3b.mp3",
              "upkey":21,
              "sign":"a58d882f7050f5563d656796317e9712",
              "expiration_time":1487055467000
          },
          {
              "videoid":"13201136",
              "scid":"hwayjH2nJuz-GnkDPh2IQg__",
              "title":"萌萌哒",
              "memberid":"26548356",
              "cover":"http://qncdn.miaopai.com/stream/hwayjH2nJuz-GnkDPh2IQg___m.jpg",
              "linkurl":"https://gslb.miaopai.com/stream/hwayjH2nJuz-GnkDPh2IQg__.mp4",
              "voiceid":"201232",
              "hits":1,
              "topiccount":0,
              "praisecount":0,
              "status":"1",
              "lon":"0",
              "lat":"0",
              "type":0,
              "desc":"",
              "updatetime":"1481103423",
              "createip":"168435056",
              "createtime":"1481103423",
              "upkey":21,
              "sign":"8aa2d19004b69a0d883cf2be75141315",
              "expiration_time":1487055467000
          }
      ]
    }
  },
  onLoad(options) {
    var that = this;
    //初始化图片预加载组件，并指定统一的加载完成回调
    this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
    this.loadImages();
    that.data.sound_context = wx.createAudioContext("soundDetail");
    that.animation_data = wx.createAnimation();
    that.initSoundDetail(options.musicid);
    that.initSoundVideos(options.musicid);
  },
  dealNums: function(){
    var that = this;
    var dig = that.data.sound_data.dig;
    var opusnum = that.data.sound_data.opusnum;
    that.setData({
      'sound_data.dig': dig >= 1000 ? (dig/10000).toFixed(1)+'万' : dig,
      'sound_data.opusnum': opusnum >= 10000 ? (opusnum/10000).toFixed(1)+'万' : opusnum 
    });
  },
  dealTime: function(){
    var that = this;
    var duration = parseInt(that.data.sound_data.duration/1000);
    var minutes = parseInt(duration/60);
    var seconds = duration - minutes*60;
    that.setData({
      'sound_data.duration': minutes+':'+seconds
    });
  },
  loadImages() {
    //同时发起全部图片的加载
    this.data.img_list.forEach(item => {
      this.imgLoader.load(item.url)
    })
  },
  //加载完成后的回调
  imageOnLoad(err, data) {
    console.log(data.src+'加载成功！~');
    const img_list = this.data.img_list.map(item => {
      if (item.url == data.src)
        item.loaded = true
        return item
    })
    this.setData({ img_list })
  },
  loadMore: function(){
    var that = this;
    var data = {
      page: that.data.video_data.current_page+1,
      limit: 10,
      musicid: that.data.sound_data.musicid
    }
    app.post_request(app.globalData.API_LIST.TEST.sound_video_list, data, that.loadMoreSuccess);
  },
  loadMoreSuccess: function(res){
    var that = this;
    if(res.data.code == 200){
      var tmp_arr = that.data.video_data.videos;
      tmp_arr = tmp_arr.concat(res.data.data.videos);
      that.setData({
        'video_data.videos': tmp_arr,
        'video_data.current_page': res.data.data.current_page
      });
      //初始化图片加载列表
      for(let i=0;i<res.data.data.videos.length;i++){
        that.data.img_list.push({
          url: res.data.data.videos[i].cover,
          loaded: false
        });
      }
      this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
      this.loadImages();
    }else{

    }
  },
  onReachBottom: function(){
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    });
    that.loadMore();
  },
  soundControlHandler: function(){
    var that = this;
    var animation =wx.createAnimation({
      duration: 300,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
      success: function(res) {
        
      }
    });
    that.setData({
      sound_paused: !that.data.sound_paused
    });
    if(that.data.sound_paused){
      that.soundPaused();
      clearInterval(that.data.animation_interval);
    }else{
      that.soundRunning();
      that.data.animation_interval = setInterval(function(){
        that.setData({
          animation_deg: that.data.animation_deg+6
        });
        console.log(that.data.animation_deg);
        animation.rotate(that.data.animation_deg).step();
        that.setData({
          animation_data: animation.export()
        });
      }, 300);
    }
  },
  initSoundDetail: function(musicid){
    var that = this;
    var data = {
      musicid: musicid
    };
    app.post_request(app.globalData.API_LIST.TEST.sound_detail, data, that.initSoundSuccess);
  },
  initSoundSuccess: function(res){
    var that = this;
    if(res.data.code == 200){
      that.setData({
        sound_data: res.data.data
      });
      that.dealNums();
      that.dealTime();
    }else{

    }
  },
  initSoundVideos: function(musicid){
    var that = this;
    var data = {
      page: 1,
      limit: 10,
      musicid: musicid
    }
    app.post_request(app.globalData.API_LIST.TEST.sound_video_list, data, that.initSoundVideosSuccess);
  },
  initSoundVideosSuccess: function(res){
    var that = this;
    console.log(res);
    if(res.data.code == 200){
      that.setData({
        video_data: res.data.data
      });
      //初始化图片加载列表
      var tmp_arr = [];
      for(let i=0;i<res.data.data.videos.length;i++){
        tmp_arr.push({
          url: res.data.data.videos[i].cover,
          loaded: false
        });
      }
      that.setData({
        img_list: tmp_arr
      });
      that.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
      that.loadImages();
    }else{

    }
  },
  soundPaused: function(){
    var that = this;
    that.data.sound_context.pause();
  },
  soundRunning: function(){
    var that = this;
    that.data.sound_context.play();
  },
  endHandler: function(e){
    var that = this;
    console.log('e');
    that.setData({
      sound_paused: true
    });
    clearInterval(that.data.animation_interval);
  }
})
