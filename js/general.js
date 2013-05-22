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

    /* Fonction qui vérifie pour les point a, b et c faisant partie d'une ligne, si ils sont en position de moulin */
    function verifMoulin(a, b, c){
        var a = $('td#'+a);
        var b = $('td#'+b);
        var c = $('td#'+c);

        for(var i=1; i<=2; i++){
            if(a.hasClass("j"+i) & b.hasClass("j"+i) & c.hasClass("j"+i)){
                console.log('Moulin joueur '+i);
                a.addClass('moulin');
                b.addClass('moulin');
                c.addClass('moulin');
            }
            else{
                a.removeClass('moulin');
                b.removeClass('moulin');
                c.removeClass('moulin');
            }
        }
    }



    /* Gestion des pions */

    function addPion(joueur, idCell){
        $('#'+idCell).addClass('j'+joueur);
        $('#'+idCell).html('<div class="pion'+joueur+'"></div>');
        nbrTourJoueur(joueur);
    }


    // On compte combien de tour on été joué
    function nbrTourJoueur(joueur){
        var nbrTour = $('span#nbrTour'+joueur).html();
        nbrTour++
        $('span#nbrTour'+joueur).html(nbrTour);
    }

    // On compte le tour de jeux
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

    /* Gestion du clic */
    $('.cliquable').click(function() {

        // On récupère l'id de la cellule
        var clickCell = $(this).attr("id");

        // Si la celule est déjà occupé, on le notifie
        if($('#'+clickCell).hasClass('occupe')){
            alert("Cette case est occupe !");
        }
        else{

            // On récupère l'id du joueur
            var aQuiLeTour = $('span#aQuiLeTour').html();
            console.log(aQuiLeTour);
            console.log('On clique sur la cellule '+clickCell);
            switch (aQuiLeTour){

                // Pour chaque joueur on...
                case("1"):

                    // Ajoute un de ses pions
                    addPion(1,clickCell);

                    // Incrément son nombre de tour joué
                    $('span#aQuiLeTour').html(2);
                    break;
                case("2"):
                    addPion(2, clickCell)
                    $('span#aQuiLeTour').html(1);
                    break;
            }

            // On compte le nouveau total de tour
            nbrTourTotal();

            // On ajoute la motion "occupe" a la case
            $('#'+clickCell).addClass('occupe');

            // On vérifie si on a des moulins
            verifMoulin('l1c1', 'l1c4', 'l1c7');

        }
    });




});