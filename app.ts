import express, { Express, Router, Request, Response } from 'express'
import axios from 'axios'

const app: Express = express()

// 支持跨域问题
app.use('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

// 使用路由
const router: Router = express.Router()

app.use('/api', router)

router.get('/list', async (req: Request, res: Response) => {
	// 腾讯疫情接口模拟数据
	const result = await axios.post(
		'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=staticGradeCityDetail,diseaseh5Shelf'
	)
	// 返回json格式数据
	res.json({
		...result.data.data
	})
})

// 启动项目端口
app.listen(3333, () => {
	console.log('success server http://localhost:3333')
})