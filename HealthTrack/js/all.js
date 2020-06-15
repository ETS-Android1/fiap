$( document ).ready(function() {
    $("#login").off("click").on("click", function() {
        window.location.href = "/login.html"
    });

    $("#cadastro").off("click").on("click", function() {
        window.location.href = "/cadastro.html"
    });

    $("#cadastrar").off("click").on("click", function() {
        window.location.href = "/index.html"
    });

    $("#logar").off("click").on("click", function() {
        window.location.href = "/dashboard.html"
    });

    $(".modo-claro").off("click").on("click", function() {
       $(".container-main").css('background-color', '#f0f2f5');
    });

    $(".actions").parent().off("click").on("click", function() {
        if ($(".menu").css("visibility") === 'hidden') {
            $(".menu").css({
                "visibility":"visible",
                "opacity":"1"
            })
        } else {
            $(".menu").css({
                "list-style": "none",
                "visibility":"hidden",
                "opacity":"0",
                "-webkit-transition": "opacity 600ms, visibility 600ms",
                "transition": "opacity 600ms, visibility 600ms"
            })
        }
    });

    $(".perfil").off("click").on("click", function() {
        window.location.href = "/perfil.html"
    });

    $(".dash").off("click").on("click", function() {
        window.location.href = "/dashboard.html"
    });

    $("#salvar-perfil").off("click").on("click", function() {
        window.location.href = "/dashboard.html"
    });

    $(".form-atividade").off("click").on("click", function() {
        window.location.href = "/form-atividade.html"
    });

    $("#salvar-atividade, .dashboard-card-atividade").off("click").on("click", function() {
        window.location.href = "/list-atividade.html"
    });

    $(".form-alimento").off("click").on("click", function() {
        window.location.href = "/form-alimento.html"
    });

    $("#salvar-alimento, .dashboard-card-alimento").off("click").on("click", function() {
        window.location.href = "/list-alimento.html"
    });

    $(".form-peso").off("click").on("click", function() {
        window.location.href = "/form-peso.html"
    });

    $("#salvar-peso, .dashboard-card-imc").off("click").on("click", function() {
        window.location.href = "/list-peso.html"
    });

    $(".form-pressao").off("click").on("click", function() {
        window.location.href = "/form-pressao.html"
    });

    $("#salvar-pressao, .dashboard-card-pressao").off("click").on("click", function() {
        window.location.href = "/list-pressao.html"
    });

    $(".sair").off("click").on("click", function() {
        window.location.href = "/index.html"
    });





    

});