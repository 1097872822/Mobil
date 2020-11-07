// pages/book_detail/index.js
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
const filter = require('../../utils/filter');
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    booksObj: [],
    // 书籍是否被收藏
    isCollect: false,
    // 以借阅
    isBorrow: false,

  },
  // 书籍对象
  BooksInfo: [],
  // 个人借阅对象
  BorrowInfo: [],
  CollectInfo: [],
  CommentInfo: [],
  pId: 0,
  bookNumber: 0,
  jieY: false,
  person: [],

  onLoad: function () {
    // ...


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {
      bookId
    } = options;
    this.person = wx.getStorageSync("student") || [];
    this.pId = this.person.uId;
    if (this.person != []) {
      this.getBorrowDetail(this.pId);
      this.getCollectDetail(this.pId)
      this.getBookDetail(bookId);
      this.getCommentDetail(bookId);
    } else {

      wx.showToast({
          title: "请先登录",
          icon: 'none',
          duration: 2000,
        }),
        setTimeout(function () {
          wx.switchTab({
            url: '../mine/mine',
          })
        }, 2000)
    }
  },

  //  获取详情数据
  async getBookDetail(bookId) {
    if (this.person != []) {
      const res = await request({
        url: `/books/detail?book_id=${bookId}`
      })
      this.BooksInfo = res.content;
      // let collect = wx.getStorageSync("collect")||[];
      // let isCollect=collect.some(v=>v.bookId===this.BooksInfo.bookId)
      // this.bookNumber=res.content.bookNumber;
      this.setData({
        booksObj: res.content,
        // isCollect
      })
      // 检验是否已借阅
      console.log(this.BorrowInfo);
      for (var i = 0; i < this.BorrowInfo.length; i++) {
        var isBorrow1 = this.BorrowInfo[i].bookId == this.BooksInfo.bookId ? true : false
        if (isBorrow1) {
          break;
        }
      }
      this.setData({
        isBorrow: isBorrow1
      })
      // 检验是否已收藏
      for (var i = 0; i < this.CollectInfo.length; i++) {
        var isCollect1 = this.CollectInfo[i].bookId == this.BooksInfo.bookId ? true : false
        if (isCollect1) {
          break;
        }
      }
      this.setData({
        isCollect: isCollect1
      })
    }
  },

  //点击加入借阅
  handleBookAdd() {
    if (this.person != []) {
      if (!this.data.isBorrow) {
        wx.request({
            url: "http://localhost:9999/api/home/newborrow",
            method: 'GET',
            data: {
              bookid: this.BooksInfo.bookId,
              uid: this.pId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
              console.log(res.data);
              if (res.data.errcode != 0) {
                wx.showToast({
                  title: "借阅失败",
                  icon: 'none',
                  duration: 2000,
                })
              } else {
                wx.showToast({
                  title: "借阅成功",
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                    wx.redirectTo({
                      url: '/pages/borrow/index' //页面路径
                    })
                  }
                })
                wx.setStorageSync("student", res.data.data.content);
              }
            }
          }),
          wx.request({
            url: "http://localhost:9999/api/home/inallborrow",
            method: 'GET',
            data: {
              bookid: this.BooksInfo.bookId,
              uid: this.pId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
              console.log(res.data);
            }
          })

      } else {
        wx.showToast({
          title: "已借阅",
          icon: 'none',
          duration: 2000,
        })
      }
    }

    // let bookjie = wx.getStorageSync("bookjie")||[];
    // let index = bookjie.findIndex(v=>v.bookId===this.BooksInfo.bookId);
    // if(index===-1){
    //   // 不存在第一次添加
    //   this.BooksInfo.bookNumber=this.BooksInfo.bookNumber-1;
    //   bookjie.push(this.BooksInfo);
    // }else{
    //   // 已存在
    // }
    // wx.setStorageSync("bookjie",bookjie );
    // wx.showToast({
    //   title: '借阅成功',
    //   icon: 'success',
    //   duration: 1500,
    //   mask: true
    // });

  },
  //  获取评论数据
  async getCommentDetail(bookId) {
    const res = await request({
      url: `/comment/index?book_id=${bookId}`
    })
    this.setData({
      CommentInfo: res.content
    })

  },


  //  获取个人借阅数据
  async getBorrowDetail(uId) {
    if (this.person != []) {
      const res = await request({
        url: `/home/borrow?uId=${uId}`
      })
      this.BorrowInfo = res.content;
      console.log(this.BorrowInfo);
    }
  },
  //  获取个人收藏数据
  async getCollectDetail(uId) {
    if (this.person != []) {
      const res = await request({
        url: `/home/collect?uId=${uId}`
      })
      this.CollectInfo = res.content;
      console.log(this.CollectInfo);
    }
  },
  // 点击商品收藏图标
  handleCollect() {
    if (this.person != []) {
      if (!this.data.isCollect) {
        wx.request({
          url: "http://localhost:9999/api/home/newcollect",
          method: 'GET',
          data: {
            bookid: this.BooksInfo.bookId,
            uid: this.pId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            console.log(res.data);
            if (res.data.errcode != 0) {
              wx.showToast({
                title: "收藏失败",
                icon: 'none',
                duration: 2000,
              })
            } else {
              wx.showToast({
                title: "收藏成功",
                icon: 'success',
                duration: 2000,
                // success: function () {
                //   wx.redirectTo({
                //     url: '/pages/borrow/index' //页面路径
                //   })
                // }
              })
              this.setData({
                isCollect: true
              })
            }
          }
        })

      } else {
        wx.request({
          url: "http://localhost:9999/api/home/delectcollect",
          method: 'GET',
          data: {
            bookid: this.BooksInfo.bookId,
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
              this.setData({
                isCollect: false
              })
            }
          }
        })
      }
    }
  },


}))