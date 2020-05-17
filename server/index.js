const express = require('express')
const app = express()
const port = 5000
const {User} = require('./models/User')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth')

//application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
//application/json
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose');
const config = require('./config/key');

mongoose.connect(config.mongoURI , {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>{
    console.log('Mongo DB Connect...')
}).catch((err)=>{
    console.log(err)
})

app.get('/', (req, res) => res.send('Hello World!!~~ with nodemon'))

app.get('/api/hello', (req, res)=>{
    res.send("안녕하세요")
})

app.post('/api/users/register', (req,res)=>{
    //회원 가입 할떄 필요한 정보를 client에서 가져오면
    //그것을 데이터 베이스에 넣는다
    const user = new User(req.body);
    user.save((err, user)=>{
        if(err){
            return res.json({success: false, err})
        }else{
            return res.status(200).json({
                success: true
            })
        }
    })
})

app.post('/api/users/login', (req,res)=>{
    //요청된 이메일 데이터 베이스에서 찾기
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user){
            return res.json({
                loginSuccess : false,
                message: '등록되지 않은 이메일 입니다.'
            })
        }
        //요청된 이메일이 있다면 비밀번호 확인
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: '비밀번호가 틀렸습니다'
                })
            //비밀번호까지 맞다면 토큰 생성
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                //토큰을 저장한다   어디에? 쿠키, 로퀄 스토리지, 세션?
                res.cookie('x_auth', user.token).status(200).json({loginSuccess: true, userId: user._id})
            })
        })
    })
    
    
})

app.get('/api/users/auth', auth, (req, res)=>{
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
})

app.get('/api/users/logout', auth, (req, res)=>{
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


