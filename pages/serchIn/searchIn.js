// pages/serchIn/searchIn.js
import {request}from "../../request/index";
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

// 输入框绑定 input事件
// 获取值
// 合发判断
// 返回数据打印
Page({

  /**
   * 页面的初始数据
   */
  data: {

    books:[],
    // 取消按钮是否显示
    isFocus:false,
    // 输入框值
    inpValue:''
  },
  // 定时器 防抖
  TimeId:-1,
  // 输入框值改变触发
  handleInput(e){
    // 获取值
    const {value}=e.detail;
    if (!value.trim()){
      this.setData({
        books:[],
        isFocus:false,
      })
      return;
    }
    this.setData({
      isFocus:true,
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000);
    
    
  },
  // 发送请求函数
  async qsearch(bname){
    const res=await request({url:`/books/qsearch?bname=${bname}`});
    this.setData({
      books:res.content
    })
    
  },
  // 点击取消按钮
  handleCancel(){
    this.setData({
      inpValue:'',
      isFocus:false,
      books:[]
    })

  }

})