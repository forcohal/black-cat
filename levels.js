// =============================================================================
// PLATFORM CLASS
// =============================================================================

class Platform {
    constructor(x, y, width, height, platformColor = "#e7d7c1") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vely = 2;
        this.velx = 2;
        this.coordArraytopX = [];
        this.platformColor = platformColor;          
    }

    draw() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.platformColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    coord() {
        this.topLeft = [this.x, this.y];
        this.topRight = [this.x + this.width, this.y];
        this.botLeft = [this.x, this.y + this.height];
        this.botRight = [this.x + this.width, this.y + this.height];
    }
}


let movingPlatforms = [
    // Level 3
    new Platform(40, canvas.height - 90, 10, 80, "red"),
    
    // Level 4
    new Platform(740, canvas.height - 400, 160, 20, "#a2d2ff"),
    new Platform(540, canvas.height - 400, 160, 20, "#a2d2ff"),
    new Platform(740, canvas.height - 110, 60, 10, "red"),
    new Platform(840, 450, 60, 10, "red"),
    new Platform(740, 320, 60, 10, "red"),
    new Platform(840, 200, 60, 10, "red"),
    
    // Level 3
    new Platform(800, canvas.height - 230, 100, 20, "#a2d2ff"),
    new Platform(700, canvas.height - 300, 50, 20, "#f8f9fa"),
    
    // Level 5
    new Platform(200, canvas.height - 40, 100, 20, "red"),
];

// Base platform
var base = new Platform(0, canvas.height - 10, canvas.width, 10);

// =============================================================================
// LEVEL FUNCTIONS
// =============================================================================

function level1(player1, cats) {
    // Handle player death/restart
    if (player1.dead || player1.restart) {
        console.log("loaded death : ", player1.dead);
        player1.reset(100, 1000);
        cats.reset(1200, 80);
    }

    // Process platforms from LEVELS configuration
    const platforms = LEVELS[1]["platforms"];
    platforms.forEach((pltfrm) => {
        const x = pltfrm["x"];
        const y = pltfrm["y"];
        const height = pltfrm["height"];
        const width = pltfrm["width"];
        var platform1 = new Platform(x, canvas.height + y, width, height);
        platform1.draw();
        platform1.coord();
        player1.isColliding(platform1);
    });
    
    return platforms;
}

function level2(player1, cats) {
    if (player1.dead || player1.restart) {
        console.log("loaded death : ", player1.dead);
        player1.reset(50, 100);
        cat.reset(1200, 600);
    }    
    

     
    
    // Static platforms
    let platforms = [
        // Platform 1
        new Platform(0, canvas.height - 500, 380, 20),
        new Platform(550, canvas.height - 500, 380, 20),
        new Platform(700, canvas.height - 340, 380, 20),
        new Platform(550, canvas.height - 180, 380, 20),
        new Platform(1050, canvas.height - 480, 30, 150),
        

        
    ];

    // Process static platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
        platforms[i].coord();
        player1.isColliding(platforms[i]);
    }
}

function level3(player1, cat) {
    if (player1.dead || player1.restart) {
        console.log("loaded death : ", player1.dead);
        player1.reset(0, 400);
        cat.reset(1200, 600);
    }
    
    // Static platforms
    let platforms = [     
        new Platform(0, canvas.height - 150, 40, 20),
    ];

    // Process static platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
        platforms[i].coord();
        player1.isColliding(platforms[i]);
    }

    // Moving platform logic
    movingPlatforms[0].draw();
    movingPlatforms[0].coord();
    movingPlatforms[0].x += movingPlatforms[0].velx * 3;
    
    if (movingPlatforms[0].x < 40 || movingPlatforms[0].x > 1000) {
        movingPlatforms[0].velx *= -1;
    }
    
    player1.isColliding(movingPlatforms[0]);
}



