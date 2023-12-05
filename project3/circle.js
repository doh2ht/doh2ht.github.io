class Particle{
    constructor(x, y, r, fixed) {
        this.x = x;
        this.y = y;
        this.r = r;
        let options = {
            friction: 0,
            restitution: 0.3,
            isStatic: fixed
        }
        this.body = Bodies.circle(this.x, this.y, this.r,  options);
        Composite.add(world, this.body);
        this.clicked = false;
    }


    show(imgPixels) {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);

        let px = int(pos.x);
        let py = int(pos.y);
        let index = (py * img.width + px) * 4;


        fill(imgPixels[index], imgPixels[index + 1], imgPixels[index + 2], imgPixels[index + 3]);
        noStroke();

        ellipse(0, 0, this.r * 2);

        let d = dist(this.body.position.x, this.body.position.y, mouseX, mouseY);
        if (d < this.r && mouseIsPressed) {
            collisionSound.play();
        }
        
        pop();
        
    }
}