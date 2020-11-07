
Page({

  /**
   * 点击+触发tap点击事件
   *  1调用小程序内置的 选择图片api
   *  2获取图片的途径 数组
   *  3把图片的途径存到data中
   *  4页面根据图片数组 循环显示 自定义组件
   * 点击自定义图片 组件
   *  1获取被点击元素的索引
   *  2获得data的图片数组
   *  3根据索引 数组中删除对于元素
   *  4把数组重新设置回data中
   * 点击提交
   *  1获取文本域内容
   *    data定义变量
   *    文本域绑定输入事件 事件触发 值存入变量中
   *  2对内容进行合法性验证
   *  3通过 用户选择图片 上传到专门图片服务器 返回图片外网链接
   *  4文本域外网图片路径 一起提交服务器
   *  5清空当前页面
   *  6返回
   */
  data: {
    tabs:[
      {
        id:0,
        name:"体验问题",
        isActive:true
      },
      {
        id:1,
        name:"书籍、商家投诉",
        isActive:false
      },
    ],
    // 被选中的图片数组
    chooseImgs:[],
    textVal:""


  },
  // 外文图片路径数组
  UpLoadImgs:[],

  handleItemChange(e){
    //接受传递过来的参数
    const {index} = e.detail;
    //console.log(index);
    let {tabs}=this.data;
        //循环数组
        //[].forEach 遍历数组 遍历数组的时候 修改了v也会导致源数组被修改
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
        this.setData({
          tabs
        });
  },
  // 点击+事件
  handleChooseImg(){
    // 调用小程序内置选择图片
    wx.chooseImage({
      // 同时选择图片数量
      count: 9,
      // 图片格式 原图 压缩
      sizeType: ['original','compressed'],
      // 图片来源
      sourceType: ['album','camera'],
      success: (result)=>{
        console.log(result);
        this.setData({
// 图片数组 进行拼接
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  handleRemoveImg(e){
    // 获取点击组件的索引
    const {index}=e.currentTarget.dataset;
    // 获取data中图片数组
    let{chooseImgs}=this.data;
    // 删除数组
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })

  },
  // 文本域事件
  handleTextinput(e){
    this.setData({
      textVal:e.detail.value
    })

  },
  // 提交按钮点击事件
  handleFormSubmit(){
    const {textVal,chooseImgs}=this.data;
    if(!textVal.trim()){
    wx.showToast({
      title: '输入不合法',
      icon: 'none',
      mask: true,
      
    });
    return;
    }wx.showLoading({
      title: "正在上传中",
      mask: true
    });
    // 判断有没有需要上传的图片数组
    if (chooseImgs!=0){
    chooseImgs.forEach((v,i)=>{
    wx.uploadFile({
      // 上传到哪里
      url: 'https://images.ac.cn/Home/Index/UploadAction/',
      // 被上传文件路径
      filePath: v,
      // 上传文件名称 后台获取文件 
      name:"file" ,
      // 上传文件顺带的文本信息
      formData: {},
      success: (result)=>{
        console.log(result);
        let url=JSON.parse(result.data).url;
        this.UpLoadImgs.push(url);

        if(i===chooseImgs.length-1){
          wx.wx.hideLoading();
          this.setData({
            textVal:"",
            chooseImgs:[]
          })
          wx.wx.navigateBack({
            delta: 1
          });
        }
      },
    });
  })
  }else{
    wx.hideLoading();
    console.log("只是提交文本");
    wx.navigateBack({
      delta:1
    });
  }
  }
  

})