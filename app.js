//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.getStorage({
      key: 'session_id',
      success: function(res){
        // success
        if(res.data){
          
        }else{
         that.getUserInfo(that.initSession);
        }
      },
      fail: function() {
        // fail
        that.getUserInfo(that.initSession);
      },
      complete: function() {
        // complete
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userData.code){
      typeof cb == "function" && cb(this.globalData.userData)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          that.globalData.userData.code = res.code;
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userData.userInfo = res
              typeof cb == "function" && cb(that.globalData.userData)
            }
          })
        }
      })
    }
  },
  initSession: function(userData){
    var that = this;
    var data = {
      code: userData.code,
      iv: userData.userInfo.iv,
      encryptedData: userData.userInfo.encryptedData
    }
    that.post_request(that.globalData.API_LIST.TEST.init_session, data, that.initSuccess);
  },
  initSuccess: function(res){
    var that = this;
    console.log(that.globalData.userData);
    if(res.code == 200){
      wx.setStorage({
        key: 'session_id',
        data: res.data.session_id,
        success: function(res){
          // success
          
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }else{

    }
  },
  globalData:{
    userData: {
      code: '',
      userInfo: null
    },
    API_LIST: {
      TEST: {
        video_list: 'https://testapi.xiaokaxiu.com/www/wx/get_videos',
        video_detail: 'https://testapi.xiaokaxiu.com/www/wx/get_video',
        video_comments: 'https://testapi.xiaokaxiu.com/www/wx/get_video_comments',
        sound_detail: 'https://testapi.xiaokaxiu.com/www/wx/get_music',
        sound_video_list: 'https://testapi.xiaokaxiu.com/www/wx/get_music_videos',
        init_session: 'https://testapi.xiaokaxiu.com/www/wx/login'
      }
    }
  },
  post_request: function(url, data, success, fail, complete){
    wx.request({
      url: url,
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res){
        // success
        success(res);
      },
      fail: function() {
        // fail
        //fail();
      },
      complete: function() {
        // complete
        //complete();
      }
    })
  }
})