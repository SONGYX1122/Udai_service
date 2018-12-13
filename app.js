//使用express构建web服务器 --11:25
const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const cors=require("cors");
const pool=require("./pool");
const qs=require("querystring")

var app = express();
app.use(cors({
  origin:['http://localhost:5000',"http://localhost:4200","http://127.0.0.1:5000"],
  credentials:true
}))
app.listen(3000,()=>{
  console.log("服务器启动，端口为3000")
});
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));
app.use(session({
  secret:'随机字符串',
  cookie:{maxAge:60*1000*30},//过期时间ms
  resave:false,
  saveUninitialized:true
}));//将服务器的session，放在req.session中
var img="http://localhost:3000/img/"
var obj=[
  /**1楼 */
  {
    id:1,
    title:"精品男装",
    floor:img+"floor_3.jpg",
    imgs:[
      {id:1,img:img+"M-001.jpg",pid:1,price:21.00,title:"纯色圆领短袖1"},
      {id:2,img:img+"M-002.jpg",pid:2,price:22.00,title:"纯色圆领短袖2"},
      {id:3,img:img+"M-003.jpg",pid:3,price:23.00,title:"纯色圆领短袖3"},
      {id:4,img:img+"M-004.jpg",pid:4,price:24.00,title:"纯色圆领短袖4"},
      {id:5,img:img+"M-005.jpg",pid:5,price:25.00,title:"纯色圆领短袖5"},
      {id:6,img:img+"M-006.jpg",pid:6,price:26.00,title:"纯色圆领短袖6"},
      {id:7,img:img+"M-007.jpg",pid:7,price:27.00,title:"纯色圆领短袖7"},
      {id:8,img:img+"M-008.jpg",pid:8,price:28.00,title:"纯色圆领短袖8"},
    ]
    
  },
  /**2楼 */
  {
    title:"精品女装",
    id:2,
    floor:img+"floor_2.jpg",
    imgs:[
      {id:1,img:img+"S-001.jpg",pid:11,price:21.00,title:"纯色V领短袖1"},
      {id:2,img:img+"S-002.jpg",pid:12,price:22.00,title:"纯色V领短袖2"},
      {id:3,img:img+"S-003.jpg",pid:13,price:23.00,title:"纯色V领短袖3"},
      {id:4,img:img+"S-004.jpg",pid:14,price:24.00,title:"纯色V领短袖4"},
      {id:5,img:img+"S-005.jpg",pid:15,price:25.00,title:"纯色V领短袖5"},
      {id:6,img:img+"S-006.jpg",pid:16,price:26.00,title:"纯色V领短袖6"},
      {id:7,img:img+"S-007.jpg",pid:17,price:27.00,title:"纯色V领短袖7"},
      {id:8,img:img+"S-008.jpg",pid:18,price:28.00,title:"纯色V领短袖8"},
    ]
    
  }
];
/**商品 */
app.get("/goods",(req,res)=>{
  res.send(obj);
})
//用户信息
var user=[
  {uname:"songyx",upwd:123456},
];
//登录
app.get("/login",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  for(var i=0;i<user.length;i++){
    if(user[i].uname==uname){
      if(user[i].upwd==upwd){
        res.send("登录成功")
        return;
      }
    }
  }
  res.send("用户名或密码错误")
})
//注册
app.get("/register",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  var obj={
    uname,
    upwd
  }
  user.push(obj);
  console.log(user);
  res.send({code:1,msg:"注册成功"})
})
/**购物车数据 */
var shoppingCart=[
  { title: '纯色圆领短袖1',img: 'http://localhost:3000/img/M-001.jpg',price: '21',pid: '1',count: 1,color: '翡冷翠',size: 'L',id: 1 },
  { title: '纯色圆领短袖2',img: 'http://localhost:3000/img/M-002.jpg',price: '22',pid: '2',count: 3,color: '翡冷翠',size: 'L',id: 2 }
]
/**加入购物车 */
app.post("/addGoods",(req,res)=>{
  req.on("data",(buf)=>{
    //var obj=qs.parse(buf.toString())
    var obj=JSON.parse(buf)
    obj.id=shoppingCart.length+1;
    shoppingCart.push(obj)
  })
  res.send("添加成功")
})
/**获取购物车数据 */
app.get("/getShoppingCart",(req,res)=>{
  res.send(shoppingCart)
})

