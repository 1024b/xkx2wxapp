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
    sound_data: null,
    video_data: null
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
