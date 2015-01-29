Template[getTemplate('postUpvote')].helpers({
  upvoted: function(){
    var user = Meteor.user();
    if(!user) return false;
    return _.include(this.upvoters, user._id);
  },
  downvoted: function() {
    var user = Meteor.user();
    if (!user) return false;
    return _.include(this.downvoters, user._id);
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
    var downvoted = _.include(post.downvoters, Meteor.user()._id);

    if (upvoted) return;

    if (!upvoted) {
      Meteor.call('upvotePost', post, function(error, result){
        trackEvent("post upvoted", {'_id': post._id});
      });
    }

    if (downvoted) {
      Meteor.call('cancelDownvotePost', post, function(error, result) {
        trackEvent('post downvote cancelled', {'_id': post._id});
      });
    }

  },
  'click .downvote-link': function(e, instance) {
    var post = this;
    e.preventDefault();

    if (!Meteor.user()) {
      Router.go('atSignIn');
      flashMessage(i18n.t("please_log_in_first"), "info");
    }

    var upvoted = _.include(post.upvoters, Meteor.user()._id);
    var downvoted = _.include(post.downvoters, Meteor.user()._id);

    if (downvoted) return;

    if (upvoted) {
      Meteor.call('cancelUpvotePost', post, function(error, result) {
        trackEvent('post upvote cancelled', {'_id': post._id});
      });
    }

    Meteor.call('downvotePost', post, function(error, result) {
        trackEvent('post downvoted', {'_id': post._id});
      });
  }
});
