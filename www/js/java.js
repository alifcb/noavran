// JavaScript Document
    app.initialize();
$(document).ready(function(){	

// محتویپا رویدادها
$.ajax({
url:"http://www.shahreroya.ir/phonegap/api/api.php",
type:"GET",
datatype:"json",
data:{type:"content"},
contenttype:"appliction/json",
 beforeSend: function() {
document.getElementById("ali").innerHTML = '<img class="loader" src="img/ajaxload.gif" />';	 
 },
success:function(response){
text = JSON.stringify(response);
arr = JSON.parse(text);

var i;
var out='';
for(i = 0; i < arr.length; i++) {
out +='<li onClick="posts('+arr[i].id+');" data-icon="false"><a href="#content" data-transition="slide"  ><img width="300" height="250px" src=http://'+
arr[i].ip+arr[i].direct+arr[i].pic 
+'><h3>'+
arr[i].subject 
+'</h3><p>'+
arr[i].texts 
+' </p></a></li>';
}
document.getElementById("ali").innerHTML =  out;
$(".listst").listview("refresh");
},
error:function(err){
//alert('mohtava'.JSON.stringify(err));
		
},	})
});

$(document).ready(function(){	
//پیامهای روز	
$.ajax({
url:"http://www.shahreroya.ir/phonegap/api/api.php",
type:"GET",
datatype:"json",
data:{type:"payam"},
contenttype:"appliction/json",
success:function(response){
text = JSON.stringify(response);
arr = JSON.parse(text);
var i;
var out='';
for(i = 0; i < arr.length; i++) {
out +='<p>'+
arr[i].text 
+' </p>';
}
if(out==''){setInterval("payam()",2000);}
document.getElementById("payams").innerHTML =  out;
},
error:function(err){
//alert('payam'.JSON.stringify(err));
	
},	})
});

function payam(){
$.ajax({
url:"http://www.shahreroya.ir/phonegap/api/api.php",
type:"GET",
datatype:"json",
data:{type:"payam"},
contenttype:"appliction/json",
success:function(response){
text = JSON.stringify(response);
arr = JSON.parse(text);
var i;
var out='';
for(i = 0; i < arr.length; i++) {
out +='<p>'+
arr[i].text 
+' </p>';
}
if(out==''){setInterval("payam()",2000);}
document.getElementById("payams").innerHTML =  out;
},
error:function(err){
//alert(JSON.stringify(err));
	
},	})
}

//نمایش هر پست
function posts(id,what){
$('#owl-demo3 img').attr('src', '');
$.ajax({
url:"http://www.shahreroya.ir/phonegap/api/api.php",
type:"GET",
datatype:"json",
data:{type:"post",idpost:id,whats:what},
contenttype:"appliction/json",
 beforeSend: function() {
document.getElementById("postc").innerHTML = '<img class="loader" src="img/ajaxload.gif" />';	 
 },
success:function(response){
text = JSON.stringify(response);
arr = JSON.parse(text);
var i;
var out='';
for(i = 0; i < arr.length; i++) {
out +='<h4>'+
arr[i].subject
+'</h4><p class="dates">'+
arr[i].dates 
+'</p><br/><p>'+
arr[i].texts 
+'</p><p id="codp" style="visibility:hidden" >'+
arr[i].id
+'</p>';
src='http://'+arr[i].ip+arr[i].direct+arr[i].pic ;
$('#owl-demo3 img').attr('src', src);
}
document.getElementById("postc").innerHTML =  out;	
},
error:function(err){
//	alert(JSON.stringify(err));
	//setInterval("posts()",2000);
},	

})
}

