// application js pour le programme votations fédérales

// Choix de l'entête
var myDiv = document.getElementById("selection");

// Les listes pour les choix

var array = [];
d3.json("essai7.json").then(function (donn) {

    //arrangement des données par votations [{key : no votation  et values : [{les données},..]}, ..]
    var sortVotations = d3.nest()
        .key(function (d) {
            return d["Numéro"];
        })
        .entries(donn);

    for (i = 0; i < 591; i++) {
        array.push(sortVotations[i].values[0]["Libellé"]);
    }

    //Crée et insère la liste de sélection
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "SelectVot");
    myDiv.appendChild(selectList);

    //Crée et insère les options de sélection
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", array[i]);
        option.text = array[i];
        selectList.appendChild(option);
    }
})

// Offre le choix de la période sous revue pour les votations
function choice() {
    var range_start = [22,66,98,153,200,252,319,403,433,495,547,575,590],
        range_end = [0,22,66,98,153,200,252,319,403,433,495,547];

    var e1 = document.getElementById("y_start");
    var vot_start = range_start[+e1.options[e1.selectedIndex].value];
    var e2 = document.getElementById("y_end");
    var vot_end = range_end[+e2.options[e2.selectedIndex].value];

    if (document.querySelector('.graphics') !== null) {
        d3.selectAll("svg").remove();
    }
    d3.select("svg").remove();
    draw(vot_start,vot_end)
}

// Offre le choix d'une votation particulière
function choiceVot() {

    var e3 = document.getElementById("SelectVot");
    var vot_start = +e3.selectedIndex;

    if (document.querySelector('.graphics') !== null) {
        d3.selectAll("svg").remove();
    }
    d3.select("svg").remove();
    draw(vot_start,vot_start)
}

// Construit et remplit le graphique des votations
function draw(v_start,v_stop) {

    // Fonctions pour afficher les 5 variables (ou dimensions) des votations à visualiser.
    function x(d) {
        return d["Participation en %"];
    }

    function y(d) {
        return d["Oui en %"];
    }

    function radius(d) {
        return d["Bulletins valables"];
    }

    function color(d) {
        return d["Région"];
    }

    function key(d) {
        return d["Canton"];
    }

    // Dimension du graphique
    var dim = document.getElementById("chart"),
        w = Math.max(window.innerWidth-100,900),
        h = Math.max(window.innerHeight-200,550),
        h2 = (h+6).toString() +"px",
        margin = {top: 19.5, right: 19.5, bottom: 59.5, left: 59.5},
        width = w - margin.right,
        height = h - margin.top - margin.bottom;

    dim.style.marginLeft = "-10px";
    dim.style.height = h2;

    // Fixe les échelles en fonction des données disponibles.
    var xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    var radiusScale = d3.scaleSqrt()
        .domain([0, 500000])
        .range([0, 50]);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Fixe les échelles x et y
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(10, d3.format(",d"));

    var yAxis = d3.axisLeft()
        .scale(yScale);

    // Crée les containers SVG et fixe l'origine.
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "graphics")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Ajoute l'axe x.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Ajoute l'axe y.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Ajoute la légende de l'axe x.
    svg.append("text")
        .attr("class", "x_label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Taux de participation en pourcent");

    // Ajoute la légende de l'axe y.
    svg.append("text")
        .attr("class", "y_label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Taux d'acceptation en pourcent");

    // Ajoute la légende de la votation, celle-ci varie par transition.
    var label = svg.append("text")
        .attr("class", "nr_votation label")
        .attr("text-anchor", "start")
        .attr("y", height + 54)
        .attr("x", 0)
        .text("SELECTION SOURIS : 24.09.2017 Réforme de la prévoyance vieillesse");

    // Ajoute une légende fixe pour la couleur des bulles
    svg.append("text")
        .attr("class", "legende_result")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("x", width)
        .attr("fill", "#000000")
        .text("Code couleur :");

    // Ajoute une légende fixe pour la couleur des bulles suisses
    svg.append("text")
        .attr("class", "result_CH")
        .attr("text-anchor", "end")
        .attr("y", 26)
        .attr("x", width)
        .attr("fill", "#cc0000")
        .text("Suisse entière");

    // Ajoute une légende fixe pour la couleur des bulles des cantons alémaniques
    svg.append("text")
        .attr("class", "result_SUI")
        .attr("text-anchor", "end")
        .attr("y", 46)
        .attr("x", width)
        .style("fill", "#4682B4")
        .text("Cantons alémaniques");

    // Ajoute une légende fixe pour la couleur des bulles des cantons romands
    svg.append("text")
        .attr("class", "result_SUI")
        .attr("text-anchor", "end")
        .attr("y", 66)
        .attr("x", width)
        .style("fill", "#FF8C00")
        .text("Cantons romands");

    // Ajoute une légende fixe pour la couleur des bulles du Tessin
    svg.append("text")
        .attr("class", "result_SUI")
        .attr("text-anchor", "end")
        .attr("y", 86)
        .attr("x", width)
        .style("fill", "#32CD32")
        .text("Canton italophone");

    // Ajoute une ligne de séparation horizontale à 50 %
    svg.append("line")
        .attr("class", "limit_50")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", height/2)
        .attr("y2", height/2)
        .style("stroke-dasharray",("3,3"))
        .style("stroke",'black');

    // Charge le fichier des données
    d3.json("essai7.json").then(function (donnees) {

        //arrangement des données par votations [{key : no votation  et values : [{les données},..]}, ..]
        var parvotation = d3.nest()
            .key(function (d) {
                return d["Numéro"];
            })
            .entries(donnees);

        //parvotation contient 591 objets (votations) de 0 à 590
        //parvotation[590].values, longueur = le nombre de cantons, pour chaque canton les données
        //console.log(parvotation[590].values[0]["Oui en %"]); pour la dernière votation 2017, le premier canton, le taux de oui

        // Ajoute un point par votation et initialise les données à 2017 (votation 0).
        var dot = svg.append("g")
            .attr("class", "dots")
            .selectAll(".dot")
            .data(votationData(v_stop))
            .enter().append("circle")
            .attr("class", "dot")
            .style("fill", function (d) {
                return colorScale(color(d));
            })
            .call(position)
            .sort(order);

        // Ajoute un titre sur les points
        dot.append("title")
            .text(function (d) {
                return d["Canton"];
            });

        // Ajoute un overlay pour la légende de la votation
        var box = label.node().getBBox();

        var overlay = svg.append("rect")
            .attr("class", "overlay")
            .attr("x", box.x)
            .attr("y", box.y)
            .attr("width", box.width)
            .attr("height", box.height)
            .on("mouseover", enableInteraction);

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
        // Les points et légendes sont rechargés pour les données interpolées.
        function tweenVotation() {
            var nr_votation = d3.interpolateNumber(v_start, v_stop);
            return function (t) {
                displayVotation(nr_votation(t));
            };
        }

        // Modifie le display avec la votation sélectionnée.
        function displayVotation(nr_votation) {
            var nr = Math.round(nr_votation);
            dot.data(votationData(nr), key).call(position).sort(order);
            label.text(votationData(nr)[0]["Libellé"]);
        }

        // Extraction des données de chaque votation.
        function votationData(nr) {
            return parvotation[nr].values;
        }

    });
}