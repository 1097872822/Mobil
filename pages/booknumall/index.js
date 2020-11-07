// pages/booknumall/index.js
import {request}from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
AllBorrow:[]
  },
  pId:0,

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let person = wx.getStorageSync("student")||[];
    this.pId =person.uId;
    console.log(this.pId);
    this.getALLBorrow(this.pId);
  },
  async getALLBorrow(uId){
    const res =await request({url:`/home/allborrow?uId=${uId}`})
    this.setData({
      AllBorrow:res.content
    })
    console.log(this.data.AllBorrow);
    
  },
})