function level4(player1, cats) {
    if (player1.dead || player1.restart) {
        console.log("loaded death : ", player1.dead);
        player1.reset(300, canvas.height - 100);
        cat.reset(1200, 600);
    } 
    // Moving platform logic
    movingPlatforms[1].draw();
    movingPlatforms[1].coord();
    movingPlatforms[1].y += movingPlatforms[1].vely;

    if (movingPlatforms[1].y > canvas.height - 10 || movingPlatforms[1].y < 80) {
        movingPlatforms[1].vely = movingPlatforms[1].vely * -1;
    }

    for (var i = 3; i < 7; i++) {
        movingPlatforms[i].draw();
        movingPlatforms[i].coord();
        movingPlatforms[i].x += movingPlatforms[i].velx * 0.5;
        if (movingPlatforms[i].x < 695 || movingPlatforms[i].x > 890) {
            movingPlatforms[i].velx *= -1;
        }
            player1.isColliding(movingPlatforms[i]);
    }

    player1.isColliding(movingPlatforms[1]); 
    movingPlatforms[2].draw();
    movingPlatforms[2].coord();
    movingPlatforms[2].y += movingPlatforms[2].vely;

    if (movingPlatforms[2].y > canvas.height - 50 || movingPlatforms[2].y < 80) {
        movingPlatforms[2].vely = movingPlatforms[2].vely * -1;
    }

    player1.isColliding(movingPlatforms[2]); 

    // Static platforms
    let platforms = [
        // Main platforms
        new Platform(900, canvas.height - 600, 40, 500),
        new Platform(700, 190, 40, 500),
        new Platform(500, canvas.height - 580, 40, 430),
        //RED PLATS

        new Platform(640, 580, 60, 10, "red"),
        new Platform(540, 450, 60, 10, "red"),
        new Platform(640, 320, 60, 10, "red"),
        new Platform(540, 200, 60, 10, "red"),

        
        
    ];

    // Process static platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
        platforms[i].coord();
        player1.isColliding(platforms[i]);
    }    
}

function level5(player1) {
    if (player1.dead || player1.restart) {
        console.log("loaded death : ", player1.dead);
        player1.reset(30, canvas.height - 200);
        cat.reset(1200, 600);
    } 
    // Moving platform logic
    movingPlatforms[9].draw();
    movingPlatforms[9].coord();
    movingPlatforms[9].x += movingPlatforms[9].velx * 3;

    if (movingPlatforms[9].x < 200 || movingPlatforms[9].x > canvas.width - 100) {
        movingPlatforms[9].velx = movingPlatforms[9].velx * -1;
    }

    player1.isColliding(movingPlatforms[9]); 

    // Ground platforms with alternating colors
    let platforms = [
        // Starting ground
        new Platform(0, canvas.height - 20, 150, 20),
        new Platform(150, canvas.height - 20, 100, 20, "red"),
        new Platform(250, canvas.height - 20, 50, 20),
        new Platform(300, canvas.height - 20, 100, 20, "red"),
        new Platform(400, canvas.height - 20, 50, 20),
        new Platform(450, canvas.height - 20, 90, 20, "red"),
        new Platform(540, canvas.height - 20, 50, 20),
        new Platform(590, canvas.height - 20, 80, 20, "red"),
        new Platform(670, canvas.height - 20, 50, 20),
        new Platform(720, canvas.height - 20, 100, 20, "red"),
        new Platform(820, canvas.height - 20, 60, 20),
        new Platform(880, canvas.height - 20, 40, 20, "red"),
        new Platform(900, canvas.height - 20, 100, 20),
        new Platform(1000, canvas.height - 20, 100, 20, "red"),
        new Platform(1100, canvas.height - 20, 10, 20),
    ];

    // Process platforms
    for (let i = 0; i < platforms.length; i++) {
        platforms[i].draw();
        platforms[i].coord();
        player1.isColliding(platforms[i]);
    }
}
function level6(player1) {
    if (player1.dead || player1.restart) {
        console.log("loaded death : ", player1.dead);
        player1.reset(30, canvas.height - 200);
        cat.reset(1200, 600);
    } 
    // Moving platform logic
    movingPlatforms[9].draw();
    movingPlatforms[9].coord();
    movingPlatforms[9].x += movingPlatforms[9].velx * 3;

    if (movingPlatforms[9].x < 200 || movingPlatforms[9].x > canvas.width - 100) {
        movingPlatforms[9].velx = movingPlatforms[9].velx * -1;
    }

    player1.isColliding(movingPlatforms[9]); 

    // Ground platforms with alternating colors
    let platforms = [
        // Starting ground
        
        new Platform(150, canvas.height - 110, 80, 20,),
        
        new Platform(330, canvas.height - 200, 80, 20, ),
        
        new Platform(500, canvas.height - 200, 10, 20, "red"),
        
        new Platform(580, canvas.height - 200, 80, 20 ),
        
        new Platform(720, canvas.height - 20, 10, 20, "red"),
        
        new Platform(880, canvas.height - 20, 10, 20, "red"),
        
        new Platform(1000, canvas.height - 20, 10, 20, "red"),
        
    ];

    // Process platforms
    for (let i = 0; i < platforms.length; i++) {
        platforms[i].draw();
        platforms[i].coord();
        player1.isColliding(platforms[i]);
    }

    
}


const AVAILABLE_LABELS = {
    1: level1,
    2: level2,
    3: level3,
    4: level4,
    5: level1
};

const LEVELS = {
    1: {
        platforms: []
    }
};