
const express    			= require('express');
const bodyParser 			= require('body-parser');
const ejs        			= require('ejs');
const socketio   			= require('socket.io');
const nodemailer 			= require('nodemailer');
const mongoose   			= require('mongoose');
const passport  			= require('passport');
const LocalStrat 			= require('passport-local');



// mongoose.connect("mongodb://localhost:27017/test_server", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

var transporter  = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'node.todoapp@gmail.com',
		pass: 'Galatians2:20'
	}
});





// const taskSchema = new mongoose.Schema({
// 	title:String,
// 	urgency: String
// });

// let Task = mongoose.model('Task', taskSchema);




const app = express();

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//index route
app.get('/', (req,res) =>{
	res.render('index');
	
});

app.post('/', (req, res)=>{
		console.log('post called')
		// let task = new Task(req.body)
		// console.log(task)
		console.log(req.body)
		var title = (req.body.title)
		// task.save((err, task)=>{
		// 	if(err){
		// 		console.log('error')
				
		// 	}
		// 	else {
		// 		console.log('saved')
		// 		console.log(task)
		// 	}
		// })
	
	var mailOptions = {
	
	from:    'node.todo.application@gmail.com',
	to:      `${req.body.email}`,
	subject: `${title} Reminder`,
	text:    `This is an email reminder to ${title}.
			  This task is to be completed by ${req.body.time}.
			  This task's urgency is set to ${req.body.urgency}.`
	
};
		
		transporter.sendMail(mailOptions, function(err, info){
		if(err){
			console.log(err)
		}
		else{
			console.log("Email sent:" + info.response);	
		}
	
});
	
	
});


















app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server Running")
});