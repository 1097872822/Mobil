// pages/personpai/index.js
import {request}from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu:[],
    person:[],
    pId:0,
    
  },
  
  stu1:[],
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPersonPai();
    
    



  },
  //  获取排名数据
async getPersonPai(){
  const res =await request({url:"/home/peoplepai"})
  this.stu1=res.content;
  let person = wx.getStorageSync("student")||[];
  const pId=person.uId
  this.setData({
    person,
    pId,
    stu:res.content,
  })
  // console.log(this.data.pId);
  // console.log(this.data.stu);
  
},


  
})