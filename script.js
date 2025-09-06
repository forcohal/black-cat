// Audio System Setup
const VOLUME = 0.8; // Adjust this to control overall volume (0.0 to 1.0)
const A = new (AudioContext||webkitAudioContext)();
const G = A.createGain();
G.connect(A.destination);
G.gain.value = VOLUME;

// Compact sound functions
function walk() {
    const o = A.createOscillator(), g = A.createGain(), t = A.currentTime;
    o.connect(g); g.connect(G);
    o.frequency.setValueAtTime(80, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.1);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.6, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    o.type = 'sawtooth';
    o.start(t); o.stop(t + 0.15);
}

function scream() {
    const o = A.createOscillator(), g = A.createGain(), t = A.currentTime;
    o.connect(g); g.connect(G);
    o.frequency.setValueAtTime(800, t);
    o.frequency.exponentialRampToValueAtTime(200, t + 0.5);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.8, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    o.type = 'sawtooth';
    o.start(t); o.stop(t + 0.5);
}

function thud() {
    const o = A.createOscillator(), g = A.createGain(), t = A.currentTime;
    o.connect(g); g.connect(G);
    o.frequency.setValueAtTime(60, t);
    o.frequency.exponentialRampToValueAtTime(20, t + 0.3);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.9, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    o.type = 'square';
    o.start(t); o.stop(t + 0.3);
}

function warn() {
    const o = A.createOscillator(), g = A.createGain(), t = A.currentTime;
    o.connect(g); g.connect(G);
    o.frequency.setValueAtTime(400, t);
    o.frequency.linearRampToValueAtTime(600, t + 0.1);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.4, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.type = 'triangle';
    o.start(t); o.stop(t + 0.1);
}

