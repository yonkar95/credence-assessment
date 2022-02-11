
var app = angular.module('crudApp', []);
app.controller('crudController', function($scope, $http,$timeout){
    $scope.success=false;
    $scope.fail=false;
    $scope.message='';
    $scope.count=0;
	$scope.action = 'List';

	$scope.fetchData = function(){
        $scope.action = 'List';
		$http.get('http://localhost:5002/api/v1').success(function(res){
			if(res.success){
                $scope.empList=res.data;
                $scope.count=res.count;
            }
			// $scope.namesData = data;
		});
	};
    $scope.fetchData();


	$scope.fetchSingleData = function(id){
        $scope.action = 'Edit';
		$http({
			method:"GET",
			url:"http://localhost:5002/api/v1/"+id,
			data:$scope.editForm
		}).success(function(data){
           $scope.editForm=data.data;
           $scope.editForm.DOB=new Date(data.data.DOB);
			
		});
	};


	$scope.addEmployee = function(){
        $scope.action = 'Add';
        $scope.editForm={};
	};

	$scope.submitForm = function(){
        if($scope.action=='Add'){
		$http({
			method:"POST",
			url:"http://localhost:5002/api/v1",
			data:$scope.editForm
		}).success(function(data){
            if(data.success){
                $scope.success=true;
                $scope.message="Record successfully added";
                $scope.action = 'List';
                $scope.fetchData();
            }else{
                $scope.fail=true;
                $scope.message="Something went wrong";
            }
            $timeout(function(){
                $scope.success=false;
                $scope.fail=false;
                $scope.message='';
            }, 3000);
		}).error(function(err){
            $scope.fail=true;
            $scope.message="Something went wrong";
            
            $timeout(function(){
                $scope.success=false;
                $scope.fail=false;
                $scope.message='';
            }, 3000);
        });
      }else if($scope.action=='Edit'){
		$http({
			method:"PUT",
			url:"http://localhost:5002/api/v1/"+$scope.editForm.Empid,
			data:$scope.editForm
		}).success(function(data){
            if(data.success){
                $scope.success=true;
                $scope.message="Record successfully updated";
                $scope.action = 'List';
                $scope.fetchData();
            }else{
                $scope.fail=true;
                $scope.message="Something went wrong";
            }
            $timeout(function(){
                $scope.success=false;
                $scope.fail=false;
                $scope.message='';
            }, 3000);
		}).error(function(err){
            $scope.fail=true;
            $scope.message="Something went wrong";
            
            $timeout(function(){
                $scope.success=false;
                $scope.fail=false;
                $scope.message='';
            }, 3000);
        });
      }
	};



	$scope.deleteData = function(id){
		if(confirm("Are you sure you want to remove it?"))
		{
			$http({
                method:"DELETE",
                url:"http://localhost:5002/api/v1/"+id,
                data:$scope.editForm
            }).success(function(data){
                if(data.success){
                    $scope.success=true;
                    $scope.message="Record successfully deleted";
                    $scope.action = 'List';
                    $scope.fetchData();
                }else{
                    $scope.fail=true;
                    $scope.message="Something went wrong";
                }
                $timeout(function(){
                    $scope.success=false;
                    $scope.fail=false;
                    $scope.message='';
                }, 3000);
            }).error(function(err){
                $scope.fail=true;
                $scope.message="Something went wrong";
                
                $timeout(function(){
                    $scope.success=false;
                    $scope.fail=false;
                    $scope.message='';
                }, 3000);
            });
		}
	};


   


});