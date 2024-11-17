const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const authRouter = require('./routes/auth-route')
const productRouter = require('./routes/product-route')
const blogRouter = require('./routes/blog-route')
const authenticateUser = require('./middlewares/auth-middleware')
const cors = require('cors')

const PORT = process.env.PORT || 3090

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/',authRouter)
app.use('/products',productRouter)
app.use('/blogs',blogRouter)

app.listen(PORT,()=>{
    console.log(`Server Listens Port:${PORT}`);
})