let keys = {};
document.addEventListener("keydown", e => {
    keys[e.key] = true;
});
document.addEventListener("keyup", e => {   
    keys[e.key] = false;
});

canvas.addEventListener("click", e => {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    console.log("X:", mouseX, "Y:", mouseY);
});

class entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.grav = 0.5;
        this.vely = 3;
        this.velx = 5;
        this.inAir = true;
        this.topLeft = [];
        this.topRight = [];
        this.botLeft = [];  
        this.botRight = [];
        this.collided = false;
        this.moving = false;
        this.action = false;
        this.thamp = false;
        this.dead = false;
        this.won = false;
        this.restart = false;
        this.level = 0;
        this.inTouch = false;
    }

    draw(){
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#52b788";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    drawCat(){
        //constant
        var xc = this.x + 20;
        var yc = this.y - 25
        var rad = 30;
        var xb = this.x;
        var yb = this.y;

        function triangle(xt1, yt1, xt2, yt2, xt3, yt3){
            ctx.beginPath();
            ctx.moveTo(xc - xt1,yc - yt1)
            ctx.lineTo(xc - xt2, yc - yt2)
            ctx.lineTo(xc - xt3, yc - yt3);
            ctx.closePath();
            ctx.fillStyle = "#000000ff";
            ctx.fill();
        }
        
        function lines(initX,initY,finX,finY){
            ctx.beginPath();
            ctx.moveTo(xc - initX, yc - initY);
            ctx.lineTo(xc - finX, yc - finY);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        function circle(x,y){
            ctx.beginPath();
            ctx.arc(xc - x, yc - y , 6, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
        }
        
        function curve(initX, initY, midX,midY, finX, finY){
            ctx.beginPath();
            ctx.moveTo(xb - initX ,yb - initY);
            ctx.quadraticCurveTo(xb - midX, yb - midY, xb - finX, yb - finY)
            ctx.strokeStyle = "black";
            ctx.lineWidth = 8;
            ctx.stroke();
        }

        // Clear and draw body
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Head
        ctx.beginPath();
        ctx.arc(xc, yc, rad, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();

        // Band
        ctx.clearRect(this.x, this.y - 5, this.width - 2, this.height / 10)
        ctx.fillRect(this.x, this.y - 5, this.width - 2, this.height / 10)
        ctx.fillStyle = "red";
        ctx.fillRect(this.x + 7, this.y - 5, this.width - 15, this.height / 10)

        // Ears
        triangle(20, 50, 20, 20, 5, 30)
        triangle(-20, 50, -20, 20, -5, 30)

        // Tail
        curve(-5, -40, 10, 10, 30, -20)
        
        // Nose
        circle(-2,0)

        // Mustache
        lines(8, -2, 40, 3);
        lines(7, 0, 35, 8);
        lines(8, -4, 35, -6);
        lines(-11, 0, -37, 5);
        lines(-12,-2.5, -40, 0);
        lines(-11, -5, -37, -9);

        // Eyes
        lines(17,7,13,19)
        lines(8,7,13,19)
        lines(-8,7,-13,19)
        lines(-17,7,-13,19)
    }

    move() {
        if (keys["ArrowLeft"]){ 
            this.x -= this.velx; 
            this.moving = true;
        }
        else if (keys["ArrowRight"]){ 
            this.x += this.velx; 
            this.moving = true;
        }
        else{
            this.moving = false;
        }
    }

    coord(){
        this.topLeft = [this.x, this.y];
        this.topRight = [this.x + this.width, this.y];
        this.botLeft = [this.x, this.y + this.height];
        this.botRight = [this.x + this.width, this.y + this.height];
    }

    canvas(){
        if(this.x < 0) this.x = 0;
        if(this.x + this.width > canvas.width) this.x = canvas.width - this.width;    
    }

    // FIXED: Improved collision detection
    isColliding(platform) {
        let wasCollided = false;
        
        // Top collision (landing on platform) - MOST IMPORTANT
        if (
            this.botRight[0] > platform.topLeft[0] && 
            this.botLeft[0] < platform.topRight[0] &&
            this.botLeft[1] >= platform.topLeft[1] - 5 && // Small tolerance
            this.botLeft[1] <= platform.topLeft[1] + 15 &&
            this.vely <= 0 // Only when falling or not moving vertically
        ) {
            this.inAir = false;
            this.y = platform.topLeft[1] - this.height;
            this.collided = true;
            this.vely = 0;
            wasCollided = true;
            console.log("Landed on platform");
        }
        
        // Bottom collision (hitting head) - only when moving up
        else if (
            this.topRight[0] > platform.topLeft[0] &&
            this.topLeft[0] < platform.topRight[0] &&
            this.topLeft[1] <= platform.botLeft[1] + 5 &&
            this.topLeft[1] >= platform.botLeft[1] - 10 &&
            this.vely > 0 // Only when moving up
        ) {
            this.vely = 0; // Stop upward movement
            this.y = platform.botLeft[1]; // Position just below platform
            wasCollided = true;
            console.log("Hit head on platform");
        }
        
        // Side collisions (only when not landing on top)
        else if (
            this.botLeft[1] > platform.topLeft[1] + 5 && // Not landing on top
            this.topLeft[1] < platform.botLeft[1] - 5    // Not hitting bottom
        ) {
            // Right side collision (player moving left into platform)
            if (
                this.topRight[0] >= platform.topLeft[0] - 5 &&
                this.topRight[0] <= platform.topLeft[0] + 10 &&
                this.topLeft[0] < platform.topLeft[0]
            ) {
                this.x = platform.topLeft[0] - this.width;
                wasCollided = true;
                console.log("Hit right side of platform");
            }
            
            // Left side collision (player moving right into platform)
            else if (
                this.topLeft[0] <= platform.topRight[0] + 5 &&
                this.topLeft[0] >= platform.topRight[0] - 10 &&
                this.topRight[0] > platform.topRight[0]
            ) {
                this.x = platform.topRight[0];
                wasCollided = true;
                console.log("Hit left side of platform");
            }
        }

        // Handle platform-specific effects
        if (wasCollided && platform.platformColor) {
            if (platform.platformColor === "red") {
                this.dead = true;
                console.log("Died from red platform");
            }
            else if (platform.platformColor === "pink") {
                this.velx *= 0.5; // Slow down on pink platforms
            }
            else {
                this.velx = 5; // Reset to normal speed
            }
        }

        return wasCollided;
    }

    // FIXED: Jump method (was calling this.isCollided instead of this.isCollided())
    jump(){
        if (!keys["ArrowUp"]) return;

        console.log("Attempting jump");
        // Fixed: Call isCollided() as a method, not a property
        if (!this.inAir && this.collided) {
            this.vely = 10; 
            this.inAir = true; 
            this.collided = false; 
            console.log("Jumped!");      
        }
    }

    gravity() {
        if(!this.inAir){
            this.vely = 0;
        }
        else {
            this.vely -= this.grav;
        }
        this.y -= this.vely;
    }

    // FIXED: Better collision state management
    isCollided(){
        return this.collided;
    }

    death(platform = null){
        if(this.vely < -20){   
            this.dead = true;   
        }

        if(this.dead && this.collided){
            console.log("Dead");
            this.x = 80;
            this.y = canvas.height-90;
            this.vely = 3;
            this.dead = false;
        }
    }

    isThamped(){
        if(this.vely < -8){
            this.thamp = true;
        }
        else{
            this.thamp = false;
        }
        return this.thamp;
    }

    win(cat){
        if (
            this.botRight[0] > cat.topLeft[0] && 
            this.botLeft[0] < cat.topRight[0] &&
            this.botRight[1] >= cat.topLeft[1] &&
            this.botRight[1] <= cat.topLeft[1] + 10 // tolerance
        ) {
            this.won = true;
            this.inTouch = true
        }

        // Bottom collision (hitting head)
        else if (
            this.topRight[0] > cat.topLeft[0] &&
            this.topLeft[0] < cat.topRight[0] &&
            this.topRight[1] <= cat.botLeft[1] &&
            this.topRight[1] >= cat.botLeft[1] - 10
        ) {
            this.won = true;
            this.inTouch = true
        }

        // Right side collision
        else if (
            this.topRight[0] >= cat.topLeft[0] &&
            this.topLeft[0] < cat.topLeft[0] &&
            this.botLeft[1] > cat.topLeft[1] &&
            this.topLeft[1] < cat.botLeft[1]
        ) {
            this.won = true;
            this.inTouch = true
        }

        // Left side collision
        else if (
            this.topLeft[0] <= cat.topRight[0] &&
            this.topRight[0] > cat.topRight[0] &&
            this.botRight[1] > cat.topRight[1] &&
            this.topRight[1] < cat.botRight[1]
        ) {
            this.won = true;
            this.inTouch = true
        }

        else{
            this.won = false; 
            this.restart = false; 
            this.inTouch = false
        }

        return this.won
    }

    resetLevel() {
        this.won = false
    }
    
    reset(resetX, resetY){
        this.x = resetX;
        this.y = resetY;
    }

    levelUpdate(currentLevel, player1) {
        currentLevel(player1)
    }
}

class noise{
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.varWidth = 0.5;
        this.inc = 7;
    }

    draw(){
        ctx.clearRect(this.x, this.y,  this.width, this.height);
        ctx.fillStyle = "#f7ede2";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    fill(){
        ctx.clearRect(this.x, this.y, this.varWidth, this.height);
        ctx.fillStyle = "#750d37";
        ctx.fillRect(this.x, this.y, this.varWidth, this.height);
    }

    isClose(entity1, entity2){
        let distX = entity1.x - entity2.x;
        let distY = entity1.y - entity2.y;
        let distance = Math.sqrt(distX * distX + distY * distY);
        if(distance < 1000 && entity1.moving){
            this.inc += 0.5;
        }
        else{
            this.inc = 7;
        }
    }

    noiseBar(entity,cats){
        let collided = entity.isCollided();
        var varWidth = this.varWidth;
        if(collided && entity.moving){
            if(this.varWidth < this.width){
                this.varWidth += this.inc; // normal walking noise
            }
        }
        if(entity.inAir && entity.moving && entity.vely > -6){
            this.varWidth = varWidth;
        }
        if(entity.restart){
            this.varWidth = 0;
        }
        //thamp noise
        else if(entity.isThamped()){
            if(this.varWidth < this.width ){
                this.varWidth += this.inc * 6; // thamp noise
            }
            else if(this.varWidth += this.inc * 3 >= this.width){
                this.varWidth = this.width;
            }
        }
        else{
            if(this.varWidth > 0){
                this.varWidth -= 1.3; // slowly fade noise
            }
        }

        if(this.varWidth >= this.width){
            cats.x += cats.velx;
            if(cats.x + cats.width > canvas.width ){
                entity.dead = true;
            }
        }

        if(entity.dead){
            this.varWidth = 0;
        }
    }
}

class Playground{
    constructor(){
        this.player1 = new entity(900, canvas.height - 40, 40, 40);
        this.cat = new entity(canvas.width - 60, 100, 40, 45);
        this.bar = new noise(375, 50, 0.5 * canvas.width, 20);

        this.won = false
        this.currentLevel = 1
    }

    loadNextLevel(){
        this.won = false
        this.player1.reset(100, 1000)
        this.currentLevel += 1
    }

    getCurrentLevel(){
        return AVAILABLE_LABELS[this.currentLevel]
    }

    update() {
        if(this.won){
            this.loadNextLevel()
        }
        else {
            var bar = this.bar
            var cat = this.cat
            var player1 = this.player1
            
            console.log("in air : ",player1.inAir, " is  collided", player1.isCollided())
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            bar.draw();
            bar.fill(); 
            bar.noiseBar(player1, cat);
            bar.isClose(player1, cat);
            
            base.draw();
            base.coord();

            example.draw();
            example.coord();
            
            player1.canvas();               // keep player in canvas
            player1.coord();                // update player coords first
            
            // FIXED: Check collisions with both platforms
            player1.isColliding(base);      // check base collision
            player1.isColliding(example);   // check example platform collision
            
            player1.move();
            player1.jump();
            player1.gravity();
            player1.draw();
            player1.death();
            
            this.won = player1.win(cat);
            player1.levelUpdate(this.getCurrentLevel(), player1);
            
            console.log("in touchh : ", player1.inTouch, " won : ", player1.won)
            
            cat.canvas();               // keep cat in canvas
            cat.coord();                // update cat coords first
            cat.isColliding(base);      // check ground collision for cat
            cat.gravity();
            cat.drawCat()
        }
        
        requestAnimationFrame(() => this.update());
    }
}

const playground = new Playground()
playground.update()