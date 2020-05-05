var bk = document.getElementsById('bookmark');


function myBookmark() {
    if (bk.classList.contains("far")) {
        bk.classList.remove("far");
        bk.classList.add("fas");
    } else {
        bk.classList.remove("fas");
        bk.classList.add("far");
    }
}


/* $(document).ready(function(){
    $("#bookmark").click(function(){
      if($("#bookmark").hasClass("far fa-heart")){
        $("#bookmark").html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
        $("#bookmark").removeClass("liked");
      }else{
        $("#bookmark").html('<i class="fa fa-heart" aria-hidden="true"></i>');
        $("#bookmark").addClass("liked");
      }
    });
  }); */