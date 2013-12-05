
var qt = ["1st", "2nd", "3rd", "4th", "ot"];

function scController($scope, $http, $rootScope) {
    $scope.running = false;

    $scope.time = 900;
    $scope.secw = '00';
    $scope.minw = '15';

    $scope.qt = 0;
    $scope.qtw = qt[0];

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

        if (key.keyIdentifier === 'Up' && $scope.time < 895) {
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
                $scope.time = 900;
                $scope.decr();
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

    }


}