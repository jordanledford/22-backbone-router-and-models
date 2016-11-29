var contentArea = document.querySelector(".content-area")

// Create a book constructor

var BooksModel = Backbone.Model.extend ({
  parse: function(rawJSON){
    return rawJSON.volumeInfo
  }
})

var BookCollection = Backbone.Collection.extend({

      model: BooksModel,
      url: "",
      initialize: function(bookSubCat) {
        this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:"+ bookSubCat

      },
      parse: function(rawJSON){
        return rawJSON.items
      }
})

var AppRouter = Backbone.Router.extend({

        routes: {
            "books/:general/:sub-category" : "showGeneralCategory",
            "books/:general" : "showGeneralCategory",
            "" : "showHomePage"
        },

        showGeneralCategory: function(bookCategory){
              var newCat = new BookCollection(bookCategory)
                newCat.fetch().then(function(){
                        var bigHTMLStr = ''
                  newCat.models.forEach(function(modelObj){
                    var catBook = modelObj.get('categories')
                    var mainBooks = modelObj.get('title')
                    var bookImg = modelObj.get('imageLinks')
                          if (bookImg === undefined) {
                            var imageLinks = new Object({
                              thumbnail: "images/file-not-found.png"
                            })
                            modelObj.set('imageLinks', imageLinks)
                            bookImg = modelObj.get('imageLinks')
                          } else {
                             bookImg.thumbnail
                          }
                            bigHTMLStr += '<div class="col-xs-12 col-sm-3">'
                            bigHTMLStr +=   '<div class="thumbnail book-thumb">'
                            bigHTMLStr +=     '<img src="' + bookImg.thumbnail + '">'
                            bigHTMLStr +=       '<p>'+ mainBooks + '</p>'
                            bigHTMLStr +=   '</div>'
                            bigHTMLStr += ' </div>'
                })
                document.querySelector('.content-area').innerHTML = bigHTMLStr
              })
        },

  showHomePage: function(genBookInfo){
      var categoryListings = [
       {catName: "Fiction", subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
       {catName: "Nonfiction", subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
       {catName: "Miscellaneous", subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
      ]
        var bigHTMLStr = ''
        categoryListings.forEach(function(props){
          bigHTMLStr += '<div class=" col-xs-12 col-sm-4 class="text-left"">'
          bigHTMLStr += '<a href="#books/' + props.catName + '">'
          bigHTMLStr += '<h1>' + props.catName + '</h1>'
          bigHTMLStr += '</a>'
          bigHTMLStr += '<ul>'
          for(var i = 0; i < props.subcatList.length; i++){
          bigHTMLStr += '<a href="#books/' + props.subcatList[i] + '">'
          bigHTMLStr += '<li>' + props.subcatList[i] + '</li>'
          bigHTMLStr += '</a>'
          }
          bigHTMLStr +=  '</ul>'
          bigHTMLStr += '</div>'
        })
        contentArea.innerHTML = bigHTMLStr
  },
  initialize: function(){
  Backbone.history.start()
  },
})

var newApp = new AppRouter()
