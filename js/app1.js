var categoryListings = [
   {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
   {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
   {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
]
// Create a book constructor


var bookModel = Backbone.Model.extend({
   url: '',
   parse: function(rawJSON){
     return rawJSON.volumeInfo
   },
   
});

var bookCollection = Backbone.Collection.extend({
   model: bookModel,
   url: '',
   initialize: function(category){
      this.url = 'https://www.googleapis.com/books/v1/volumes?q=subject' + category;
   }
});
//
var AppRouter = Backbone.Router.extend({

  routes: {
    ""                             : "showHomePage",
    "showBookCat/:bookCat/:subCat" : 'showCatPage',
    "showBookCat/:bookCat/"        : 'showCatPage',
    "showThisBook/:bookId"         : 'showMorePage'
  },

  showHomePage: function(){
      var bigHTMLStr = ''
          categoryListings.forEach(function(obj){
          bigHTMLStr += '<div class="col-sm-4 class="text-left"">'
          bigHTMLStr += '<a href="#books/'+obj.catName+'">'
          bigHTMLStr += '<h1>' + obj.catName + '</h1>'
          bigHTMLStr += '</a>'
          bigHTMLStr += '<ul>'

          for (var i = 0; i < obj.subcatList.length; i++) {
          bigHTMLStr += '<a href="#books/'+obj.subcatList[i]+'">'
          bigHTMLStr += '<li>' + obj.subcatList[i] + '</li>'
          bigHTMLStr += '</a>'
          }

          bigHTMLStr +=  '</ul>'
          bigHTMLStr += '</div>'
    }
  console.log("woo");
  document.querySelector('.content-area').innerHTML = bigHTMLStr
  },
  // if (subCat.innerHTML img === "undefined") {
  //   document.appendChild("img of some cat or something idk")
  // }

  initialize: function(){
    Backbone.history.start();
  }

});
//
var newApp = new AppRouter;
