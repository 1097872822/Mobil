// pages/login/index.js
Page({
  data: {
    disabled:false,
    no:'',
    pwd:'',
    noinput:false,
    pwdinput:false,
  },
  noinput:function(e){
    this.setData({no:e.detail.value});
    this.setData({noinput:true});
    if(this.data.noinput==true && this.data.pwdinput==true){
      this.setData({ 
        disabled: false 
      });
    }
 
  },
  pwdinput: function (e) {
    this.setData({ pwd: e.detail.value });
    this.setData({ pwdinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ 
        disabled: false 
      });
    }
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '登录中...',
    })
    console.log(e);
    this.setData({ disabled: true});
    wx.request({
      url:"http://localhost:9999/api/home/client", //仅为示例，并非真实的接口地址
      data: {
        userno: e.detail.value.userno,
        password: e.detail.value.password
      
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode ==200) {
          if (res.data.errcode != 0) {
            wx.showToast({
              title: res.data.errmsg,
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.setStorageSync('student', res.data.data.content);
            wx.showToast({
              title: "登录成功",
              icon: 'success',
              duration: 2000
            })
            setTimeout(function(){
              wx.switchTab({
                url: '../mine/mine',
              })
            },2000)
          }
        }else{
          wx.showToast({
            title: '服务器出现错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({disabled:false});
    var student = wx.getStorageSync('student');
    if (typeof (student) == 'object' ) {
      wx.switchTab({
        url: '../mine/mine',
      })
    }
  },
   /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   if(this.data.no=='' || this.data.pwd==''){
  //     this.setData({ disabled: true });
  //   }else{
  //     this.setData({ disabled: false });
  //   }
  // },



})