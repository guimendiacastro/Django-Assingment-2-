/*
const element = document.getElementById("myBtn");
element.addEventListener("click", myFunction);

async function myFunction() {
  data = "ttttt"
  const params = "word="+data
  console.log(params) 
  const response =  fetch('http://127.0.0.1:8090/out?' + params);
}
*/
let num = 7
$(document).ready(function(){
  $(".btn").click(function(){
      $.ajax({
        url: 'out',
        type: 'get',
        data: {
          /*button_text: $(this).text()*/
          te : num
        },
        success: function(response) {
          $(".message").text(response.name)
          /*$('#second').append('<li>' + response.second + '<li>')*/
        }
      })
  })


})