// pages/borrow/index.js
var filmNullTip = {
  tipText: '亲，找不到书籍的收藏',
  actionText: '去逛逛',
  routeUrl: '../../pages/search/search'
}
import {request}from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    id:0,
    nullTip: filmNullTip,
    collect:[],
    // tabs:[
    //   {
    //     id:0,
    //     name:"书籍收藏",
    //     isActive:true
    //   },
    //   {
    //     id:1,
    //     name:"书籍借阅",
    //     isActive:false
    //   },
    // ],
    bookImg:"",
// 个人借阅对象
BorrowInfo:[],
  },
    
  pId:0,
  index:0,
  /**
   * 生命周期函数--监听页面加载
   */

  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // const collect = wx.getStorageSync("collect")||[];
    // this.setData({
    //   collect
    // });
    let person = wx.getStorageSync("student")||[];
    this.pId =person.uId;
    console.log(this.pId);
    
    this.getBorrowDetail(this.pId);
    const bookList = wx.getStorageSync("bookList")||[];
    
  },
//  获取个人借阅数据
async getBorrowDetail(uId){

  const res =await request({url:`/home/borrow?uId=${uId}`})
  this.setData({
    BorrowInfo:res.content
  })
  console.log(this.data.BorrowInfo);
  
},
// handleyanqi(e){
//   this.index = e.currentTarget.id;
//   wx.request({
//     url: "http://localhost:9999/api/home/addtime",
//     method: 'GET',
//     data: {
//       borrowId: this.index ,
//     },
//     header: {
//       'content-type': 'application/x-www-form-urlencoded'
//     },
//     success: (res) => {
//       console.log(res.data);}
  
//     } )
// }
  // handleItemChange(e){
  //   //接受传递过来的参数
  //   const {index} = e.detail;
  //   //console.log(index);
  //   let {tabs}=this.data;
  //       //循环数组
  //       //[].forEach 遍历数组 遍历数组的时候 修改了v也会导致源数组被修改
  //       tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
  //       this.setData({
  //         tabs
  //       });
  // }
})