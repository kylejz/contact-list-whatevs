var app = angular.module("contacts", ["firebase"]);

app.controller("ctrl", function($scope, $firebaseArray, $firebaseObject) {
	
	$scope.showModal = false;
	$scope.showEditForm = false;
	$scope.showNewForm = false;
	$scope.reverse = false;
	$scope.orderParam = "";

	var ref = new Firebase("http://interview-contacts.firebaseio.com/contacts");
	$scope.contactList = $firebaseArray(ref);

	$scope.addNewContact = function() {
		$scope.showNewForm = true;
	}

	$scope.addContact = function(obj) {
		$scope.contactList.$add(obj)
		.then(function(response) {
			$scope.newContact = null;
			$scope.showNewForm = false;
		});
	};

	$scope.deleteContact = function(obj) {
		obj.showExplosion = true;
		setTimeout(function() {	
			$scope.contactList.$remove(obj)
			.then(function(response) {
				obj.showExplosion = false;
			});
		}, 500);
	};

	$scope.editContact = function(obj) {
		$scope.editedContact = obj;
		$scope.showEditForm = true;
	};

	$scope.changeContact = function(obj) {
		console.log('something');
		$scope.contactList.$save(obj)
		.then(function(response) {
			$scope.editedContact = null;
			$scope.showEditForm = false;
		})
	}

	$scope.showDetails = function(obj) {
		if (!obj.showExtra) {
			obj.showExtra = true;
		} else {
			obj.showExtra = false;
		}
	};

	$scope.cancelEditForm = function() {
		$scope.showEditForm = false;
		$scope.editedContact = null;
	}

	$scope.cancelNewForm = function() {
		$scope.showNewForm = false;
		$scope.newContact = null;
	}

	$scope.headers = [
		{
			show: 'First Name',
			send: 'firstName'
		},
		{
			show: 'Last Name',
			send: 'lastName'
		},
		{
			show: 'Phone Number',
			send: 'number'
		},
		{
			show: 'Email Address',
			send: 'email'
		}
	];

	$scope.setOrderParam = function(str) {
		$scope.orderParam = str;
	};

	$scope.changeReverse = function() {
		$scope.reverse = !$scope.reverse;
	}

});