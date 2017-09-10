signs = [];

$("img, a").each(function(element){
  $(this)[0].ondragstart = function(){
    return false;
  };
});

function autosize(){
  $(".sign-container").css("bottom", $(".sign-img").height() + 12);
  $(".sign-line").css("height", (($(".sign-img").height() / 2) / 4) - 8 + "px");
  $(".sign-line").css("font-size", (($(".sign-img").height() / 2) / 4) - 16 + "px");
}

$(".disable-no-sign").attr("disabled", true);

$(document).ready(function(){
  autosize();
  $('select').material_select();
});

$(window).resize(function(){
  autosize();
});

$(".input-field input").on('input', function(event){

  if($(this).val().replace(/\&([0-9a-fA-Fl-oL-O]|k|K)/g, '').length <= 16){
    $(this)[0].setCustomValidity("");

    let text;
    if($(this).val().charAt($(this).val().length - 1) == '&'){
      text = $(this).val().slice(0, -1).replace(/\&/g, '\xA7');
    }else{
      text = $(this).val().replace(/\&/g, '\xA7');
    }
    $($(this).data("target")).html(text.replaceColorCodes());

    let currentIndex = $('#signSelector option:selected').val();
    let targetValue = $(this)[0].id;
    eval("signs[currentIndex].set" + targetValue.charAt(0).toUpperCase() + targetValue.slice(1) + "(\"" + $(this).val() + "\")");

    if($(this)[0].id == "line1"){
      updateSignSelector();
      selectSign(currentIndex);
      $(this)[0].select();
      $(this)[0].setSelectionRange($(this)[0].value.length, $(this)[0].value.length);
    }
  }else{
    $(this)[0].setCustomValidity("Invalid field.");
  }
});

$("#signValues").submit(function(event){
  event.preventDefault();
});

function smtnsbatabipsnhptimcbiwtdia(){
  console.log('\x53\x61\x6D\x20\u2764\uD83D\uDC96\x20\x43\x68\x61\x72\x6C\x6F\x74\x74\x65');
}

$("#signSelector").change(function(event){
  let currentSign = $(this).val();

  if(currentSign == -1){
    // create sign
    let newSign = signs.push(new Sign("", 0, 0, 0, "", "", "", "")) - 1;
    // update signSelector
    updateSignSelector();
    selectSign(newSign);
    return;
  }

  let sign = signs[$(this).val()];

  // select sign
  $(".disable-no-sign").attr("disabled", false);
  $("#world").val(sign.getWorld());
  $("#x").val(sign.getX());
  $("#y").val(sign.getY());
  $("#z").val(sign.getZ());
  $("#line1").val(sign.getLine1());
  $("#line2").val(sign.getLine2());
  $("#line3").val(sign.getLine3());
  $("#line4").val(sign.getLine4());

  $("#signValues input").each(function(element){
    let text;
    if($(this).val().charAt($(this).val().length - 1) == '&'){
      text = $(this).val().slice(0, -1).replace(/\&/g, '\xA7');
    }else{
      text = $(this).val().replace(/\&/g, '\xA7');
    }

    $($(this).data("target")).html(text.replaceColorCodes());
  });

  $(".validate").each(function(){
    $(this).removeClass("valid");
    $(this).removeClass("invalid");

    if($(this).val().length > 0){
      if($(this).val().replace(/\&([0-9a-fA-Fl-oL-O]|k|K)/g, '').length <= 16){
        $(this)[0].setCustomValidity("");
        $(this).addClass("valid");
      }else{
        $(this)[0].setCustomValidity("Invalid field.");
        $(this).addClass("invalid");
      }
    }
  });

  Materialize.updateTextFields();
});

function updateSignSelector(){
  $("#signSelector").html("<option value=\"\" disabled selected>Choose a sign...</option><option value=\"-1\">Create a sign...</option>");

  let index = 0;
  signs.forEach(function(sign){
    $("#signSelector").html($("#signSelector").html() + "<option value=\"" + index + "\">" + (sign.getLine1().replace(/\&([0-9a-fA-Fl-oL-O]|k|K)/g, '') || "New Sign") + "</option>");
    index++;
  });

  $('#signSelector').material_select();
}

function selectSign(index){
  $("#signSelector option").each(function(element){
    $(this).attr("selected", false);
  });

  $("#signSelector option[value=\"" + index + "\"]").attr("selected", true);
  $('#signSelector').material_select();

  $("#signSelector").trigger('change');
}

class Sign {
  constructor(world, x, y, z, line1, line2, line3, line4) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.z = z;
    this.line1 = line1;
    this.line2 = line2;
    this.line3 = line3;
    this.line4 = line4;
  }

  getWorld(){
    return this.world;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  getZ(){
    return this.z;
  }

  getLine1(){
    return this.line1;
  }

  getLine2(){
    return this.line2;
  }

  getLine3(){
    return this.line3;
  }

  getLine4(){
    return this.line4;
  }

  setWorld(world){
    this.world = world;
  }

  setX(x){
    this.x = x;
  }

  setY(y){
    this.y = y;
  }

  setZ(z){
    this.z = z;
  }

  setLine1(line1){
    this.line1 = line1;
  }

  setLine2(line2){
    this.line2 = line2;
  }

  setLine3(line3){
    this.line3 = line3;
  }

  setLine4(line4){
    this.line4 = line4;
  }

  update(world, x, y, z, line1, line2, line3, line4) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.z = z;
    this.line1 = line1;
    this.line2 = line2;
    this.line3 = line3;
    this.line4 = line4;
  }
}
