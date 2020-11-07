// pages/mine/mine.js
import {request}from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:[],
    borrowmun:0,
    // 收藏商品数量
    collectNums:0,
    BorrowInfo:[],
    CollectInfo:[]
  },
    pId:0,
  onShow: function (){
     const userinfo=wx.getStorageSync("student");
     if(userinfo!=[]){
       this.setData({
      userinfo,
    });
 let person = wx.getStorageSync("student")||[];
 this.pId =person.uId;
 this.getPerson(this.pId);
 this.getPersonColl(this.pId); }
      
  },
  //  获取个人借阅数据
async getPerson(uId){
  const res =await request({url:`/home/borrow?uId=${uId}`})
  this.BorrowInfo = res.content;
  this.setData({
    borrowmun:this.BorrowInfo.length
  })
  // console.log(this.BorrowInfo);
  
},
  //  获取个人收藏数据
  async getPersonColl(uId){
    const res =await request({url:`/home/collect?uId=${uId}`})
    this.CollectInfo = res.content;
    this.setData({
      collectNums:this.CollectInfo.length
    })
    // console.log(this.BorrowInfo);
    
  },

 
})