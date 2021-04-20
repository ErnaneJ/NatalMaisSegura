function menuMobile(){
    document.querySelector('.menuMobile').classList.toggle('showORhide');
    document.querySelector('#toggle').classList.toggle('active');
}

$(function(){
    $("#cep").focusout(function(){
      //Nova variável "cep" somente com dígitos.
      var cep = $("#cep").val().replace(/\D/g, '');
      //Verifica se campo cep possui valor informado.
      if (cep != "") {
          //Expressão regular para validar o CEP.
          var validacep = /^[0-9]{8}$/;
          //Valida o formato do CEP.
          if(validacep.test(cep)) {
           //Consulta o webservice viacep.com.br/
          $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
                  if (!("erro" in dados)) {
                      //Atualiza os campos com os valores da consulta.
                      $("#rua").val(dados.logradouro);
                      $("#bairro").val(dados.bairro);
                  } //end if.
                  else {
                      //CEP pesquisado não foi encontrado.
                      console.log("CEP não encontrado.");
                  }
              });
          } //end if.
          else {
              console.log("Formato de CEP inválido.");
          }
      } //end if.
    });
  });
  function mostrarLocalizacao(posicao){
    let lat = posicao.coords.latitude;
    let lng = posicao.coords.longitude;

    document.querySelector("#lat").value = lat;
    document.querySelector("#lng").value = lng;
}
  function radio(e){
    if(e == '2'){
        document.querySelector("#campo").innerHTML=`
        <div id="space" style="opacity=0"class="inputBox">
                                <input style="border:0;" disabled="disabled" type="text">
                            </div>
        <div class="inputBox">
                                <input type="text" id="lat" name="lat" required="required">
                                <span>Latitude</span>
                            </div>
                            <div class="inputBox">
                                <input type="text" id="lng" name="lng" required="required">
                                <span>Longitude</span>
                            </div>`;
                            if(navigator.geolocation){
                                navigator.geolocation.getCurrentPosition(mostrarLocalizacao);
                            }else{
                                document.querySelector("#campo").innerHTML="Seu navegador não suporta esse recurso.";
                            }
    }else{
        document.querySelector("#campo").innerHTML=`<div class="inputBox">
        <input type="text" id="cep" name="cep" required="required">
        <span>CEP</span>
    </div>
    <div class="inputBox">
        <input type="text" id="rua" name="rua" required="required">
        <span>Rua</span>
    </div>
    <div class="inputBox">
        <input type="text" id="bairro" name="bairo" required="required">
        <span>Bairro</span>
    </div>`;
    
    }
  }

  function modaloff(){
    document.querySelector('.modal_background').classList.toggle('modalOn');
    $("html,body").css({"overflow":"auto"});
  }

  function tell(){
    document.querySelector('.modalTell').classList.toggle('modalOn');
  }
  
  function modal(e){
    document.querySelector('.modal_background').classList.toggle('modalOn');
    $("html,body").css({"overflow":"hidden"});
    $("#modal").css({"overflow":"auto"});
    document.querySelector('.modal_background .modalS .titleMODAL').innerHTML= `
    <img width=150px src="${$(`#${e} img`).attr('src')}" alt="">
    <h2>${document.querySelector(`#${e} .title`).innerHTML}</h2>
    <p>preencha corretamente os campos abaixo.</p>
    `;

  }
