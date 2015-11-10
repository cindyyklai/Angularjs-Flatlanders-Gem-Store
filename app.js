(function() {
  var app = angular.module('gemStore', ['store-directives', 'pascalprecht.translate']);

  app.controller('StoreController', ['$translate', '$http', function($translate, $http){
    var store = this;
    store.products = [];
    $http.get('/store-products.json').success(function(data) {
      store.products = data;
    });
  }]);

  app.controller('ReviewController', function() {
    this.review = {};

    this.addReview = function(product) {
      product.reviews.push(this.review);

      this.review = {};
    };
  });

  app.config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    });

    // Tell the module what language.  If the preferred language is not provided
    // in the URL, use en_us as the default.
    $translateProvider.preferredLanguage('en_us');
    lang = getURLParameter('lang');

    if (typeof lang !== "undefined" && lang != '')
    {
      $translateProvider.preferredLanguage(lang);
    }
  }]);


  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
  }

})();