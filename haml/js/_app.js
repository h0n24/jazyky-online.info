// scollpsy (posouvání levého menu při scrollování)
$('body').scrollspy({ target: '#nav-scrollpsy', offset: '-100' });
$(this).scrollspy('refresh');

// funkce, která zajišťuje pěkné posouvání při kliku na href s kotvou na id (#top kupříkladu)
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

// tabulka s fixovanými headry
$("table.table-floathead").floatThead();

// načítání slovíček do local storage, pokud se pracuje lokálně, nebo bez přístupu na internet, funkce try odchytí chybu
try {
  var url = "min/vocabulary-simple.min.json"
  $.ajax ({
      url: url,
      dataType: 'json',
      success: function (data) {
          console.log("Načten [json] "+url+" + uložen do localStorage");
          localStorage.setItem('vocabulary', JSON.stringify(data));
          var today = new Date();
          localStorage.setItem('vocabulary-updated', JSON.stringify(today));
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.warn("[json] "+url+" nebyl správně načten.");
      }
  });
} catch(err) {
  console.warn("Problém s načítáním jsonu. Pracujete na localhostu? Err_code: " + err);
}

// načítání slovíček z local storage, generování stránky slovicka.haml
try {
  var vocabulary = JSON.parse(localStorage.getItem('vocabulary'));

  var render_table_categories = [];
  $.each(vocabulary, function(key, val) {
    render_table_categories.push("<li><a href=\"#scroll\" data-category=\""+key+"\">"+key+"</a></li>");
  });
  $("#set-slovicka").html(render_table_categories);

  function getTableItems(obj,cat) {
    var items = [];
    $.each(vocabulary[cat], function(key, val) {
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
    var category = $(this).data("category");
    getTableItems("#get-slovicka",category);
    $('.affix').removeClass("affix").addClass("affix-top").removeAttr('style');
  });

} catch(err) {
  console.warn("Problém s načítáním localStorage. " + err);
}


// testování slovíček (beta verze kódu)

$('#learning #input_word').focus();

$('#learning #input_word').on("keyup", function () {
  var actual = $(this).val().toLowerCase();
  var word = ["zelený", "zelená", "zelené"];
  
  if (actual == "") {
    $('#learning .form-group').removeClass('has-success').removeClass('has-error');
    $('#learning .form-control-feedback').removeClass('glyphicon-remove').removeClass('glyphicon-ok');
  }
  else {
    for (var i = 0; i < word.length; i++) {
      word[i] = word[i].toLowerCase();
      if (word[i].indexOf(actual) >= 0) {
        $('#learning .form-group').removeClass('has-error').addClass('has-success');
        $('.form-control-feedback').removeClass('glyphicon-remove').addClass('glyphicon-ok');
        if (word[i] == actual) {
          $('#learning .form-group').removeClass('has-success');
          $("#input_word").attr('disabled', true);
          $("#next_word").removeClass("btn-default").addClass("btn-primary");
          $("#next_word").focus();
          break;
        }
      }
      else {
        $('#learning .form-group').removeClass('has-success').addClass('has-error');
        $('.form-control-feedback').removeClass('glyphicon-ok').addClass('glyphicon-remove');
      };
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