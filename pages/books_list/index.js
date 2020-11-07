// pages/books_list/index.js
// 找到滚动条触底事件
// 判断有没有下一页
// 没有弹提示
// 有加载
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    MenuList: [],
    currentIndex: 0,
    curNav: 0,
    bookList: [],
    // // 右侧内容滚动条距离
    scrollTop: 0,



  },
  // 接口要的数据
  QueryParams: {
    query: "",
    cid: 1,
    pageNum: 1,
    pageSize: 5
  },
  // 总页数
  totalPages: 1,

  // 接口返回数据
  Cate: [],
  onLoad: function (options) {
    this.getCates();
    //  缓存
    const Cate = wx.getStorageSync("cate");
    if (!Cate) {
      this.getCates();
    } else {
      if (Date.now() - Cate.time > 1000 * 10) {
        this.getCates();
      } else {
        this.Cate = Cate.data;
        this.setData({

          MenuList: this.Cate
        })
      }
    }

    //  console.log(this.data.MenuList)
    let {
      MenuList
    } = this.data;
    MenuList.forEach((v, i) => i === options.caId - 1 ? v.isActive = true : v.isActive = false);
    this.setData({
      MenuList,
      curNav: options.caId - 1
    })
    // console.log(this.data.curNav)
    // console.log(this.data.MenuList)
    this.QueryParams.cid = options.caId;

    this.getBookList();

  },
  onShow() {
    this.getBookList()
  },
  // 获取商品列表数据
  async getBookList() {
    // console.log(this.QueryParams)
    const res = await request({
      url: `/books/search?cid=${this.QueryParams.cid}`
    });
    // 获取总条数
    const total = res.content.length;
    this.totalPages = Math.ceil(total / this.QueryParams.pageSize);
    // console.log(this.totalPages);


    this.setData({
      bookList: res.content
    })
    console.log(this.data.bookList)

  },
  //  获取分类数据
  async getCates() {
    const res = await request({
      url: "/home/categories"
    });
    this.Cate = res.content
    wx.setStorageSync("cate", {
      time: Date.now(),
      data: this.Cate
    });

    this.setData({
      MenuList: this.Cate
    })

  },

  handleBookListTap(e) {
    // console.log(e);
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      curNav: index,
    })
    this.QueryParams.cid = index + 1;
    this.getBookList();
  },
  // 页面上滑 滚动条事件
  onReachBottom() {
    //  判断有没有下一页
    if (this.QueryParams.pageNum >= this.totalPages) {
      // 没有下一页
      console.log("没有下一页");
    } else {
      console.log("youxiayiye");
      this.QueryParams.pageNum++;
      this.getBookList()
    }


  }

});