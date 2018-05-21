# Votations fédérales suisses

## Historique (1894-2017) des résultats des votations fédérales suisses par canton

**Adresse.** Le graphique animé de l'historique du résultat des votations fédérales réalisées entre 1894 et 2017 se trouve à l'adresse suivante : [HISTO CH VOTATIONS](http://www.bofr.ch)

**Description.** L'animation proposée permet de visualiser à l'aide de bulles le résultat par canton de chacune des votations fédérales exécutées entre 1894 et 2017. Le graphique à bulles proposé permet de représenter simultanément et dynamiquement cinq variables relatives au vote fédéral dans les cantons soit : le taux d'acceptation en pourcent (ordonnée), le taux de participation en pourcents (abscisse), le nombre de bulletins valables (rayon de la bulle), la région lingustique (couleur) et le libellé des votations (qui peut coulisser sous le graphique).

**Contexte.** Cette application a été réalisé dans le cadre du cours de Master Visualisation de données de l'UNIL (Université de Lausanne) sous la direction d'Isaac Pante.

**Technique.** L'application, développée en HTML-CSS-JavaScript, fait appel à la bibliothèque graphique D3.js.


## Mode d'emploi

Au lancement du site [HISTO CH VOTATIONS](http://www.bofr.ch) le programme propose de choisir la période désirée (par défaut 1894-2017) et de lancer l'animation en cliquant sur le bouton qui suit. Il est possible d'arrêter l'animation en déplaçant la souris sur les libellés de votations (sous l'axe des x). En passant la souris lentement sur les libellés de votations, de droite à gauche ou inversement, les résultats des votations vont défiler sur le graphique. Conseil : sélectionnez une plage de 20 ans au maximum pour être plus précis dans le défilement des libellés des votations. En passant lentement la souris sur les bulles, l'abréviation du canton concerné apparaît.

![image_accueil](http://www.bofr.ch/modeemploi.jpg)

Figure 1. Le site avec ses principales caractéristiques


## Références et sources d'inspiration

**Données.** Office fédéral de la statistique (OFS)

**Représentation graphique.** Fondation Gapminder : [Gapminder](https://www.gapminder.org/tools/#_state_time_value=1800;;&data_/_lastModified:1526132872113&lastModified:1526132872113;&chart-type=bubbles)

**Réalisation en D3.** Mike Bostok : [Wealth and Health Nations](https://bost.ocks.org/mike/nations/)
