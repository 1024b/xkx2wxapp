//app.js
App({
  onLaunch: function () {
    var that = this;
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
  initSession: function(nextAction){
    var that = this;
    wx.login({
      success: function (res) {
        that.globalData.userData.code = res.code;
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userData.userInfo = res
            var data = {
              code: that.globalData.userData.code,
              iv: that.globalData.userData.userInfo.iv,
              encryptedData: that.globalData.userData.userInfo.encryptedData
            }
            wx.request({
              url: that.globalData.API_LIST.TEST.init_session,
              data: data,
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function(res){
                // success
                if(res.data.code == 200){
                  that.globalData.userData.sessionId = res.data.data.session_id;
                  wx.setStorage({
                    key: 'session_id',
                    data: res.data.data.session_id,
                    success: function(res){
                      // success
                      typeof nextAction == "function" && nextAction()
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
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })
          }
        })
      }
    })
  },
  globalData:{
    userData: {
      sessionId: '',
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
        init_session: 'https://testapi.xiaokaxiu.com/www/wx/login',
        praise_video: 'https://testapi.xiaokaxiu.com/www/wx/praise_video',
        cancel_praise_video: 'https://testapi.xiaokaxiu.com/www/wx/cancel_praise_video',
        praise_comment: 'https://testapi.xiaokaxiu.com/www/wx/praise_comment'
      }
    }
  },
  post_request: function(url, data, success, fail, complete){
    var that = this;
    var request_data = data;
    request_data.session_id = that.globalData.userData.sessionId;
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
        wx.stopPullDownRefresh();
        //wx.hideToast();
      }
    })
  }
})