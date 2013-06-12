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

    /* Nombre tour joueur 1 */
    var nbrTour1 = 0;

    /* Nombre tour joueur 2 */
    var nbrTour2 = 0;

    /* Pion selectionné */
    var selection = 0;


    /* Etat du jeu */
    var etat = "marche";

    /* On instancie a qui de commencer (ici le joueur 1) */
    $('span#aQuiLeTour').html(1);

    /* On instancie visuelement le nombre de tour */
    $('span#nbrTour1').html(nbrTour1);

    /* On instancie visuelement le nombre de tour du joueur 1*/
    $('span#nbrTour2').html(nbrTour2);

    /* On instancie visuelement le nombre de tour du joueur 2*/
    $('span#nbrTour').html(nbrTour);

    /* On instancie visuelement l'état du jeu */
    $('span#statut').html(etat);

    /* On instancie visuelement le pion sélectionné */
    $('span#selection').html(selection);

    /* On instancie le nombre de pion du joueur 1 */
    $('span#nbrPion1').html(0);

    /* On instancie le nombre de pion du joueur 2 */
    $('span#nbrPion2').html(0);


    /** Gestion des statuts de la partie **/

    /* Fonction qui termine le jeu si plus de 50 coups joués */

    function finPartie() {

        // On récupère le nombre de tour
        var nbrTour = $('span#nbrTour').html();
        console.log(nbrTour);

        // SI 50 tours joués, alors match nul
        if (nbrTour > 50) {
            alert('Match nul : La partie est terminée !');
        }
    }

    /* Fonction qui vérifie si un joueur a gagné (si un joueur à moins de 3 pion après le 9ème tour */

    function joueurGagnant() {

        // On récupère les emplaçements où il peut y 'avoir des pions
        var place = ['l1c1', 'l1c4', 'l1c7', 'l2c2', 'l2c4', 'l2c6', 'l3c3', 'l3c4', 'l3c5', 'l4c1', 'l4c2', 'l4c3', 'l4c5', 'l4c6', 'l4c7', 'l5c3', 'l5c4', 'l5c5', 'l6c2', 'l6c4', 'l6c6', 'l7c1', 'l7c4', 'l7c7'];
        var nbrPion1 = 0;
        var nbrPion2 = 0;
        var nbrTour = $('span#nbrTour').html();

        // On compte le nombre de pion pour chaque joueur
        $.each(place, function (key, place) {
            if ($('#' + place).hasClass('j1')) {
                nbrPion1++;
            }
            else if ($('#' + place).hasClass('j2')) {
                nbrPion2++;
            }
        });

        // On affiche le nombre de pion pour chaque joueur
        $('span#nbrPion1').html(nbrPion1);
        $('span#nbrPion2').html(nbrPion2);

        if (nbrTour > 9 && nbrPion1 < 3) {
            alert('Le joueur 1 a perdu');
        }
        else if (nbrTour > 9 && nbrPion2 < 3) {
            alert('Le joueur 2 a perdu');
        }

    }

    /** Gestion des moulins **/

    /* Fonction qui ajoute un moulin */

    function ajouterMoulin(x) {

        // On ajoute un moulin en x. (x étant une case).
        $('#' + x).addClass('moulin');
        console.log('Moulin ajouté en ' + x);
    }


    /* Fonction qui surpimme un moulin */

    function supprimerMoulin(x) {

        // On supprime un moulin en x. (x étant une case).
        $('#' + x).removeClass('moulin');
        console.log('Moulin supprimé en ' + x);
    }

    /* Fonction qui vérifie pour les point a, b et c faisant partie d'une ligne, si ils sont en position de moulin */

    function verifMoulin(a, b, c) {

        // On prend trois points à analyser
        var x = $('td#' + a);
        var y = $('td#' + b);
        var z = $('td#' + c);

        // On vérifie pour le joueur 1 et 2.
        for (var i = 1; i <= 2; i++) {

            // Si les trois cases on un pion joueur pas encore en moulin.
            if (x.hasClass("j" + i) && y.hasClass("j" + i) && z.hasClass("j" + i)) {
                if (x.hasClass('moulin') && y.hasClass('moulin') && z.hasClass('moulin')) {

                } else {

                    // On ajoute la mention moulin sur ces trois cases
                    ajouterMoulin(a);
                    ajouterMoulin(b);
                    ajouterMoulin(c);
                    var joueur = $('span#aQuiLeTour').html();

                    //On avertie l'utilisateur de la situation de moulin
                    alert('Moulin en ' + a + ' ' + b + ' ' + c + '. Le joueur ' + joueur + ' doit supprimer un Pion de votre adversaire !');
                    if (joueur === 1) {

                        // Pour le joueur humain, on met le jeu en pause pour qu'il puisse supprimer un pion adverse.
                        statut('pause');
                    }
                    else {

                        // Pour l'AI, on utilise la fonction supprimerPionAI.
                        console.log('L\'AI va supprimer un pion');
                        supprimerPionAI(joueur);
                    }
                }
            }
            else {

            }
        }
    }

    /*  Liste des MOULINS */


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
            ['l3c5', 'l5c5', 'l4c5'],
            ['l2c6', 'l4c6', 'l6c6'],
            ['l1c7', 'l4c7', 'l7c7']
        ];

        // Les signes représentes les moulins possibles. Pour toutes les lignes, on vérifie la situation de moulin.
        for (var i = 0; i < 16; i++) {
            var a = ligne[i][0];
            var b = ligne[i][1];
            var c = ligne[i][2];
            verifMoulin(a, b, c);
        }
    }

    /** Vérification des déplaçements autorisés **/

    function deplacement(idCell, destination) {

        // Le tableau suivant représente les deplacements possible. (Exemple ligne 1 : de l1c1 on peut aller à l1c4 ou l4c1).
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
            ['l4c6', 'l4c5', 'l2c6', 'l4c7', 'l6c6'],
            ['l4c7', 'l1c7', 'l4c6', 'l7c7'],
            ['l5c3', 'l4c3', 'l5c4'],
            ['l5c4', 'l5c3', 'l5c5', 'l6c4'],
            ['l5c5', 'l5c4', 'l4c5'],
            ['l6c2', 'l4c2', 'l6c4'],
            ['l6c4', 'l5c4', 'l6c6', 'l7c4', 'l6c2'],
            ['l6c6', 'l6c4', 'l4c6'],
            ['l7c1', 'l7c4', 'l4c1'],
            ['l7c4', 'l7c1', 'l6c4', 'l7c7'],
            ['l7c7', 'l7c4', 'l4c7']
        ];

        // On instancie la boucle à true.
        var boucle = true

        // On commence à vérifier la ligne 0.
        var verifLigne = 0

        // Tant que la boucle est vrai...
        while (boucle) {

            // On limite le nombre de boucle à 23. (En commençant par 0).
            if (verifLigne > 23) {

                // On arrête la boucle.
                boucle = false;

                // On retourne 0 (pour dire pas de déplacement.
                return 0;
            }


            // Si on trouve la case de départ dans le tableau...
            else if (deplacement[verifLigne][0] == idCell) {

                // On stop la boucle.
                boucle = false;
            }
            else {
                // Sinon on passe à la ligne suivante.
                verifLigne++
            }
        }

        // Sortie de cette boucle, on a le numéro de ligne (verifLigne). On regarde combien d'éntrée(s) à cette ligne. (combien de déplacement(s) possibles).
        var nbrDeplacement = deplacement[verifLigne].length;

        // On regarde si le déplacement est possible (sans prendre en compte si la case est occupée)
        for (var i = 1; i < nbrDeplacement; i++) {
            if (deplacement[verifLigne][i] == destination && !$('#' + destination).hasClass('occupe')) {
                console.log('Lé déplacement est validé.');
                return 1;
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

        // On ajoute un pion pour le joueur 'joueur' sur la case idCell.
        $('#' + idCell).addClass('j' + joueur);
        $('#' + idCell).html('<div class="pion' + joueur + '"></div>');

        nbrTourJoueur(joueur);
    }

    /* Supprimer un pion */

    function supprimerPion(idCell) {

        // Si le pion est en moulin, on ne peut pas le supprimer.
        if ($('#' + idCell).hasClass('moulin')) {
            alert('Impossible ! Ce pion est en moulin !');
        }

        // Si on clic sur un de ses pions, on ne peut toujours pas.
        else if ($('td#' + idCell).hasClass('pion1')) {
            alert('Impossible de supprimer vos propres pions !');
        }

        // Si on supprime le pion.
        else if ($('td#' + idCell).hasClass('pion2') || $('div#pion2')) {
            $('td#' + idCell + '> div').remove();
            $('td#' + idCell).removeClass('occupe');
            $('td#' + idCell).removeClass('j2');
            console.log('pion supprimer');

            // On sort le jeu du mode pause.
            statut('marche');
        }
        else {
            console.log('ERREUR');
        }
    }

    /** Gestion des déplacements **/

    function deplacerPion(idCell) {

        // Si on a cliqué sur un pion adverse, on le signal par une erreur.
        if ($('td#' + idCell).hasClass('pion2')) {
            alert('Impossible déplacer un pion adverse vos propres pions !');
            return 0;
        }
        // Si on clic sur un de ses pions, on supprime ce pion, et on l'ajoute en mémoire pour le replacer.
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

    /** Gestion des tours **/

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


    /** Gestion de l'AI **/

    /* Fonction qui vérifie si une suite est possible (c'est à dire que deux pions sont déjà allignés */
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


        // Pour chaque moulin possible, on retourne la case à bloquer.
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

    /* Fonction permettant à l'AI de supprimer un pion. */
    function supprimerPionAI() {

        // On liste les cases où le joueur à un pion.
        console.log('L\'AI va supprimer un pion...');
        var place = ['l1c1', 'l1c4', 'l1c7', 'l2c2', 'l2c4', 'l2c6', 'l3c3', 'l3c4', 'l3c5', 'l4c1', 'l4c2', 'l4c3', 'l4c5', 'l4c6', 'l4c7', 'l5c3', 'l5c4', 'l5c5', 'l6c2', 'l6c4', 'l6c6', 'l7c1', 'l7c4', 'l7c7'];
        var caseOccupe = [];
        $.each(place, function (key, place) {
            if ($('#' + place).hasClass('j1')) {
                caseOccupe.push(place);
            }
        });

        // On supprime un pion aléatoirement.
        var caseSupp = caseOccupe[Math.floor(Math.random() * caseOccupe.length)];
        $('td#' + caseSupp + '> div').remove();
        $('td#' + caseSupp).removeClass('occupe');
        $('td#' + caseSupp).removeClass('j1');
        console.log('L\'AI décide de supprimer le pion en ' + caseSupp);
    }

    /* Fonction qui permet à l'AI de placer aléatoirement un pion. */
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

    /* Fonction qui gère le premier tour de l'AI*/
    function actionAIPremier() {
        console.log('L\'AI va jouer...');

        // On récupère toutes les lignes.
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
            ['l3c3', 'l4c3', 'l3c4'],
            ['l1c4', 'l2c4', 'l3c4'],
            ['l5c4', 'l6c4', 'l7c4'],
            ['l3c5', 'l5c5', 'l6c5'],
            ['l2c6', 'l4c6', 'l6c6'],
            ['l1c7', 'l4c7', 'l7c7']
        ];


        var boucle = true
        var verifLigne = 0
        var action = '';

        // Pour chaque ligne, on vérifie les actions qui peuvent être effectuées.
        while (boucle) {
            if (verifLigne > 15) {
                boucle = false;
            } else {
                var a = ligne[verifLigne][0];
                var b = ligne[verifLigne][1];
                var c = ligne[verifLigne][2];

                // On vérifie si l'AI peut faire un moulin.
                var blocMoulin = verifSuite(2, a, b, c);
                if (blocMoulin == a || blocMoulin == b || blocMoulin == c) {
                    console.log('L\'AI a vue le moulin possible et décide  d\'ajouter un pion en ' + blocMoulin);
                    action = blocMoulin
                    boucle = false;
                }
                else {
                    // On vérifie si on peut bloquer un moulin humain.
                    var blocMoulin = verifSuite(1, a, b, c);
                    if (blocMoulin == a || blocMoulin == b || blocMoulin == c) {
                        console.log('L\'AI a vue que l\' humain peut faire un moulin et décide d\'ajouter un pion en ' + blocMoulin);
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

        // Si il y a une action possible, l'AI ajoute un pion dans la case voulu.
        console.log(action);
        if (action !== '') {
            console.log('L\'AI va ajouter un pion en ' + action);
            addPion(2, action);

            // On vérifie si on change quelque chose dans les moulins.
            moulinGlobal();
        }

        // Si pas d'actions, l'AI pose un pion de manière aléatoire.
        if (action == '') {
            console.log('L\'AI n\'a pas de moulin à bloquer.');
            console.log('L\'AI n\'a pas de moulin à faire');

            // On vérifie si la place est libre.
            var place = placeLibre();
            console.log('L\'AI va ajouter de manière aléatoire un pion en ' + place);
            addPion(2, place);
            $('#' + place).addClass('occupe');
        }

        $('span#aQuiLeTour').html(1);
        nbrTourTotal();
    }

    /* Fonction qui gère le deuxième tour de l'AI */
    function actionAIDeuxieme() {
        console.log('L\'AI va devoir déplacer un pion.');

        /*  Array stockant les pions de l'AI */
        var listePions = [];

        /* L'AI check la position de ses pions sur la PokéMap. */
        $('.j2').each(function (index) {
            listePions.push($(this).attr("id"));
        });

        // On récupère toutes les lignes.
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
            ['l3c3', 'l4c3', 'l3c4'],
            ['l1c4', 'l2c4', 'l3c4'],
            ['l5c4', 'l6c4', 'l7c4'],
            ['l3c5', 'l5c5', 'l6c5'],
            ['l2c6', 'l4c6', 'l6c6'],
            ['l1c7', 'l4c7', 'l7c7']
        ];

        // On récupère tous les déplacements
        var listeDeplacement = [
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
            ['l4c6', 'l4c5', 'l2c6', 'l4c7', 'l6c6'],
            ['l4c7', 'l1c7', 'l4c6', 'l7c7'],
            ['l5c3', 'l4c3', 'l5c4'],
            ['l5c4', 'l5c3', 'l5c5', 'l6c4'],
            ['l5c5', 'l5c4', 'l4c5'],
            ['l6c2', 'l4c2', 'l6c4'],
            ['l6c4', 'l5c4', 'l6c6', 'l7c4', 'l6c2'],
            ['l6c6', 'l6c4', 'l4c6'],
            ['l7c1', 'l7c4', 'l4c1'],
            ['l7c4', 'l7c1', 'l6c4', 'l7c7'],
            ['l7c7', 'l7c4', 'l4c7']
        ];
        var boucle = true
        var verifLigne = 0
        var action = '';

        // Pour chaque ligne, on vérifie les actions qui peuvent être effectuées.
        while (boucle) {
            if (verifLigne > 15) {
                boucle = false;
            } else {
                var a = ligne[verifLigne][0];
                var b = ligne[verifLigne][1];
                var c = ligne[verifLigne][2];

                // On vérifie si on peut bloquer un moulin humain.
                var blocMoulin = verifSuite(1, a, b, c);
                if (blocMoulin == a || blocMoulin == b || blocMoulin == c) {
                    console.log('L\'AI a vue que l\' humain peut faire un moulin en ' + blocMoulin);
                    action = blocMoulin;
                    var suitePossible = action;
                    boucle = false;
                }
                else {

                    // On vérifie si l'AI peut faire un moulin.
                    var blocMoulin = verifSuite(2, a, b, c);
                    if (blocMoulin == a || blocMoulin == b || blocMoulin == c) {
                        console.log('L\'AI a vue le moulin possible en ' + blocMoulin);
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
        // Pour tous les pions, on vérifie les mouvements possibles
        $.each(listePions, function (key, place) {
            var possible = deplacement(place, action);
            if (possible === 1) {
                $('td#' + place + '> div').remove();
                $('td#' + place).removeClass('occupe');
                $('td#' + place).removeClass('j2');
                addPion(2, action);
                return;
            }
            else {
                // Déplacement aléatoire
                // On va stocker tous les déplacements possibles.
                var deplacementAleatoire = [];
                var boucle = true

                console.log('L\'AI va placer aléatoirement');

                $.each(listePions, function (key, place) {
                    if ($('#' + place).hasClass('j2')) {

                        console.log('L\'AI regarde les déplacements du pion ' + place);
                        // On instancie la boucle à true.


                        // On commence à vérifier la ligne 0.
                        var verifLigne = 0

                        // Tant que la boucle est vrai...
                        while (boucle) {

                            // On limite le nombre de boucle à 23. (En commençant par 0).
                            if (verifLigne > 23) {

                                // On arrête la boucle.
                                boucle = false;

                                // On retourne 0 (pour dire pas de déplacement).
                                return 0;
                            }
                            // Si on trouve la case de départ dans le tableau...
                            else if (listeDeplacement[verifLigne][0] == place) {

                                console.log('L\'AI regardes s\'occupe donc du pion ' + listeDeplacement[verifLigne][0]);

                                var nbrDeplacement = listeDeplacement[verifLigne].length;
                                // On vérifie les déplacements possible
                                for (var i = 1; i < nbrDeplacement; i++) {
                                    if (!$('#' + listeDeplacement[verifLigne][i]).hasClass('occupe')) {

                                        // On ajoute dans le tableau les déplacements possibles
                                        deplacementAleatoire.push([place, listeDeplacement[verifLigne][i]]);
                                        verifLigne++
                                    }
                                }
                            }
                            else {
                                // Sinon on passe à la ligne suivante.

                                verifLigne++
                            }
                        }

                    }
                });
                var datDeplacement = [];
                datDeplacement = deplacementAleatoire[Math.floor(Math.random() * deplacementAleatoire.length)];
                console.log('On va déplacer de ' + datDeplacement[0] + ' à ' + datDeplacement[1]);

            }
        });


    }


    /** Gestion du clic **/

    $('.cliquable').click(function () {

        // On récupère le statut courant.
        var statut = $('span#statut').html();
        console.log('Le statut courant est = ' + statut);

        // On récupère l'id de la case cliqué.
        var clickCell = $(this).attr("id");
        console.log('On a cliqué sur ' + clickCell);

        // On récupère le nombre de tour joué
        var nbrTour = $('span#nbrTour').html();

        // Si on est avant le tour 9, on est sur la première partie du jeu.
        if (nbrTour < 9) {

            // SI le statut est en marche.
            if (statut == "marche") {

                // Si on clique sur une case occupé, on retourne une erreur.
                if ($('#' + clickCell).hasClass('occupe')) {
                    alert("Cette case est occupe !");
                }
                else {

                    // Si la case est jouable, on ajoute la mention occupé et on ajoute un pion.
                    $('#' + clickCell).addClass('occupe');
                    addPion(1, clickCell);

                    // On vérifie la situation global des moulins.
                    moulinGlobal();

                    // On change le nombre de tour.
                    nbrTourTotal();

                    if ($('span#statut').html() == "marche") {
                        // On permet à l'AI de jouer son tour.
                        actionAIPremier();
                    }

                }
            }
            else {

                // Si le jeu est sur pause, on permet au joueur de supprimer un pion adverse.
                var joueur = $('span#aQuiLeTour').html();
                supprimerPion(clickCell);

            }
            $('span#aQuiLeTour').html(2);
        }
        else {

            // deuxième partie du jeu.
            console.log('Deuxième partie du jeu');

            // Si le jeu est en mode "marche"
            if (statut == "marche") {


                // Si aucun pion n'est sélectioné.
                if ($('span#selection').html() == 0) {
                    joueur = 1;

                    // On vérifie que l'humain a bien choisit un de ses pions.
                    if ($('#' + clickCell).hasClass('occupe') && $('#' + clickCell).hasClass('j1')) {
                        console.log('Le joueur ' + joueur + ' a selectionne le pion ' + clickCell);

                        // On instancie le mode sélection
                        $('span#selection').html('1');

                        // On déplace le pion.
                        deplacerPion(clickCell);

                        // On garde en mémoire le pion en attende.
                        var enAttente = clickCell;
                        $('span#attente').html(enAttente);
                    }
                    else {
                        alert('Cliquez sur un de vos pions');
                    }
                }

                // Mode sélection
                else if ($('span#selection').html() == 1) {

                    // Si on déplace sur uen case occupé.
                    if ($('#' + clickCell).hasClass('occupe')) {
                        alert("Cette case est occupe !");
                    }

                    else {
                        $('span#selection').html('1');
                        var enAttente = $('span#attente').html();
                        console.log('Pion en attente de placement : ' + enAttente);
                        console.log('Case destinataire : ' + clickCell);

                        // On vérifie si le déplacement est possible
                        var possible = deplacement(enAttente, clickCell);

                        // Si c'est possible
                        if (possible === 1) {
                            console.log('Déplacement validé');

                            // On ajoute le pion
                            $('#' + clickCell).addClass('occupe');
                            addPion(1, clickCell);
                            var joueur = $('span#aQuiLeTour').html();
                            $('span#selection').html('0');

                            // On vérifie les moulins
                            moulinGlobal();

                            // On vérifie le nombre de tour.
                            nbrTourTotal();

                            if ($('span#statut').html() == "marche") {
                                // On demande à l'AI de jouer
                                actionAIDeuxieme();
                            }


                            // On repasse le jeu en mode "marche"
                            $('span#statut').html('marche');
                        }
                        else {
                            alert("ERREUR !");
                        }
                    }
                }
            } else {
                // Si le jeu est sur pause, on supprime un pion.
                supprimerPion(clickCell);
            }
        }
        joueurGagnant();
        finPartie();
    });
});