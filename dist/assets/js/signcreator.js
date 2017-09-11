var signs = [];


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
  $(".tooltip").tooltip({delay: 50});
  $('select').material_select();
});

if(localStorage.getItem("settings") == null){
  var settings = {
    beautify: false,
    beautifyTabs: false
  };
}else{
  var settings = JSON.parse(localStorage.getItem("settings"));
}

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
    this.lines = new Array();
    this.lines[0] = line1;
    this.lines[1] = line2;
    this.lines[2] = line3;
    this.lines[3] = line4;
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
    return this.lines[0];
  }

  getLine2(){
    return this.lines[1];
  }

  getLine3(){
    return this.lines[2];
  }

  getLine4(){
    return this.lines[3];
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
    this.lines[0] = line1;
  }

  setLine2(line2){
    this.lines[1] = line2;
  }

  setLine3(line3){
    this.lines[2] = line3;
  }

  setLine4(line4){
    this.lines[3] = line4;
  }

  update(world, x, y, z, line1, line2, line3, line4) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.z = z;
    this.lines[0] = line1;
    this.lines[1] = line2;
    this.lines[2] = line3;
    this.lines[3] = line4;
  }
}

$("#importBtn").click(function(event){
  event.preventDefault();
  
  $("#import").modal({
    dismissable: true,
    ready: function(modal, trigger){
      $("#importCodeBox").val("");
      
      $("#importCodeCancel").click(function(event){
        event.preventDefault();
        $("#importCodeBox").val("");
        $("#import").modal('close');
      });
      
      $("#importCodeImport").click(function(event){
        event.preventDefault();
        
        try {
          var code = $("#importCodeBox").val();
          signsTemp = JSON.parse(code);
          signs = new Array();
          signsTemp.forEach(function(sign){
            signs.push(new Sign(sign.world, sign.x, sign.y, sign.z, sign.lines[0], sign.lines[1], sign.lines[2], sign.lines[3]));
          });
          updateSignSelector();
          Materialize.toast("Signs loaded. Reload to clear signs.", 4000);
        }catch(err){
          Materialize.toast("Invalid signs file. Please check your input and try again.", 4000);
        }
        
        
        $("#importCodeBox").val("");
        
        $("#import").modal('close');
      });
    }
  });
  
  $("#import").modal('open');
});

$("#exportBtn").click(function(event){
  event.preventDefault();
  $("#exportCode").remove();
  $("body").append(`
    <div id="exportCode" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Export to MultiLanguagePlugin</h4>
        <textarea id="code" style='height:calc(100% - 4rem);font-family:monospace;border:0;'></textarea>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Done</a>
      </div>
    </div>
  `);
  $("#exportCode").modal({
    dismissable: true,
    ready: function(modal, trigger){
      if(settings.beautify){
        var codeValue = JSON.stringify(signs, null, (settings.beautifyTabs ? "\t" : 4));
      }else{
        var codeValue = JSON.stringify(signs);
      }

      $("#exportCode #code").text(codeValue);
      $("#exportCode #code").select();

      $("#exportCode #code").click(function(){
        $(this).select();
      });

      $("#exportCode #code")[0].addEventListener("input", function(){
        this.value = codeValue;
        $(this).select();
      }, false);
    },
    complete: function(){
      $("#exportCode").remove();
    }
  });
  $("#exportCode").modal('open');
});

$("#settingsBtn").click(function(event){
  event.preventDefault();
  $("#settings").modal({
    dismissable: true,

    ready: function(modal, trigger){
      $(".link-setting.boolean").each(function(){
        $(this).prop('checked', eval("settings." + $(this)[0].id));
      });

      $("#settings #btnCancel").click(function(event){
        event.preventDefault();
        $("#settings").modal('close');
      });

      $("#settings #btnSave").click(function(event){
        event.preventDefault();

        $(".link-setting.boolean").each(function(){
          eval("settings." + $(this)[0].id + " = " + $(this).prop('checked') + ";");
        });

        localStorage.setItem('settings', JSON.stringify(settings));

        $("#settings").modal('close');
      });
    }
  });
  $("#settings").modal('open');
});

$("#saveBtn").click(function(event){
  event.preventDefault();
  localStorage.setItem('signs', JSON.stringify(signs));

  let toastContent = $('<span>Saved!</span>');
  Materialize.toast(toastContent, 4000);
  $("#undoSaveBtn").click(function(event){
    event.preventDefault();
    localStorage.removeItem('signs');
  });
});

$("#loadBtn").click(function(event){
  event.preventDefault();
  if(localStorage.getItem('signs') != null){
    signsTemp = JSON.parse(localStorage.getItem('signs'));
    signs = new Array();
    signsTemp.forEach(function(sign){
      signs.push(new Sign(sign.world, sign.x, sign.y, sign.z, sign.lines[0], sign.lines[1], sign.lines[2], sign.lines[3]));
    });
    updateSignSelector();
    Materialize.toast("Signs loaded. Reload to clear signs.", 4000);
  }else{
    Materialize.toast("Unable to load signs - you have nothing saved.", 4000);
  }
});
