
var qt = ["1st", "2nd", "3rd", "4th", "ot"];

function scController($scope, $http, $rootScope) {
    $scope.running = false;

    $scope.time = 720;
    $scope.secw = '00';
    $scope.minw = '12';

    $scope.qt = 0;
    $scope.qtw = qt[0];

    $scope.to1 = 3;
    $scope.to2 = 3;

    $scope.to1w = "* * *"
    $scope.to2w = "* * *"


    $scope.score2 = $scope.score1 = 0;

    $scope.decr = function() {
        var sec = $scope.time % 60;
        var min = parseInt('' + $scope.time / 60);
        $scope.time--;
        $scope.secw = (sec < 10 ? '0' : '') + sec;
        $scope.minw = (min < 10 ? '0' : '') + min;
        if ($scope.time < 0) {
            $scope.minw = $scope.secw = '00';
            clearInterval($scope.timer);
            $scope.running = false;
        }
        $scope.$apply();
    }

    $scope.onKeydown = function(key) {
        console.log(key);

        if (key.keyIdentifier === 'U+0020') { //SPACE
            if ($scope.running == false) {

                $scope.timer = setInterval(function() {
                    $scope.decr()
                }, 1000);
            }
            else {
                clearInterval($scope.timer);
            }
            $scope.running = !$scope.running;
        }

        if (key.keyIdentifier === 'Up' && $scope.time < 715) {
            $scope.time += 6;
            $scope.decr();
        }

        if (key.keyIdentifier === 'Down' && $scope.time > 5) {
            $scope.time -= 5;
            $scope.decr();
        }

        if (key.keyIdentifier === 'Left' && $scope.qt > 0)
            $scope.qtw = qt[--$scope.qt];
        if (key.keyIdentifier === 'Right' && $scope.qt < 4) {
            $scope.qtw = qt[++$scope.qt];
            if ($scope.time <= 0) {
                $scope.time = 720;
                $scope.decr();
                if ($scope.qt == 2 || $scope.qt == 4)
                    $scope.to2 = $scope.to1 = 3;
                
            }
        }

        if (key.keyIdentifier === 'U+0041')
            $scope.score1++;
        if (key.keyIdentifier === 'U+0051' && $scope.score1 > 0)
            $scope.score1--;

        if (key.keyIdentifier === 'U+005A')
            $scope.score2++;
        if (key.keyIdentifier === 'U+0053' && $scope.score2 > 0)
            $scope.score2--;

        if (key.keyIdentifier === 'U+0057') {
            $scope.to1--;
            if ($scope.to1 < 0)
                $scope.to1 = 3;
        }
        if (key.keyIdentifier === 'U+0058') {
            $scope.to2--;
            if ($scope.to2 < 0)
                $scope.to2 = 3;
            
        }
        $scope.majto();
    }

    $scope.majto = function() {
        $scope.to1w = $scope.to1 == 3 ? "* * *" : $scope.to1 == 2 ? "* *" : $scope.to1 == 1 ? "*" : "";
        $scope.to2w = $scope.to2 == 3 ? "* * *" : $scope.to2 == 2 ? "* *" : $scope.to2 == 1 ? "*" : "";
    }

}