// pages/collect/index.js
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
    bookImg:"",
// 个人借阅对象
// BorrowInfo:[],
  },
    index:0,
  pId:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

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
    this.getCollectDetail(this.pId);
    // const bookList = wx.getStorageSync("bookList")||[];
    
  },
//  获取个人借阅数据
async getCollectDetail(uId){

  const res =await request({url:`/home/collect?uId=${uId}`})
  this.setData({
    collect:res.content
  })
  console.log(this.data.collect);
  
},
handleQuxiao(e){
  console.log(e);
  this.index =e.currentTarget.id;
  console.log(e.currentTarget);
  wx:wx.showModal({
    title: '温馨提示',
    content: '确定要取消收藏吗',
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#000000',
    confirmText: '确定',
    confirmColor: '#3CC51F',
    success: (result) => {
      if(result.confirm){
         wx.request({
          url: "http://localhost:9999/api/home/delectcollect",
          method: 'GET',
          data: {
            bookid: this.index ,
            uid: this.pId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            console.log(res.data);
            if (res.data.errcode != 0) {
              wx.showToast({
                title: "取消失败",
                icon: 'none',
                duration: 2000,
              })
            } else {
              wx.showToast({
                title: "取消收藏",
                icon: 'success',
                duration: 2000,
              })
              this.getCollectDetail(this.pId);
            }
          }
        })
      }
    },
    
  });
  
 
}
//   handleItemChange(e){
//     //接受传递过来的参数
//     const {index} = e.detail;
//     //console.log(index);
//     let {tabs}=this.data;
//         //循环数组
//         //[].forEach 遍历数组 遍历数组的时候 修改了v也会导致源数组被修改
//         tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
//         this.setData({
//           tabs
//         });
//   }
})