// دسته بندی ها
function cat(id){

$.ajax({
url:"http://www.shahreroya.ir/phonegap/api/api.php",
type:"GET",
datatype:"json",
data:{type:"category", idcat:id},
contenttype:"appliction/json",
beforeSend: function() {
document.getElementById("catlist").innerHTML = '<img class="loader" src="img/ajaxload.gif" />';	 
},
success:function(response){
text = JSON.stringify(response);
arr = JSON.parse(text);
var i;
var out='';
for(i = 0; i < arr.length; i++) {
out +='<li onClick="posts('+arr[i].id+')" data-icon="false"><a href="#content" data-transition="slide"  ><img width="300" height="250px" src=http://'+
arr[i].ip+arr[i].direct+arr[i].pic 
+'><h3>'+
arr[i].subject 
+'</h3><p>'+
arr[i].texts 
+' </p></a></li>';
}
if(out==''){
	document.getElementById("catlist").innerHTML = '<li>اطلاعاتی در دست نیست!!</li>';
	document.getElementById("ncat").innerHTML = 'دسته بندی'  ;			
};
document.getElementById("ncat").innerHTML = arr[0].name  ;	
document.getElementById("catlist").innerHTML =  out;

$(".listcat").listview("refresh");		
},
error:function(err){
 
//alert(JSON.stringify(err));
 // setInterval("cat()",2000);
},	})
}

// دسته زیر بندی ها
function subc(id){
$.ajax({
url:"http://www.shahreroya.ir/phonegap/api/api.php",
type:"GET",
datatype:"json",
data:{type:"category", idsub:id},
contenttype:"appliction/json",
beforeSend: function() {
document.getElementById("catlist").innerHTML = '<img class="loader" src="img/ajaxload.gif" />';	 
},
success:function(response){
text = JSON.stringify(response);
arr = JSON.parse(text);
var i;
var out='';
for(i = 0; i < arr.length; i++) {
out +='<li onClick="posts('+arr[i].id+')" data-icon="false"><a href="#content" data-transition="slide"  ><img width="300" height="250px" src=http://'+
arr[i].ip+arr[i].direct+arr[i].pic 
+'><h3>'+
arr[i].subject 
+'</h3><p>'+
arr[i].texts 
+' </p></a></li>';
}
if(out==''){
	document.getElementById("catlist").innerHTML = '<li>اطلاعاتی در دست نیست!!</li>';
	document.getElementById("ncat").innerHTML = 'دسته بندی'  ;			
};
document.getElementById("ncat").innerHTML = arr[0].name ;
document.getElementById("catlist").innerHTML =  out;
$(".listcat").listview("refresh");		
},
error:function(err){
	//alert(JSON.stringify(err));
		//setInterval("subc()",2000);
},	})
}


document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);
function onOffline() {
	 $("#status2").removeClass("online");
	 $("#status").removeClass("online");
	 $("#status").addClass("offline");
	 $("#status2").addClass("offline");
    // Handle the offline event
    if($.mobile.activePage.is('#pageone')){
    navigator.notification.confirm("دسترسی شما به اینترنت برقرار نیست! آیا می خواهید از برنامه خارج شوید؟ ", onConfirm, "خروج از برنامه!", "بله,خیر"); 
    // Prompt the user with the choice
    function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
        return;
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
    }
}
  
}else {
        navigator.app.backHistory()
    }
}
function onOnline() {

	 $("#status").removeClass("offline");
	 $("#status2").removeClass("offline");
    $("#status2").addClass("online");
	 $("#status").addClass("online");	
}


$( document ).on("swipeleft swiperight", ".ui-content", function( e ) {
// We check if there is no open panel on the page because otherwise
// a swipe to close the left panel would also open the right panel (and v.v.).
// We do this by checking the data that the framework stores on the page element (panel: open).
if ($.mobile.activePage.jqmData( "panel" ) !== "open") {
if ( e.type === "swipeleft"  ) {
$( "#myPanel" ).panel( "open" );
} else if ( e.type === "swiperight" ) {
$( "#myPanel" ).panel( "close" );
}
}
});

$(document).on("pagecreate","#content",function(){
$( document ).on("swipeleft swiperight", "body", function( e ) {
if ( e.type === "swipeleft"  ) {
   idnp=document.getElementById("codp").innerHTML;
   posts(idnp,'next');
} else if ( e.type === "swiperight" ) {
	idpp=document.getElementById("codp").innerHTML;
    posts(idpp,'previous');
}});
                   
});

function exitFromApp()
{
  navigator.app.exitApp();
}

