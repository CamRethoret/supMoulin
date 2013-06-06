/**
 * Created with JetBrains PhpStorm.
 * User: Camille Rethoret
 * Date: 21/05/13
 * Time: 15:24
 * To change this template use File | Settings | File Templates.
 */
jQuery(document).ready(function ($) {


    /** Variables globales **/

    /* Nombre de tour */
    var nbrTour = 0;
    var nbrTour1 = 0;
    var nbrTour2 = 0;
    var selection = 0;
    var etat = "marche";
    $('span#aQuiLeTour').html(1);
    $('span#nbrTour1').html(nbrTour1);
    $('span#nbrTour2').html(nbrTour2);
    $('span#nbrTour').html(nbrTour);
    $('span#statut').html(etat);
    $('span#selection').html(selection);

    /* Fonction qui ajoute un moulin */

    function ajouterMoulin(x) {
        $('#' + x).addClass('moulin');
    }

    /* Fonction qui surpime un moulin */

    function supprimerMoulin(x) {
        $('#' + x).removeClass('moulin');
    }

    /* Fonction qui vérifie pour les point a, b et c faisant partie d'une ligne, si ils sont en position de moulin */

    function verifMoulin(a, b, c) {

        var x = $('td#' + a);
        var y = $('td#' + b);
        var z = $('td#' + c);

        for (var i = 1; i <= 2; i++) {
            if (x.hasClass("j" + i) && y.hasClass("j" + i) && z.hasClass("j" + i)) {
                if (x.hasClass('moulin') && y.hasClass('moulin') && z.hasClass('moulin')) {

                } else {
                    ajouterMoulin(a);
                    ajouterMoulin(b);
                    ajouterMoulin(c);
                    var joueur = $('span#aQuiLeTour').html();
                    alert('Moulin en ' + a + ' ' + b + ' ' + c + '. Le joueur ' + joueur + ' doit supprimer un Pion de votre adversaire !');
                    if (joueur === 1) {
                        console.log('FOUDEL');
                        statut('pause');
                    }
                    else {
                        console.log('L\'AI va supprimer un pion');
                        supprimerPionAI(joueur);
                    }
                }
            }
            else {

            }
        }
    }

    /**  Liste des MOULINS **/


    function moulinGlobal() {
        var ligne = [
            ['l1c1', 'l1c4', 'l1c7'],
            ['l2c2', 'l2c4', 'l2c6'],
            ['l3c3', 'l3c4', 'l3c5'],
            ['l4c1', 'l4c2', 'l4c3'],
            ['l4c5', 'l4c6', 'l4c7'],
            ['l5c3', 'l5c4', 'l5c5'],
            ['l6c2', 'l6c4', 'l6c6'],
            ['l7c1', 'l7c4', 'l7c7'],
            ['l1c1', 'l4c1', 'l7c1'],
            ['l2c2', 'l4c2', 'l6c2'],
            ['l3c3', 'l4c3', 'l5c3'],
            ['l1c4', 'l2c4', 'l3c4'],
            ['l5c4', 'l6c4', 'l7c4'],
            ['l3c5', 'l5c5', 'l6c5'],
            ['l2c6', 'l4c6', 'l7c6'],
            ['l1c7', 'l4c7', 'l7c7']
        ];

        for (var i = 0; i < 16; i++) {
            var a = ligne[i][0];
            var b = ligne[i][1];
            var c = ligne[i][2];
            verifMoulin(a, b, c);

        }
    }

    /** On vérifie si le déplacement est autorisé **/
    function deplacement(idCell, destination) {
        var deplacement = [
            ['l1c1', 'l1c4', 'l4c1'],
            ['l1c4', 'l1c1', 'l1c7', 'l2c4'],
            ['l1c7', 'l1c4', 'l4c7'],
            ['l2c2', 'l2c4', 'l4c2'],
            ['l2c4', 'l2c2', 'l2c6', 'l3c4', 'l1c4'],
            ['l2c6', 'l2c4', 'l4c6'],
            ['l3c3', 'l4c3', 'l3c5'],
            ['l3c4', 'l3c3', 'l2c4', 'l3c5'],
            ['l3c5', 'l3c4', 'l4c5'],
            ['l4c1', 'l4c2', 'l1c1', 'l7c1'],
            ['l4c2', 'l4c1', 'l2c2', 'l4c3', 'l6c2'],
            ['l4c3', 'l4c2', 'l3c3', 'l5c3'],
            ['l4c5', 'l3c5', 'l4c6', 'l5c5'],
            ['l4c6', 'l4c5', 'l2c6', 'l4c6', 'l6c6'],
            ['l4c7', 'l1c7', 'l4c6', 'l7c7'],
            ['l5c3', 'l4c3', 'l5c4'],
            ['l5c4', 'l5c3', 'l5c5', 'l6c4'],
            ['l5c5', 'l5c4', 'l4c5'],
            ['l6c2', 'l4c2', 'l6c4'],
            ['l6c4', 'l5c4', 'l6c6', 'l7c4', 'l6c2'],
            ['l7c1', 'l7c4', 'l4c1'],
            ['l7c4', 'l7c1', 'l6c4', 'l7c7'],
            ['l7c7', 'l7c4', 'l4c7']
        ];

        var boucle = true
        var verifLigne = 0
        while (boucle) {

            if (verifLigne >= 18) {
                boucle = false;
                return 0;
            }
            else if (deplacement[verifLigne][0] == idCell) {
                boucle = false;
            }
            else {
                verifLigne++
            }
        }

        for (var i = 1; i < 4; i++) {
            if (deplacement[verifLigne][i] == destination) {
                return 1;
            }
            else {
                return 0;
            }

        }
    }

    /*  Gestion du statut  */
    function statut(etat) {
        $('span#statut').html(etat);
    }


    /** Gestion des pions **/


    /* Ajouter un pion */

    function addPion(joueur, idCell) {
        $('#' + idCell).addClass('j' + joueur);
        $('#' + idCell).html('<div class="pion' + joueur + '"></div>');
        nbrTourJoueur(joueur);
    }

    /* Supprimer un pion */

    function supprimerPion(idCell) {

        if ($('#' + idCell).hasClass('moulin')) {
            alert('Impossible ! Ce pion est en moulin !');
        }

        else if ($('td#' + idCell).hasClass('pion1')) {
            alert('Impossible de supprimer vos propres pions !');
        }

        else if ($('td#' + idCell).hasClass('pion2') || $('div#pion2')) {
            $('td#' + idCell + '> div').remove();
            $('td#' + idCell).removeClass('occupe');
            $('td#' + idCell).removeClass('j2');
            console.log('pion supprimer');
            statut('marche');
        }
        else {
            console.log('ERREUR');
        }
    }


    function deplacerPion(idCell) {

        if ($('td#' + idCell).hasClass('pion2')) {
            alert('Impossible déplacer un pion adverse vos propres pions !');
            return 0;
        }
        else if ($('td#' + idCell).hasClass('pion1') || $('div#pion1')) {
            $('td#' + idCell + '> div').remove();
            $('td#' + idCell).removeClass('occupe');
            $('td#' + idCell).removeClass('j1');
            console.log('pion en attente de déplacement');
        }
        else {
            console.log('ERREUR');
        }
    }

    /* On compte combien de tour on été joué */

    function nbrTourJoueur(joueur) {
        var nbrTour = $('span#nbrTour' + joueur).html();
        nbrTour++
        $('span#nbrTour' + joueur).html(nbrTour);
    }


    /* On compte le tour de jeux */

    function nbrTourTotal() {
        var nbrTour = $('span#nbrTour').html();
        var nbrTour1 = $('span#nbrTour1').html();
        var nbrTour2 = $('span#nbrTour2').html();
        if (nbrTour1 == nbrTour2) {
            nbrTour++
            $('span#nbrTour').html(nbrTour);
        }
    }

    function verifSuite(joueur, a, b, c) {
        var x = $('td#' + a);
        var y = $('td#' + b);
        var z = $('td#' + c);

        switch (joueur) {
            case(1):
                var adversaire = 2;
                break;
            case(2):
                var adversaire = 1;
                break;
        }


        if ((x.hasClass("j" + joueur) && y.hasClass("j" + joueur)) && !z.hasClass("j" + joueur) && !z.hasClass("j" + adversaire)) {
            console.log('Il faut placer un pion en ' + c);
            return c;
        }
        else if ((x.hasClass("j" + joueur) && !y.hasClass("j" + joueur)) && !y.hasClass("j" + adversaire) && z.hasClass("j" + joueur)) {
            console.log('Il faut placer un pion en ' + b);
            return b;
        }
        else if ((!x.hasClass("j" + joueur) && !x.hasClass("j" + adversaire) && y.hasClass("j" + joueur)) && z.hasClass("j" + joueur)) {
            console.log('Il faut placer un pion en ' + a);
            return a;
        }
        else return null

    }

    function supprimerPionAI() {
        console.log('L\'AI va supprimer un pion...');
        var place = ['l1c1', 'l1c4', 'l1c7', 'l2c2', 'l2c4', 'l2c6', 'l3c3', 'l3c4', 'l3c5', 'l4c1', 'l4c2', 'l4c3', 'l4c5', 'l4c6', 'l4c7', 'l5c3', 'l5c4', 'l5c5', 'l6c2', 'l6c4', 'l6c6', 'l7c1', 'l7c4', 'l7c7'];
        var caseOccupe = [];
        $.each(place, function (key, place) {
            if ($('#' + place).hasClass('j1')) {
                caseOccupe.push(place);
            }
        });
        var caseSupp = caseOccupe[Math.floor(Math.random() * caseOccupe.length)];
        $('td#' + caseSupp + '> div').remove();
        $('td#' + caseSupp).removeClass('occupe');
        $('td#' + caseSupp).removeClass('j1');
        console.log('L\'AI décide de supprimer le pion en ' + caseSupp);


    }

    function placeLibre() {
        var place = ['l1c1', 'l1c4', 'l1c7', 'l2c2', 'l2c4', 'l2c6', 'l3c3', 'l3c4', 'l3c5', 'l4c1', 'l4c2', 'l4c3', 'l4c5', 'l4c6', 'l4c7', 'l5c3', 'l5c4', 'l5c5', 'l6c2', 'l6c4', 'l6c6', 'l7c1', 'l7c4', 'l7c7'];
        var caseLibre = [];
        $.each(place, function (key, place) {
            if (!$('#' + place).hasClass('occupe')) {
                caseLibre.push(place);
            }
        });

        return caseLibre[Math.floor(Math.random() * caseLibre.length)];
    }


    function actionAIPremier() {
        console.log('L\'AI va jouer...');
        var ligne = [
            ['l1c1', 'l1c4', 'l1c7'],
            ['l2c2', 'l2c4', 'l2c6'],
            ['l3c3', 'l3c4', 'l3c5'],
            ['l4c1', 'l4c2', 'l4c3'],
            ['l4c5', 'l4c6', 'l4c7'],
            ['l5c3', 'l5c4', 'l5c5'],
            ['l6c2', 'l6c4', 'l6c6'],
            ['l7c1', 'l7c4', 'l7c7'],
            ['l1c1', 'l4c1', 'l7c1'],
            ['l2c2', 'l4c2', 'l6c2'],
            ['l3c3', 'l4c3', 'l5c3'],
            ['l1c4', 'l2c4', 'l3c4'],
            ['l5c4', 'l6c4', 'l7c4'],
            ['l3c5', 'l5c5', 'l6c5'],
            ['l2c6', 'l4c6', 'l7c6'],
            ['l1c7', 'l4c7', 'l7c7']
        ];
        var boucle = true
        var verifLigne = 0
        var action = '';
        while (boucle) {
            if (verifLigne > 15) {
                boucle = false;
            } else {
                var a = ligne[verifLigne][0];
                var b = ligne[verifLigne][1];
                var c = ligne[verifLigne][2];
                var blocMoulin = verifSuite(1, a, b, c);
                if (blocMoulin == a || blocMoulin == b || blocMoulin == c) {
                    console.log('L\'AI a vue que l\' humain peut faire un moulin et décide d\'ajouter un pion en ' + blocMoulin);
                    action = blocMoulin
                    boucle = false;
                }
                else {

                    var blocMoulin = verifSuite(2, a, b, c);
                    if (blocMoulin == a || blocMoulin == b || blocMoulin == c) {
                        console.log('L\'AI a vue le moulin possible et décide  d\'ajouter un pion en ' + blocMoulin);
                        action = blocMoulin
                        boucle = false;
                    }
                    else {
                        console.log('Rien a faire on passe à la ligne suivante');
                        verifLigne++;
                    }

                }
            }
        }
        console.log(action);
        if (action !== '') {
            console.log('L\'AI va ajouter un pion en ' + action);
            addPion(2, action);
            moulinGlobal();
        }
        if (action == '') {
            console.log('L\'AI n\'a pas de moulin à bloquer.');
            console.log('L\'AI n\'a pas de moulin à faire');
            var place = placeLibre();
            console.log('L\'AI va ajouter de manière aléatoire un pion en ' + place);
            addPion(2, place);
            $('#'+place).addClass('occupe');
        }

        $('span#aQuiLeTour').html(1);
        nbrTourTotal();

    }


    /* Gestion du clic */

    $('.cliquable').click(function () {

        var statut = $('span#statut').html();
        console.log(statut)
        var clickCell = $(this).attr("id")
        var nbrTour = $('span#nbrTour').html();
        if (nbrTour < 9) {
            if (statut == "marche") {
                if ($('#' + clickCell).hasClass('occupe')) {
                    alert("Cette case est occupe !");
                }
                else {
                    $('#' + clickCell).addClass('occupe');
                    addPion(1, clickCell);
                    moulinGlobal();
                    nbrTourTotal();
                    actionAIPremier();

                }
            }
            else {
                var joueur = $('span#aQuiLeTour').html();
                supprimerPion(clickCell);

            }
            $('span#aQuiLeTour').html(2);
        }
        else {
            console.log('Deuxième partie du jeu');
            if (statut == "marche") {
                if ($('span#selection').html() == 0) {
                    if ($('#' + clickCell).hasClass('occupe') && $('#' + clickCell).hasClass('j1')) {
                        console.log('Le joueur ' + joueur + ' a selectionne le pion ' + clickCell);
                        $('span#selection').html('1');
                        deplacerPion(clickCell);
                        var enAttente = clickCell;
                        $('span#attente').html(enAttente);
                    }
                    else {
                        alert('Cliquez sur un de vos pions');
                    }
                }
                else if ($('span#selection').html() == 1) {
                    if ($('#' + clickCell).hasClass('occupe')) {
                        alert("Cette case est occupe !");
                    }
                    else {
                        $('span#selection').html('1');
                        var enAttente = $('span#attente').html();
                        var possible = deplacement(enAttente, clickCell);
                        $('#' + clickCell).addClass('occupe');

                        var joueur = $('span#aQuiLeTour').html();


                        $('span#selection').html('0');
                        moulinGlobal();
                        nbrTourTotal();
                    }

                }
            } else {

                supprimerPion(clickCell);
            }
        }

    });


})
;