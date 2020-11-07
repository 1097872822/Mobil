// pages/changePwd/index.js
import {request}from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    person:[],
    pId:0,
    pwd:""
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPerson();
  },
 //  获取排名数据
 async getPerson(){
  let person = wx.getStorageSync("student")||[];
  const pId =person.uId;
  this.setData({
    person,
    pId,
    pwd:person.uPwd
    
  })
  // console.log(this.data.pwd);
  
},
  formSubmit: function (e) {
    console.log(e);
    var oldpwd = e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var newpwd2 = e.detail.value.newpwd2;
 
    if (oldpwd == '' || newpwd == '' || newpwd2 == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (newpwd != newpwd2) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 1000
      })
    } else if(this.data.pwd !=oldpwd){
      wx.showToast({
        title: '原始密码输入错误',
        icon: 'none',
        duration: 1000
      })
    }
    else {
      // var url = "https://www.lishuming.top/pj/index.php/student/api/setpassword";
      wx.showLoading({
        title: '网络请求中......',
      })
      wx.request({
        url: "http://localhost:9999/api/home/changePwd",
        method: 'POST',
        data: {
          uid: this.data.pId,
          password: newpwd
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.errcode!=0) {
            wx.showToast({
              title: "修改失败",
              icon: 'none',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: "修改成功",
              icon: 'success',
              duration: 2000,
              success: function () {
                wx.setStorage('student',res.data.data.content);
                setTimeout(function(){
                  wx.switchTab({
                    url: '../mine/mine',
                  })
                },2000)
              } 
            })
          }
        }
      })
    }
  },
})