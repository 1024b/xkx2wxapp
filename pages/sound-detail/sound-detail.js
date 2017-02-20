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
    imgList: genImgListData(),
    sound_context: '',
    sound_paused: true,
    avar: '../../assets/morentouxiang@2x.png',
    sound_pause_src: '../../assets/sound-pause@2x.png',
    sound_play_src: '../../assets/sound-play@2x.png',
    cover_src: 'https://vi1.6rooms.com/live/2017/02/06/23/1010v1486394883504544980_s.jpg',
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
    }
  },
  onLoad(options) {
    var that = this;
    //初始化图片预加载组件，并指定统一的加载完成回调
    this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
    this.loadImages();
    that.data.sound_context = wx.createAudioContext("soundDetail");
    that.initSoundDetail(options.musicid);
  },
  loadImages() {
    //同时发起全部图片的加载
    this.data.imgList.forEach(item => {
      this.imgLoader.load(item.url)
    })
  },
  //加载完成后的回调
  imageOnLoad(err, data) {
    console.log('图片加载完成', err, data.src)

    const imgList = this.data.imgList.map(item => {
      if (item.url == data.src)
        item.loaded = true
        return item
    })
    this.setData({ imgList })
  },
  soundControlHandler: function(){
    var that = this;
    that.setData({
      sound_paused: !that.data.sound_paused
    });
    if(that.data.sound_paused){
      that.soundPaused();
    }else{
      that.soundRunning();
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
  }
})
