// JavaScript Document
jQuery(function($){
	
	Kii.initializeWithSite("0c05c8de", "1a9dad3ba2542a1b231ba930490ab911", KiiSite.US);
	
	$("#login-button").on({
		click:function(){
                $.mobile.showPageLoadingMsg();                
                var username = $("#username").val();
                var password = $("#password").val();

                KiiUser.authenticate(username, password, {
                    success: function(theAuthedUser) {                    	
                        $.mobile.changePage("#adminpanel");                       
                        $.mobile.hidePageLoadingMsg();  
						//var user = KiiUser.getCurrentUser();
						//console.log(user); 
						loadGroups();                     
                    },                    
                    failure: function(theUser, anErrorString) {
			   			$.mobile.hidePageLoadingMsg();
                        alert("Unable to Login: " + anErrorString);
                        Kii.logger("Unable to Login user: " + anErrorString);
                    }
                });
		}
	});
	
	$("#createGroup").on({
		click:function(){
			var groupName = prompt("Enter Group Name","myGroup")
			var group = KiiGroup.groupWithName(groupName);
			group.save({
				success:function(savedGroup){
					var groupUri = savedGroup.objectURI();
					console.log(groupUri);
				},
				failure: function(theGroup, errorString) {
					console.log("Error creating group: " + errorString);
				}
			});
			
		}
	});
	
	function loadGroups(){
		var user = KiiUser.getCurrentUser();
		user.memberOfGroups({
		success: function(theUser, groupList) {
			$("#app").empty();
		for(var i=0; i<groupList.length; i++) {
		  var data = groupList[i];		  
		  // console.log(data.objectURI());
		  $("#app").append("<li>"+data.getName()+"</li>");
		}
		},
		failure: function(theUser, anErrorString) {
		// do something with the error response
	}
});
	function deleteGroup(id){
		var group = new KiiGroup.groupWithURI(mygroup);
			group.delete({
			success:function(){
				alert("Group Deleted");
			}
		})
	}
	$("#addUser").click(function(){
		var user = KiiUser.getCurrentUser();
		console.log(user.memberOfGroups());
		var group = KiiGroup.groupWithURI();
	})
	
	
$("#reload").on({
	click:function(){
		loadGroups();
	}
})

}
})