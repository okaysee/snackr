Template[getTemplate('postUpvote')].helpers({
  upvoted: function(){
    var user = Meteor.user();
    if(!user) return false;
    return _.include(this.upvoters, user._id);
  }
});

Template[getTemplate('postUpvote')].events({
  'click .upvote-link': function(e, instance){
    var post = this;
    e.preventDefault();
    if(!Meteor.user()){
      Router.go('atSignIn');
      flashMessage(i18n.t("please_log_in_first"), "info");
    }
    var upvoted = _.include(post.upvoters, Meteor.user()._id);
    console.log(upvoted);

    if (!upvoted) {
      Meteor.call('upvotePost', post, function(error, result){
        trackEvent("post upvoted", {'_id': post._id});
      });
    } else {
      Meteor.call('cancelUpvotePost', post, function(error, result) {
        trackEvent('post upvote cancelled', {'_id': post._id});
      });
    }
  }
});