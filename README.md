# Votations fédérales suisses

## Historique (1894-2017) des résultats des votations fédérales suisses par canton

**Adresse.** Le graphique animé de l'historique du résultat des votations fédérales réalisées entre 1894 et 2017 se trouve à l'adresse suivante : [HISTO CH VOTATIONS](http://www.bofr.ch)

**Description.** L'animation proposée permet de visualiser à l'aide de bulles le résultat par canton de chacune des votations fédérales exécutées entre 1894 et 2017. Le graphique à bulles proposé permet de représenter simultanément et dynamiquement cinq variables relatives au vote fédéral dans les cantons soit : le taux d'acceptation en pourcent (ordonnée), le taux de participation en pourcents (abscisse), le nombre de bulletins valables (rayon de la bulle), la région lingustique (couleur) et le libellé des votations (qui peut coulisser sous le graphique).

**Contexte.** Cette application a été réalisé dans le cadre du cours de Master Visualisation de données de l'UNIL (Université de Lausanne) sous la direction d'Isaac Pante.

**Technique.** L'application, développée en HTML-CSS-JavaScript, fait appel à la bibliothèque graphique D3.js (version 5).


## Mode d'emploi

Au lancement du site [HISTO CH VOTATIONS](http://www.bofr.ch) le programme propose de choisir la période désirée (par défaut 1894-2017) et de lancer l'animation en cliquant sur le bouton qui suit. Il est possible d'arrêter l'animation en déplaçant la souris sur les libellés de votations (sous l'axe des x). En passant la souris lentement sur les libellés de votations, de droite à gauche ou inversement, les résultats des votations vont défiler sur le graphique. Conseil : sélectionnez une plage de 20 ans au maximum pour être plus précis dans le défilement des libellés des votations. En passant lentement la souris sur les bulles, l'abréviation du canton concerné apparaît.

![image_accueil](http://www.bofr.ch/modeemploi.jpg)

Figure 1. Le site avec ses principales caractéristiques


## Aspects informatiques

Le programme, par choix, contient la partie HTML, CSS et JS. La partie statique du programme, soit le titre, le choix des années, le bouton de lancement et le mode d'emploi a été developpée en HTML. Pour le graphique dynamique, nous avons opté pour JavaScript renforcé par la bibliothèque graphique D3.js v5.

Le script JavaScript comporte deux fonctions principales : 
1. la fonction (`function choice()`) qui gère les choix d'années effectués par l'utilisateur et efface le dessin précédent.
2. la fonction (`function draw(v_start, v_stop)`) qui gère le graphique et son animation

Le coeur du développement se trouve dans la fonction draw qui présente les étapes suivantes :
1. fixer les dimensions du graphique en fonction de la fenêtre et les échelles en fonction des données
2. poser le container svg avec les axes, leur légende, la ligne des 50 % et les légendes des couleurs des bulles
3. charger les données depuis un fichier json (essai7.json) et les arranger par votations
```javascript
  //arrangement des données par votations [{key : no votation  et values : [{les données},..]}, ..]
  var parvotation = d3.nest()
                  .key(function (d) {
                      return d["Numéro"];
                  })
                  .entries(donnees);
```

4. Mettre les bulles dans le graphique avec le canton comme titre
5. Mettre un overlay pour le libellé de la votation
6. Transition, interpolation sur le numéro des votations et liens entre libellé et graphique
```javascript
// Démarre une transition basée sur une interpolation du numéro des votations.
            svg.transition()
                .duration(30000)
                .ease(d3.easeLinear)
                .tween("nr_votation", tweenVotation)
                .on("end", enableInteraction);

            // Place les points selon les données.
            function position(dot) {
                dot.attr("cx", function (d) {
                    return xScale(x(d));
                })
                    .attr("cy", function (d) {
                        return yScale(y(d));
                    })
                    .attr("r", function (d) {
                        return radiusScale(radius(d));
                    });
            }

            // Pour que les petits points soient devant.
            function order(a, b) {
                return radius(b) - radius(a);
            }

            // Possibilité de passer avec la souris pour changer la votation.
            function enableInteraction() {
                var votScale = d3.scaleLinear()
                    .domain([v_start, v_stop])
                    .range([box.x + 10, box.x + box.width - 10])
                    .clamp(true);

                //Annule la transition si elle existe.
                svg.transition().duration(0);

                overlay
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout)
                    .on("mousemove", mousemove)
                    .on("touchmove", mousemove);

                function mouseover() {
                    label.classed("active", true);
                }

                function mouseout() {
                    label.classed("active", false);
                }

                function mousemove() {
                    displayVotation(votScale.invert(d3.mouse(this)[0]));
                }
            }

            // Animation de l'interpolation des votations.
            // Les points et légendes sont rechargées pour les données interpolées.
            function tweenVotation() {
                var nr_votation = d3.interpolateNumber(v_start, v_stop);
                return function (t) {
                    displayVotation(nr_votation(t));
                };
            }

            // Modifie le display avec la votation selectionnée.
            function displayVotation(nr_votation) {
                var nr = Math.round(nr_votation);
                dot.data(votationData(nr), key).call(position).sort(order);
                label.text(votationData(nr)[0]["Libellé"]);
            }

            // Extraction des données de chaque votation.
            function votationData(nr) {
                return parvotation[nr].values;
            }
```


## Références et sources d'inspiration

**Données.** Office fédéral de la statistique (OFS)

**Représentation graphique.** Fondation Gapminder : [Gapminder](https://www.gapminder.org/tools/#_state_time_value=1800;;&data_/_lastModified:1526132872113&lastModified:1526132872113;&chart-type=bubbles)

**Réalisation en D3.** Mike Bostok : [Wealth and Health Nations](https://bost.ocks.org/mike/nations/)
