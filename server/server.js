const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/TodoApp'

mongoose.Promise = global.Promise
mongoose.connect(url);

var Todo = mongoose.model('Todo',{
  text:{
    type:String,
    required:true,
    minlength: 1,
    trim:true
  },
  completed:{
    type:Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});

var newTodo = new Todo({
  text: 'Cook dinner'
});

newTodo.save().then((doc) => {
  console.log('Saved todo',doc);
},(err) => {
  console.log('Unable to save todo');
});


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

var User = mongoose.model('User',{
  email:{
    type:String,
    required:true,
    trim:true,
    minlength:5
  }
});

var user = new User({
  email:'arishou1234@gmail.com'
});

user.save().then((doc) => {
  console.log('Saved user',JSON.stringify(doc,undefined,2));
},(err) => {
  console.log('Unable to save user');
})
