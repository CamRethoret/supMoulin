/**
 * Created with JetBrains PhpStorm.
 * User: Camille Rethoret
 * Date: 21/05/13
 * Time: 15:24
 * To change this template use File | Settings | File Templates.
 */
jQuery(document).ready(function($) {


    /** Variables globales **/

    /* Nombre de tour */
    var tour = 1
    var nbrTour = 0;
    var nbrTour1 = 0;
    var nbrTour2 = 0;
    $('span#aQuiLeTour').html(1);
    $('span#nbrTour1').html(nbrTour1);
    $('span#nbrTour2').html(nbrTour2);
    $('span#nbrTour').html(nbrTour);


    /**  Liste des emplaçements cliquables **/

    /*  Emplacement ligne 1 */
    var l1c1 = $('td#l1c1');
    var l1c4 = $('td#l1c4');
    var l1c7 = $('td#l1c7');

    /*  Emplacement ligne 2 */
    var l2c2 = $('td#l2c2');
    var l2c4 = $('td#l2c4');
    var l2c6 = $('td#l2c6');

    /*  Emplacement ligne  */
    var l3c3 = $('td#l3c3');
    var l3c4 = $('td#l3c4');
    var l3c5 = $('td#l3c5');

    /*  Emplacement ligne  */
    var l4c1 = $('td#l4c1');
    var l4c2 = $('td#l4c2');
    var l4c3 = $('td#l4c3');
    var l4c5 = $('td#l4c5');
    var l4c6 = $('td#l4c6');
    var l4c7 = $('td#l4c7');

    /*  Emplacement ligne  */
    var l5c3 = $('td#l5c3');
    var l5c4 = $('td#l5c4');
    var l5c5 = $('td#l5c5');


    /*  Emplacement ligne  */
    var l6c2 = $('td#l6c2');
    var l6c4 = $('td#l6c4');
    var l6c6 = $('td#l6c6');

    /*  Emplacement ligne  */
    var l7c1 = $('td#l7c1');
    var l7c4 = $('td#l7c4');
    var l7c7 = $('td#l7c7');

    /* Gestion des pions */

    /* On ajoute le pion 1 sur l'idCell en paramètre */
    function addPion1(idCell){
        $('#'+idCell).addClass('j1');
        $('#'+idCell).html('<div class="pion1"></div>');
        nbrTourJoueur1();
    }

    /* On ajoute le pion 2 sur l'idCell en paramètre */
    function addPion2(idCell){
        $('#'+idCell).html('<div class="pion2"></div>');
        $('#'+idCell).addClass('j2');
        nbrTourJoueur2();
    }

    // On compte combien de tour on été joué
    function nbrTourJoueur1(){
        var nbrTour1 = $('span#nbrTour1').html();
        nbrTour1++
        $('span#nbrTour1').html(nbrTour1);
    }

    function nbrTourJoueur2(){
        var nbrTour2 = $('span#nbrTour2').html();
        nbrTour2++
        $('span#nbrTour2').html(nbrTour2);
    }

    function nbrTourTotal(){
        var nbrTour = $('span#nbrTour').html();
        var nbrTour1 = $('span#nbrTour1').html();
        var nbrTour2 = $('span#nbrTour2').html();
        console.log("Le joueur 1 a joué :" +nbrTour1);
        console.log("Le joueur 2 a joué :" +nbrTour2);
        if(nbrTour1==nbrTour2){
            nbrTour++
            $('span#nbrTour').html(nbrTour);
        }

    }

    /* Fonction qui vérifie si il y a des moulins */

    function moulinl1(){
        var l1c1 = $('td#l1c1');
        var l1c4 = $('td#l1c4');
        var l1c7 = $('td#l1c7');
    }



    /* Gestion du clic */
    $('.cliquable').click(function() {
        var clickCell = $(this).attr("id");
        if($('#'+clickCell).hasClass('occupe')){
            alert("Cette case est occupe !");
        }
        else{
            var aQuiLeTour = $('span#aQuiLeTour').html();
            console.log(aQuiLeTour);
            console.log('On clique sur la cellule '+clickCell);
            switch (aQuiLeTour){
                case("1"):
                    addPion1(clickCell);
                    $('span#aQuiLeTour').html(2);
                    break;
                case("2"):
                    addPion2(clickCell)
                    $('span#aQuiLeTour').html(1);
                    break;
            }
            nbrTourTotal();
            $('#'+clickCell).addClass('occupe');

        }
    });




});