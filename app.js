// 系统模块
const express = require('express');

const app = express();

// 第三方模块
const hbs = require('express3-handlebars');

const PORT = process.env.PORT || 3000;
// 视图引擎
app.engine('hbs', hbs({ // 注册模板引擎处理后缀名为 hbs 的文件
	// 默认模板引擎的文件夹为 views即 layoutDir:'views'
	defaultLayout:'main', // 基础布局模板为main.hbs,取消在reder时传入{layout:false}
	extname:'.hbs' // 指定模板后缀，默认为.handlebars
}));
// 读取文件
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.use((req, res, next) => {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
})
app.get('/', (req, res) => {
	res.render('home');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.use((req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - not found');
});

app.use((err, req, res, next) => {
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - server error');
});

app.listen(PORT);

console.log('服务运行在'+PORT);