// Input handling
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
        this.tries = 0;

    } 
    draw(){ 
        ctx.clearRect(this.x, this.y, this.width, this.height); 
        ctx.fillStyle = "#00afb9"; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#ccdbdc" 
        ctx.fillRect(this.x, this.y + this.height/2 + 20, this.width, 15); 
        ctx.clearRect(this.x + 15, this.y +  this.height/2 + 20, this.width/4,  16); 
        
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + 10, 25, 0, Math.PI * 2);
        ctx.fillStyle = "#fdf0d5";
        ctx.fill();
        
        
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
        } else if (keys["ArrowRight"]){ 
            this.x += this.velx; 
            this.moving = true;
        } else{
            this.moving = false;
        } 
    } 
    coord(){ 
        this.topLeft = [this.x, this.y]; 
        this.topRight = [this.x + this.width, this.y]; 
        this.botLeft = [this.x, this.y + this.height]; 
        this.botRight = [this.x + this.width, this.y + this.height]; 
    } 
    isInAir() { 
        if(this.y + this.height < canvas.height) { 
            this.inAir = true; 
        } else { 
            this.inAir = false; 
        } 
        if(!this.inAir){ 
            this.y = canvas.height - this.height; 
        } 
    } 
    canvas(){ 
        if(this.x < 0) this.x = 0; 
        if(this.x + this.width > canvas.width) this.x = canvas.width - this.width; 
    } 
    isColliding(platform, color = null) { 
        if (this.botRight[0] > platform.topLeft[0] &&
            this.botLeft[0] < platform.topRight[0] &&
            this.botRight[1] >= platform.topLeft[1] &&
            this.botRight[1] <= platform.topLeft[1] + 10 // tolerance 
        ) { 
            this.inAir = false; 
            this.y = platform.topLeft[1] - this.height; 
            this.collided = true; 
            this.vely = 0; 
            if(platform.platformColor == "red"){ 
                this.dead = true;
                //this.tries++;
                console.log("dead") 
            } 
            if(platform.platformColor == "pink"){ 
                this.velx *= 0.2; 
            } else{ 
                this.velx = 5; 
            } 
        } 
        // Bottom collision (hitting head) 
        else if(this.topRight[0] > platform.topLeft[0] &&
            this.topLeft[0] < platform.topRight[0] && 
            this.topRight[1] <= platform.botLeft[1] && 
            this.topRight[1] >= platform.botLeft[1] - 10 )
            { 
            this.vely = 0; 
            this.y = platform.botLeft[1]; 
            this.collided = true; 
            if(platform.platformColor == "red"){ 
                this.dead = true; 
                //this.tries++;
                console.log("dead") 
            } 
            if(platform.platformColor == "pink"){ 
                this.velx *= 0.2; 
            } else{ 
                this.velx = 5; 
            } 
        } 
        // Right side collision 
        else if ( this.topRight[0] >= platform.topLeft[0] && 
            this.topLeft[0] < platform.topLeft[0] && 
            this.botLeft[1] > platform.topLeft[1] && 
            this.topLeft[1] < platform.botLeft[1] ) { 
            this.x = platform.topLeft[0] - this.width; 
            this.collided = true; 
            if(platform.platformColor == "red"){ 
                this.dead = true; 
                //this.tries++;
                console.log("dead") 
            } 
            if(platform.platformColor == "pink"){ 
                this.velx *= 0.2; 
            } else{ 
                this.velx = 5; 
            } 
        } 
        // Left side collision 
        else if ( this.topLeft[0] <= platform.topRight[0] && 
            this.topRight[0] > platform.topRight[0] && 
            this.botRight[1] > platform.topRight[1] && 
            this.topRight[1] < platform.botRight[1] ) { 
            this.x = platform.topRight[0]; 
            this.collided = true; 
            if(platform.platformColor == "red"){ 
                this.dead = true; 
                //this.tries++;
                console.log("dead") 
            } 
            if(platform.platformColor == "pink"){ 
                this.velx *= 0.5; 
            } else{ 
                this.velx = 5; 
            } 
        } 
    } 
    jump(){ 
        if(!this.inAir && keys["ArrowUp"]) { 
            this.vely = 10; 
            this.inAir = true; 
            this.collided = true; 
        } else if(this.inAir){ 
        } 
    } 
    gravity() { 
        if(!this.inAir){ 
            this.vely = 0; 
        } else { 
            this.vely -= this.grav; 
        } 
        this.y -= this.vely; 
    } 
    isCollided(){ 
        if(!this.inAir && this.moving){ 
            this.collided = true; 
        } else if(!this.inAir && this.moving){ 
            this.collided = true; 
        } else if(!this.inAir){ 
            this.collided = true; 
        } 
        return this.collided; 
    } 
    death(platform = null){ 
        if(this.vely < -20){ 
            this.dead = true;
            //this.tries++;
        } 
        if(this.dead && this.collided){ 
             
            this.vely = 3; 
            this.restart = true;
            this.dead = false; 
        } 
        return this.dead;
    } 
    isThamped(){ 
        if(this.vely < - 8){ 
            this.thamp = true; 
        } else{this.thamp = false;} 
        return this.thamp; 
    } 

    

    nextLevel(player1,cats){
        
        player1.reset(100,1000)
        //cats.reset(100,800)
        cats.restart = false;
        //cats.reset(1000,800)
        
        //cats.reset(100,900)
        this.won = false;
        this.level += 1;

    }

    loadLevel(player1,levels,cats = null){
        if(this.level >= levels.length){
            window.location.href = "story2.html";
        }else{
            player1.reset(100,1000)
            cats.reset(1200,500)
            return levels[this.level](player1, cats);
        }
    }


    win(cat){ 
        if ( this.botRight[0] > cat.topLeft[0] && 
            this.botLeft[0] < cat.topRight[0] &&
            this.botRight[1] >= cat.topLeft[1] && 
            this.botRight[1] <= cat.topLeft[1] + 10 // tolerance 
        ) { 
            this.won = true; 
           
            this.restart = true; 
        } 
        // Bottom collision (hitting head) 
        else if ( this.topRight[0] > cat.topLeft[0] && 
            this.topLeft[0] < cat.topRight[0] && 
            this.topRight[1] <= cat.botLeft[1] && 
            this.topRight[1] >= cat.botLeft[1] - 10 ) { 
            this.won = true; 
            
            this.restart = true; 
        } 
        // Right side collision 
        else if ( this.topRight[0] >= cat.topLeft[0] && 
            this.topLeft[0] < cat.topLeft[0] && 
            this.botLeft[1] > cat.topLeft[1] && 
            this.topLeft[1] < cat.botLeft[1] ) { 
            this.won = true; 
             
            this.restart = true; 
        } 
        // Left side collision 
        else if ( this.topLeft[0] <= cat.topRight[0] && 
            this.topRight[0] > cat.topRight[0] && 
            this.botRight[1] > cat.topRight[1] && 
            this.topRight[1] < cat.botRight[1] ) { 
            this.won = true; 
            
            this.restart = true; 
        } else{
            this.won = false; 
            this.restart = false
        }
    } 
    reset(resetX, resetY){ 
        if(this.won || this.dead || this.restart){ 
            this.x = resetX; 
            this.y = resetY; 
            //console.log("reset called!")
        }  
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
        this.lastWalk = 0;
        this.lastThud = 0;
        this.playedScream = false;
        this.playedWarning = false;
    }

    draw(){ 
        ctx.clearRect(this.x, this.y, this.width, this.height); 
        ctx.fillStyle = "#f8f9fa"; 
        ctx.fillRect(this.x, this.y, this.width, this.height); 
        
    }

    fill(){ 
        ctx.clearRect(this.x, this.y, this.varWidth, this.height); 
        ctx.fillStyle = "#750d37"; 
        ctx.fillRect(this.x, this.y, this.varWidth, this.height); 

        ctx.font = "1000 20px  Comic Sans MS";
        ctx.fillStyle = "#2b2d42 ";   // text color
        ctx.fillText("Noise Bar", 700, 67);
    } 
    isClose(entity1, entity2){ 
        let distX = entity1.x - entity2.x; 
        let distY = entity1.y - entity2.y; 
        let distance = Math.sqrt(distX * distX + distY * distY); 
        if(distance < 1000 && entity1.moving){ 
            this.inc += 0.5; 
            console.log("close"); 
        } else{
            this.inc = 7;
        } 
    }
    noiseBar(entity,cats){ 
        let collided = entity.isCollided(); 
        var varWidth = this.varWidth; 
        
        if(collided && entity.moving){ 
            // Walking sound (throttled)
            if(Date.now() - this.lastWalk > 200) {
                walk();
                this.lastWalk = Date.now();
            }
            if(entity.inAir && entity.moving) {
                // Screaming sound when moving in air (throttled)
                if(Date.now() - this.lastWalk > 300) {
                    scream();
                    this.lastWalk = Date.now();
                }
            }
            
            if(this.varWidth < this.width){ 
                this.varWidth += this.inc; 
            } 
        } 
        if(entity.inAir && entity.moving && entity.vely > -6){ 
            this.varWidth = varWidth; 
            
        } 
        if(entity.restart){ 
            this.varWidth = 0; 
            this.playedScream = false;
            this.playedWarning = false;
        } 
        //thamp noise 
        else if(entity.isThamped()){ 
            // Thud sound for heavy landing
            if(Date.now() - this.lastThud > 500) {
                thud();
                this.lastThud = Date.now();
            }
            
            if(this.varWidth < this.width ){ 
                this.varWidth += this.inc * 6; 
            } else if(this.varWidth += this.inc * 3 >= this.width){ 
                this.varWidth = this.width; 
            } 

        } 
        else if(this.varWidth >= this.width){ 
            this.varWidth = this.width
            cats.x += cats.velx + 5;
            
            if(cats.x -50 > canvas.width ){ 
                entity.dead = true; 
                entity.tries++ 
            }

        } 
        
        else{ 
            if(this.varWidth > 0){ 
                this.varWidth -= 1.3; 
            } 
        } 
        
        // Play warning sound when noise bar is getting full
        if(this.varWidth > this.width * 0.8 && !this.playedWarning) {
            warn();
            this.playedWarning = true;
        }
        
        if(this.varWidth < this.width * 0.7) {
            this.playedWarning = false;
        }
        
        if(entity.dead){ 
            // Scream when caught/dead
            if(!this.playedScream) {
                scream();
                this.playedScream = true;
            }
            
            this.varWidth = 0;
            cats.x = 1200;
            cats.y = 600;
            entity.x = 100;  // Always reset to starting x position
            entity.y = canvas.height - 40;
            entity.restart = true;
        } 
    } 

    counts(entity){
        
        ctx.font = "1000 20px  Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace";
        ctx.fillStyle = "#ccff33";   // text color
        ctx.fillText(`cat caught : ${entity.level}`, 0, 17);
        if(entity.dead){
            entity.tries++;
        }
        ctx.font = "1000 20px  Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace";
        ctx.fillStyle = "#ccff33";   // text color
        ctx.fillText(`Attempts counter : ${entity.tries}`, 0, 37);
    }
} 


var player1 = new entity(100, canvas.height - 40, 40, 70); 
var cat = new entity(1200, 800, 40,45); 
var bar = new noise(375, 50, 0.5 * canvas.width, 20,); 
var levels = [level1, level2, level3, level4, level5]; 




function update() {
     if(player1.won){
        player1.nextLevel(player1, cat);
        cat.restart = true;
        
    }  
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    bar.draw(); 
    bar.fill(); 
    bar.noiseBar(player1, cat); 
    bar.isClose(player1, cat);
     
    base.draw();
    base.coord(); 
    player1.canvas(); 
    player1.coord(); 
    player1.isInAir(); 
    player1.death();
    player1.loadLevel(player1,levels, cat)
    //level3(player1,levels, cat)
    
    
    player1.isColliding(base) 
    player1.move(); 
    player1.jump(); 
    player1.gravity(); 
    player1.draw(); 
    
    player1.win(cat); 
    //cat.canvas(); 
    cat.coord(); 
    cat.isInAir(); 
    cat.gravity(); 
    cat.drawCat()
    cat.isColliding(base);
    bar.counts(player1)
    
    

    cat.restart = false;
     
    requestAnimationFrame(update); 
} 


    update();