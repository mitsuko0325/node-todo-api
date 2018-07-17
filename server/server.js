const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
  // console.log(req.body);
  var todo = new Todo({
    text:req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  },(err) => {
    res.status(400).send(err)
    console.log('Unable to save todo');
  })



});




app.listen(3000,() => {
  console.log('Started on port 3000');
});


// var Todo = mongoose.model('Todo',{
//   text:{
//     type:String,
//     required:true,
//     minlength: 1,
//     trim:true
//   },
//   completed:{
//     type:Boolean,
//     default: false
//   },
//   completedAt:{
//     type: Number,
//     default: null
//   }
// });
//
// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo',doc);
// },(err) => {
//   console.log('Unable to save todo');
// });


// var otherTodo = new Todo({
//   text:'Something to do'
//   // text: 'Eat dinner',
//   // completed:false,
//   // completedAt: 0
// });

// otherTodo.save().then((doc) => {
//   console.log('Saved todo',JSON.stringify(doc,undefined,2));
// },(err) => {
//   console.log('Unable to save todo');
// });
//

// user email-required trim type string minlength

// var User = mongoose.model('User',{
//   email:{
//     type:String,
//     required:true,
//     trim:true,
//     minlength:5
//   }
// });
//
// var user = new User({
//   email:'arishou1234@gmail.com'
// });
//
// user.save().then((doc) => {
//   console.log('Saved user',JSON.stringify(doc,undefined,2));
// },(err) => {
//   console.log('Unable to save user');
// })
