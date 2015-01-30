Template[getTemplate('postInfo')].helpers({
  pointsUnitDisplayText: function(){
    return this.upvotes == 1 ? 'nom' : 'noms';
  },
  getTemplate: function() {
    return getTemplate("postAuthor");
  }
});