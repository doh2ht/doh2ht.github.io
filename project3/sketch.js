const {
    Engine,
    World,
    Bodies,
    Composite,
    Constraint,
    Mouse,
    MouseConstraint
} = Matter;

let engine;
let world;
let particles = [];
let mConstraint;
let x = 55;
let fixed = true;
let textData;
let customFont;
let collisionSound;

//image load
let img;
let imgPixels;
let i = 0;
let imageFiles = ['sea1.png', 'sea2.png', 'sea3.png', 'sea4.png', 'sea5.png', 'sea6.png','sea7.png','sea8.png','sea9.png','sea10.png','sea11.png','sea12.png','sea13.png'];

function preload() {
    img = loadImage('sea1.png');
    img[1] = loadImage('sea2.png');
    img[2] = loadImage('sea3.png');
    img[3] = loadImage('sea4.png');
    img[4] = loadImage('sea5.png');
    img[5] = loadImage('sea6.png');
    img[6] = loadImage('sea7.png');
    img[7] = loadImage('sea8.png');
    img[8] = loadImage('sea9.png');
    img[9] = loadImage('sea10.png');
    img[10] = loadImage('sea11.png');
    img[11] = loadImage('sea12.png');
    img[12] = loadImage('sea13.png');
    loadStrings('journal.txt', processData);
    customFont = loadFont('BerettaSansTrial-Bold.otf');
    collisionSound = loadSound('glass.mp3');
}

function processData(data) {
    textData = data.join('\n');
}

function changeImage() {
    i = (i + 1) % imageFiles.length;
    img[i].loadPixels();
    imgPixels = img[i].pixels;

    if (i === imageFiles.length - 0) {
        i = 0; 
        img[i] = loadImage('img1.png'); 
    }
}
let scrollDiv;

function setup() {
    let button = createButton('Change Image');
    button.position(1518, 20);
    button.style('background-color', 'transparent'); 
    button.style('color', 'white'); 
    button.style('font-size', '16px');
    button.style('font-family', 'BerettaSansTrial-Bold');
    button.mousePressed(changeImage);

    let canvas = createCanvas(windowWidth, windowHeight,);
    canvas.id('p5-container');
    // create an engine
    engine = Engine.create();
    world = engine.world;
    let prev = null;

    for (let i = 0; i < 3306; i += 1) {
        let p = new Particle(x, 70, 6.8, fixed);
        fixed = false;
        particles.push(p);

        x = x + 0.495;

        if (prev) {
            let options = {
                bodyA: p.body,
                bodyB: prev.body,
                length: 13,
                stiffness: 0.8
            };

            let constraint1 = Constraint.create(options);
            World.add(world, constraint1);
        }
        prev = p;

        if ((i - 57) % 58 == 0) {
            fixed = true;
            prev = null;
        }
    }

    const textLayer = document.getElementById('textLayer');

    textLayer.addEventListener('mouseenter', () => {
        textLayer.classList.add('zoomed');
    });

    textLayer.addEventListener('mouseleave', () => {
        textLayer.classList.remove('zoomed');
    });

    let canvasMouse = Mouse.create(canvas.elt);
    let options = {
        mouse: canvasMouse,
    };

    canvasMouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

    img.loadPixels();
    imgPixels = img.pixels;

    textFont(customFont);
}

let textZoom = 1;

function draw() {
    clear();
    background(0, 0);

    Engine.update(engine);

    if (textData) {
        fill(255);

        
        let textSizeValue = 30 * textZoom;
        textSize(textSizeValue);
   
        let leftMargin = 160;
        let topMargin = 240;
        let centerX = width / 2;
        let centerY = height / 2;

        let adjustedLeftMargin = centerX - (centerX - leftMargin) * textZoom;
        let adjustedTopMargin = centerY - (centerY - topMargin) * textZoom;

        text(textData, adjustedLeftMargin, adjustedTopMargin, width - 2 * adjustedLeftMargin, height - 2 * adjustedTopMargin);
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].show(imgPixels);
    }
}

function mouseWheel(event) { 
    let zoomChange = event.delta / 300;
    textZoom += zoomChange;
    textZoom = constrain(textZoom, 1, 80);
    redraw();
}
