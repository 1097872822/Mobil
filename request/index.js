// 同时发送异步代码的次数
let ajaxTime=0;
export const request=(params)=>{
    ajaxTime++;
    // 显示加载中效果
    wx.showLoading({
        title: "加载中",
        mask: true,
        
    });
    // 定义公共URL
    const baseURL="http://localhost:9999/api"
    return new Promise((resolve,reject)=>{
         wx.request({
        //    ...params,
		   url:baseURL+params.url,
		   method:'GET',
           success:(result)=>{
               resolve(result.data.data);
           },
           fail:(err)=>{
               reject(err);
           },
           complete:()=>{
            ajaxTime--;
            if(ajaxTime===0){
        //    关闭正在等待的图标 
                wx.hideLoading();}
            
           
           }
        });
    })
}

