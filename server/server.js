const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

const app = express();

// Heroku用の設定
const port = process.env.PORT || 3000

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
  });
});

app.get('/todos',(req,res) => {
  Todo.find().then((todos) => {
    // todosをオブジェクトで使う
    res.send({todos});
    console.log('Success to find');
  },(err) => {
    res.status(400).send(err);
    console.log('Unable to find todo');
  })
});

// GET /todos/12345
app.get('/todos/:id',(req,res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    console.log('id is not valid');
    return res.status(404).send('');
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      console.log('Todo not found');
      res.status(404).send();
    }
    console.log('Todo by id',todo);
    res.send({todo})
  }).catch((err) => {
    console.log(err);
    res.status(400).send();
  });

  //valid id useing isValid
    //404 -send back empty send

  //findById
    //success
     //if todo -send it back
     //if no todo --send back 404 with empty body
    //error
     //400 -
});


app.listen(port,() => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};


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
