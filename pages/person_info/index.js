// pages/person_info/index.js
import {request}from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    person:[],
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
  this.setData({
    person,
    
  })
  console.log(this.data.person);
  
}
})