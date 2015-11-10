(function(){
  var app = angular.module('store-directives', ['pascalprecht.translate']);

  app.directive("productDescription", function() {
    return {
      restrict: 'E',
      templateUrl: "product-description.html"
    };
  });

  app.directive("productReviews", function() {
    return {
      restrict: 'E',
      templateUrl: "product-reviews.html"
    };
  });

  app.directive("productSpecs", function() {
    return {
      restrict:"A",
      templateUrl: "product-specs.html"
    };
  });

  app.directive("productTabs", function() {
    return {
      restrict: "E",
      templateUrl: "product-tabs.html",
      controller: function() {
        this.tab = 1;

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(activeTab) {
          this.tab = activeTab;
        };
      },
      controllerAs: "tab"
    };
  });

  app.directive("productGallery", function() {
    return {
      restrict: "E",
      templateUrl: "product-gallery.html",
      controller: function() {
        this.current = 0;
        this.setCurrent = function(imageNumber){
          this.current = imageNumber || 0;
        };
      },
      controllerAs: "gallery"
    };
  });

  app.directive("languageSelector", ['$translate', function($translate) {
    return {
      restrict: "E",
      templateUrl: "language-selector.html",
      controller: function() {
        var lang = getURLParameter('lang') == null || getURLParameter('lang') == '' ? 'en_us' : getURLParameter('lang');
        this.tab = lang;

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(activeTab) {
          this.tab = activeTab;
        };

        this.changeLanguage = function (langKey) {
          $translate.use(langKey);
        };
      },
      controllerAs: "tab"
    };
  }]);

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
