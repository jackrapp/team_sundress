// Blood splatter on mouse click
// Mouse event listener
document.getElementById("pageBody").addEventListener('click', bloodSplatter);

// NOTE: x, y, cx, and cy all position the elements inside of their parent SVG. 
// The y is how far from the top, the x is how far from the left.

// Function bloodSplatter called on click
function bloodSplatter(e) {
    // empty array to hold splatter circles
    var arr = [];

    // Center circles on mouse click
    var x = e.x;
    var y = e.y;
    console.log(`(${x}, ${y})`);

    // Append SVG element class splatter_box
    var svgArea = d3.select("#pageBody").select("svg");

    // Remove SVG if already exists
    if (!svgArea.empty()) {
        svgArea.remove();
        };

    // Define SVG element
    var svg = d3.select('#pageBody')
        .append('svg')
        .attr('class','splatterBox');

    // Set SVG position in CSS Using JQuery
    $('svg').css( {
        position:"absolute", 
        top:y-100, 
        left:x-100});

    // Create array of circles centers around click
    for (i=0; i<getRandomInt(25,31); i++) {
        var cx = getRandomCenter(x);
        var cy = getRandomCenter(y);
        // var r = getRadius(cx,cy,x,y);
        var r = getRadius(cx,cy);
        arr.push({
            cx: cx,
            cy: cy,
            r: r
        });
        appendCircles(arr, svg);
        console.log(`(${cx},${cy}),${r}`)
    };
}

// Function for number of circles
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Function for random x-y
function getRandomCenter(click) {
    // set min and max to be 100px from click
    // if range is 200, no need to center
    // if range is less than 200, need to add value to center at 100
        // eg Math.random() * 100 + 50 canters the values around 100
    return Math.floor(Math.random() * 200);
}

// Function to scale radius distance from click
// function getRadius(cx,cy,x,y) {
//     var a = cx-x;
//     var b = cy-y;

function getRadius(a,b) {
    // calculate the distance from the circle to the click
    var hypotenuse = Math.sqrt(((a-100) * (a-100)) + ((b-100) * (b-100)));
    // scale the size of the click to be larger closer and smaller farther away
    var scale = d3.scaleLinear().domain([0,100]).range([12,0]);
    return scale(hypotenuse);
}

// Function to append circles
function appendCircles(arr, svg) {
    svg.selectAll('circle').data(arr).enter()
        .append('circle')
        .attr('cx', d => d.cx)
        .attr('cy', d => d.cy)
        .attr('r', d => d.r)
        .attr('class', 'splatter')
        .attr('fill', '#990000')
        .attr('opacity', '.8')
}