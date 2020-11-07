// pages/bookpai/index.js
import {request}from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookPaiList:[],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPai();
  },
  async getPai(){
  
    const res=await request({url:"/books/bookpai"});
      this.setData({
        bookPaiList:res.content
      })
      wx.setStorageSync("bookList", res.content);
      // console.log(res);
  },

})