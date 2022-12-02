let app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("", { templateUrl: "home.html" })
    .when("/home", { templateUrl: "home.html" })
    .when("/product", { templateUrl: "product.html" })
    .when("/membership", { templateUrl: "membership.html" })
    .when("/aboutUs", { templateUrl: "aboutUs.html" })
    .when("/contactUs", { templateUrl: "contactUs.html" })
    .when("/blog", { templateUrl: "blog.html" })
    .when("/cart", { templateUrl: "cart.html" })
    .when("/logInSignUp", { templateUrl: "logInSignUp.html" });
});

// initialize list of product, album, category, liveshow, contest and sold monthly from route
app.run(function ($rootScope, $http) {
  $rootScope.listOfProduct = [];
  $rootScope.listOfAlbum = [];
  $rootScope.listOfCategory = [];
  $rootScope.listOfLiveshow = [];
  $rootScope.listOfContest = [];
  $rootScope.listOfSoldMonthly = [];
  $rootScope.listOfCart = [];

  $http.get("data.json").then(
    function (response) {
      $rootScope.listOfProduct = response.data.product;
      $rootScope.listOfAlbum = response.data.album;
      $rootScope.listOfCategory = response.data.category;
      $rootScope.listOfLiveshow = response.data.liveshow;
      $rootScope.listOfContest = response.data.contest;
      $rootScope.listOfSoldMonthly = response.data.soldMonthly;
    },
    function (response) { }
  );
});

app.controller("index", function ($scope) { });

app.controller("home", function ($scope) {
  $scope.addAlbumToCart = function (index) {
    $scope.listOfCart.push($scope.listOfAlbum[index]);
    alert("Add successfully!");
  };

  $scope.addCategoryToCart = function (index) {
    $scope.listOfCart.push($scope.listOfCategory[index]);
    alert("Add successfully!");
  };
});

app.controller("product", function ($scope) {
  setYearStatus();

  function setYearStatus() {
    for (let i = 0; i < $scope.listOfProduct.length; i++) {
      if ($scope.listOfProduct[i].year < 2000) {
        $scope.listOfProduct[i].yearStatus = "before2000";
      }
      if (
        $scope.listOfProduct[i].year >= 2000 &&
        $scope.listOfProduct[i].year <= 2010
      ) {
        $scope.listOfProduct[i].yearStatus = "2000To2010";
      }
      if ($scope.listOfProduct[i].year > 2010) {
        $scope.listOfProduct[i].yearStatus = "after2010";
      }
    }
  }

  $scope.addProductToCart = function (index) {
    if ($scope.listOfCart.indexOf($scope.listOfProduct[index]) == -1) {
      $scope.listOfCart.push($scope.listOfProduct[index]);
    } else {
      $scope.listOfCart[$scope.listOfCart.indexOf($scope.listOfProduct[index])]
        .quantity++;
    }
    alert("Add successfully!");
  };

  $scope.showModal = function (index) {
    $scope.productModal = [];
    $scope.productModal.push($scope.listOfProduct[index]);
    console.log($scope.productModal[0]);
    $scope.manualModal = { display: "flex" };
  };

  $scope.closeModal = function () {
    $scope.manualModal = { display: "none" };
  };
});

app.controller("cart", function ($scope) {
  $scope.shipFee = 200;

  cal();

  function cal() {
    $scope.cartTotal = 0;
    $scope.vat = 0;

    for (let i = 0; i < $scope.listOfCart.length; i++) {
      $scope.cartTotal +=
        $scope.listOfCart[i].price * $scope.listOfCart[i].quantity;
    }

    $scope.vat += $scope.cartTotal * 0.1;
  }

  $scope.plusQuantity = function (index) {
    $scope.listOfCart[index].quantity++;
    cal();
  };

  $scope.minusQuantity = function (index) {
    $scope.listOfCart[index].quantity--;
    if ($scope.listOfCart[index].quantity < 0) {
      $scope.listOfCart[index].quantity = 0;
    }
    cal();
  };

  $scope.delete = function (nameToDelete) {
    let index = -1;

    angular.forEach($scope.listOfCart, function (eachOfList, indexOfEach) {
      if (eachOfList.name == nameToDelete) {
        index = indexOfEach;
      }
    });

    if (index >= 0) {
      $scope.listOfCart[index].quantity = 1;
      $scope.listOfCart.splice(index, 1);
    }

    cal();
  };
});

app.controller("membership", function ($scope) { });

app.controller("logInSignUpPage", function ($scope) {
  var checkLogIn = false;
  
  $scope.SignUp = function () {
    localStorage.setItem("emailSignUp", $scope.emailSignUp);
  }
  $scope.SignUp = function () {
    localStorage.setItem("username", $scope.username);
  }
  $scope.SignUp = function () {
    localStorage.setItem("passSignUp", $scope.passSignUp);
  }

  $scope.LogIn = function () {
    var checkEmail = localStorage.getItem("emailSignUp")
    $scope.ngmodel == checkEmail
    checkLogIn = true;
    logInSuccessfully();

    var checkPass = localStorage.getItem("passSignUp")
    $scope.ngmodel == checkPass
    checkLogIn = true;
    logInSuccessfully();
  }

  function logInSuccessfully() {
    if (checkLogIn == true) {
      $scope.form = { display: "none" }
    }
  }
});

// REVEAL
window.addEventListener("scroll", revealOfBlogPage);
window.addEventListener("scroll", revealOfHomePage);
window.addEventListener("scroll", revealOfAboutUsPage);
window.addEventListener("scroll", revealOfMembershipPage);
window.addEventListener("scroll", revealOfContactUsPage);

function revealOfBlogPage() {
  var reveals = document.querySelectorAll(".revealOfBlogPage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 50;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function revealOfHomePage() {
  var reveals = document.querySelectorAll(".revealOfHomePage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 300;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function revealOfAboutUsPage() {
  var reveals = document.querySelectorAll(".revealOfAboutUsPage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 200;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function revealOfMembershipPage() {
  var reveals = document.querySelectorAll(".revealOfMembershipPage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 200;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function revealOfContactUsPage() {
  var reveals = document.querySelectorAll(".revealOfContactUsPage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
