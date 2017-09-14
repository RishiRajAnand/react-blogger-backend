'use strict';

var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoDs;
  
  //create all models
  async.parallel({
    bloggers: async.apply(createBloggers)
  }, function(err, results) {
    if (err) throw err;
    createBlogs(results.bloggers,function(err) {
      console.log('>>>> Models have been created');
        console.log('Use Email as Rishiraj@gmail.com and password as Rishiraj please');
    });
  });
  //creates bloggers
  function createBloggers(cb) {
    mongoDs.automigrate('Blogger', function(err) {
      if (err) return cb(err);
      var Blogger = app.models.Blogger;
      Blogger.create([{
        email: 'Rishiraj@gmail.com',
        password: 'Rishiraj',
      }, {
        email: 'Priyanka@yahoo.com',
        password: 'Priyanka',
      }, {
        email: 'Ankur@gmail.com',
        password: 'Ankur',
      }], cb);
    });
  }
  
  //create blogs
  function createBlogs(bloggers, cb) {
    mongoDs.automigrate('Blog', function(err) {
      if (err) return cb(err);
      var Blog = app.models.Blog;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Blog.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        content: 'It’s pretty much a foregone conclusion that you’ll brush your teeth tomorrow morning. You don’t squander precious mental space evaluating whether or not brushing your teeth is worth the opportunity cost of let’s say, another five minutes of sleep. The same is true for showering, going to the bathroom, grooming your nails and facial hair....',
        publisherId: bloggers[0].id
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        content: 'Imagine a glass of coconut water, supposed to be good for health. Let’s say this coconut water has arsenic mixed in it. You tell people not to drink it. They turn around and say, “But…',
        publisherId: bloggers[1].id
      
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        content: ' India will need to rethink its stance on internet shutdowns if the digital payments push is to continue. Over the last few years, suspending internet services partially or otherwise has emerged as a favoured tactic…',
        publisherId: bloggers[1].id
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
      
        content: 'A worrisome aspect of economic policy decisions taken in India is the seeming absence of a cost-benefit analysis of the decisions. If there is a cost-benefit analysis done when tax policies are changed or a…',
        publisherId: bloggers[2].id
      }], cb);
    });
  }
};
