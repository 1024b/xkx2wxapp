//index.js
//获取应用实例
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
    avar: '../../assets/morentouxiang@2x.png',
    hots_data: null
  },
  onLoad() {
    //初始化图片预加载组件，并指定统一的加载完成回调
    var that = this;
    wx.getStorage({
      key: 'session_id',
      success: function(res){
        // success
        if(res.data){
          app.globalData.userData.sessionId = res.data;
          that.initData();
        }else{
         app.initSession(that.initData);
        }
      },
      fail: function() {
        // fail
        app.initSession(that.initData);
      },
      complete: function() {
        // complete
      }
    })
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
  onReachBottom: function(){
    var that = this;
    /*wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    });*/
    that.loadMore();
  },
  onPullDownRefresh: function(){
    var that = this;
    that.initData();
  },
  initData: function(){
    var that = this;
    if(that.data.hots_data){
      var data = {
        page: 1,
        limit: 10,
        refresh: 1,
        first_vid: that.data.hots_data.first_vid
      }
    }else{
      var data = {
        page: 1,
        limit: 10,
        refresh: 1,
        first_vid: ''
      }
    }
    app.post_request(app.globalData.API_LIST.TEST.video_list, data, that.initDataSuccess);
  },
  initDataSuccess: function(res){
    var that = this;
    if(res.data.code == 200){
      that.setData({
        hots_data: res.data.data
      });
      //初始化图片加载列表
      var tmp_arr = [];
      for(let i=0;i<res.data.data.list.length;i++){
        tmp_arr.push({
          url: res.data.data.list[i].cover,
          loaded: false
        });
      }
      that.setData({
        img_list: tmp_arr
      });
      this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
      this.loadImages();
      wx.stopPullDownRefresh();
    }else{

    }
  },
  loadMore: function(){
    var that = this;
    var data = {
      page: that.data.hots_data.current_page+1,
      limit: 10,
      refresh: 0,
      first_vid: that.data.hots_data.first_vid
    }
    app.post_request(app.globalData.API_LIST.TEST.video_list, data, that.loadMoreSuccess);
  },
  loadMoreSuccess: function(res){
    var that = this;
    if(res.data.code == 200){
      var tmp_arr = that.data.hots_data.list;
      tmp_arr = tmp_arr.concat(res.data.data.list);
      that.setData({
        'hots_data.list': tmp_arr,
        'hots_data.current_page': res.data.data.current_page
      });
      //初始化图片加载列表
      for(let i=0;i<res.data.data.list.length;i++){
        that.data.img_list.push({
          url: res.data.data.list[i].cover,
          loaded: false
        });
      }
      this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
      this.loadImages();
    }else{

    }
  }
})
