
$('body').scrollspy({ target: '#nav-scrollpsy', offset: '-100' });
$(this).scrollspy('refresh');

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$("table.table-floathead").floatThead();



try {
var url = "min/vocabulary-simple.min.json"
$.ajax ({
    url: url,
    dataType: 'json',
    success: function (data) {
        console.log("Načten [json] "+url+" + uložen do localStorage");
        //console.log(data);
        localStorage.setItem('vocabulary', JSON.stringify(data));
        var today = new Date();
        localStorage.setItem('vocabulary-updated', JSON.stringify(today));
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.warn("chyba v [jsonu]: "+url+", stav: "+textStatus+", chybu háže: "+errorThrown);
    }
});

var vocabulary = JSON.parse(localStorage.getItem('vocabulary'));

var category;

var categories = [];
$.each(vocabulary, function( key, val ) {
  //console.log(key);
  categories.push("<li><a href=\"#scroll\" data-category=\""+key+"\">"+key+"</a></li>");
});
$("#set-slovicka").html(categories);

function getTableItems(obj,cat) {
  var items = [];
  $.each( vocabulary[cat], function( key, val ) {
    //console.log(val);
    val = val.toString().replace(",",", ");
    items.push("<tr><th>"+key+"</th><td>"+val+"</td></tr>")    
  });
  $(obj).html(items);
  $(obj).prev("h2").html(cat);
  $("#set-slovicka li.active").removeClass("active");
  $("#set-slovicka a[data-category='"+cat+"']").parent().addClass("active");
}

getTableItems("#get-slovicka","abstract");

$("#set-slovicka a").on("click", function () {
  category = $(this).data("category");
  //console.log(category);
  getTableItems("#get-slovicka",category);
  $('.affix').removeClass("affix").addClass("affix-top").removeAttr('style');
});

//console.log(items);

}
catch(err) {
  console.warn("Problém s načítáním jsonu. Pracujete na localhostu?");
}

$('#learning #input_word').focus();

var word = "zelená";

$('#learning #input_word').on("keyup", function () {
  var actual = $(this).val();
  word = word.toLowerCase();
  actual = actual.toLowerCase();
  console.log(actual);
  if (actual == "") {
    $('#learning .form-group').removeClass('has-success').removeClass('has-error');
    $('#learning .form-control-feedback').removeClass('glyphicon-remove').removeClass('glyphicon-ok');
  }
  else {
    if (word.indexOf(actual) >= 0) {
      $('#learning .form-group').removeClass('has-error').addClass('has-success');
      $('.form-control-feedback').removeClass('glyphicon-remove').addClass('glyphicon-ok');
      if (word == actual) {
        $('#learning .form-group').removeClass('has-success');
        $("#input_word").attr('disabled', true);
        $("#next_word").removeClass("btn-default").addClass("btn-primary");
        $("#next_word").focus();
      }
    }
    else {
      $('#learning .form-group').removeClass('has-success').addClass('has-error');
      $('.form-control-feedback').removeClass('glyphicon-ok').addClass('glyphicon-remove');
    };
  };

});



// vyskočí modální okno u těch, kteří mají zaplý adblock
function checkAds() {
  if ($(".adsense ins.adsbygoogle").html() == "") {
    $('#hlaska_po_blokaci').modal();
  }
}

$(document).ready(function(){
  setTimeout("checkAds();", 3000);
});