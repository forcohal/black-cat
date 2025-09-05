

class platform {
    constructor(x, y, width, height, platformColor = "#e7d7c1") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vely = 10;
        this.velx = 2;
        this.coordArraytopX = [];
        this.platformColor = platformColor;          
    }


    draw(){
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.platformColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    

    coord(){
        this.topLeft = [this.x, this.y];
        this.topRight = [this.x + this.width, this.y];
        this.botLeft = [this.x, this.y + this.height];
        this.botRight = [this.x + this.width, this.y + this.height];
        }
}



let movingPlatforms = [
    //level2
    new platform(10, canvas.height - 80 , 10, 80, "red"),
    
    //level4
    new platform(800, canvas.height - 280, 100, 20, "#a2d2ff"),
    //level3
    new platform(800, canvas.height - 230, 100, 20, "#a2d2ff"),
    new platform(700, canvas.height - 300, 50, 20, "#f8f9fa"),
    //level5
    new platform(200, canvas.height - 50, 100, 20, "red"),
 ]

var base = new platform(0, canvas.height - 10, canvas.width, 10)


function level1(player1, cats){
    if(player1.dead || player1.restart){
        console.log("loaded death : ", player1.dead)
        player1.reset(100,1000)
        cats.reset(1200, 80)
    }

    
    const platforms = LEVELS[1]["platforms"]
    platforms.forEach((pltfrm) => {
        const x = pltfrm["x"]
        const y = pltfrm["y"]
        const height = pltfrm["height"]
        const width = pltfrm["width"]
        var platform1 = new platform(x, canvas.height+y, width, height );
        platform1.draw();
        platform1.coord();
        player1.isColliding(platform1);

    })
    return platforms;
}
function level2(player1, cat){
    if(player1.dead || player1.restart){
        console.log("loaded death : ", player1.dead)
        player1.reset(50,400)
        cat.reset(500, 600)
    }
    
     
    let platforms = [     
        new platform(0, canvas.height-150, 80, 20),
    ]

    for(var i = 0; i < platforms.length; i++){
        platforms[i].draw();
        platforms[i].coord()
        player1.isColliding(platforms[i]);
    }
    movingPlatforms[0].draw();
    movingPlatforms[0].coord();
    movingPlatforms[0].x += movingPlatforms[0].velx * 1.7;
    if(movingPlatforms[0].x < 10 || movingPlatforms[0].x > 800)
        {
            movingPlatforms[0].velx *= -1;
    }
    player1.isColliding(movingPlatforms[0]);
}



function level3(player1, cats){
    player1.reset(200,1000)
    movingPlatforms[1].draw();
    movingPlatforms[1].coord();
    movingPlatforms[1].x += movingPlatforms[1].velx;
    if(movingPlatforms[1].x < 480 || movingPlatforms[1].x > 800)
        {
            movingPlatforms[1].velx *= -1;
    }
    player1.isColliding(movingPlatforms[1]); 
    movingPlatforms[2].draw();
    movingPlatforms[2].coord();
    movingPlatforms[2].x += movingPlatforms[2].velx/2;
    if(movingPlatforms[2].x < 660 || movingPlatforms[2].x > 740)
        {
            movingPlatforms[2].velx *= -1;
    }
    player1.isColliding(movingPlatforms[2]); 
    
    let platforms = [
        /* platform1 */
        new platform(0, canvas.height-90, 80, 20),
        /* platform2 */  
        new platform(280, canvas.height-130, 100, 20),
        //new platform(480, canvas.height-230, 100, 20,"red"),
        new platform(660, canvas.height-280, 100, 20),
        new platform(550, canvas.height-350, 100, 20),
        new platform(890, canvas.height-300, 100, 20),
        
        /* Wall */
        new platform(700, canvas.height - 400, 100, 400),


    ]
    for(var i = 0; i < platforms.length; i++){
        platforms[i].draw();
        platforms[i].coord()
        player1.isColliding(platforms[i]);
    }

    
}
function level4(player1, cats) {
    
    movingPlatforms[1].draw();
    movingPlatforms[1].coord();
    movingPlatforms[1].x += movingPlatforms[1].velx;

    if(movingPlatforms[1].x < 720 || movingPlatforms[1].x > canvas.width -100 ){
        movingPlatforms[0].velx = movingPlatforms[0].velx * -1;
    }

    player1.isColliding(movingPlatforms[1]); 


    let platforms = [
        /* platforms */
        new platform(0, canvas.height-100, 80, 20),
        new platform(200, canvas.height-160, 100, 20),
        new platform(350, canvas.height-260, 100, 20),
        new platform(900, canvas.height - 200, 50, 20),
        
        /* wall */
        new platform(450, canvas.height-260, 100, canvas.height),
    ]

    for(var i = 0; i < platforms.length; i++){
        platforms[i].draw();
        platforms[i].coord()
        player1.isColliding(platforms[i]);
    }    

    
}
function level5(player1) {
    movingPlatforms[3].draw();
    movingPlatforms[3].coord();
    movingPlatforms[3].x += movingPlatforms[3].velx*3;

    if(movingPlatforms[3].x < 200 || movingPlatforms[3].x > canvas.width -100 ){
        movingPlatforms[3].velx = movingPlatforms[3].velx * -1;
    }

    player1.isColliding(movingPlatforms[3]); 

    let platforms = [
        // Starting ground
        new platform(0, canvas.height - 20, 150, 20),
        new platform(150, canvas.height - 20, 100, 20, "red"),
        new platform(250, canvas.height - 20, 50, 20),
        new platform(300, canvas.height - 20, 100, 20, "red"),
        new platform(400, canvas.height - 20, 100, 20),
        new platform(500, canvas.height - 20, 40, 20, "red"),
        new platform(540, canvas.height - 20, 50, 20, ),
        new platform(590, canvas.height - 20, 80, 20, "red"),
        new platform(670, canvas.height - 20, 50, 20),
        new platform(720, canvas.height - 20, 100, 20, "red"),
        new platform(820, canvas.height - 20, 60, 20),
        new platform(880, canvas.height - 20, 40, 20, "red"),
        new platform(900, canvas.height - 20, 100, 20, ),
        new platform(1000, canvas.height - 20, 100, 20, "red"),
        new platform(1100, canvas.height - 20, 200, 20,),

        
        // Staircase to the right
        
        
    ];

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
}

const LEVELS = {
    1: {
        // platforms: [{
        //     "x": 123, "y": -90, "width": 123, "height": 123,
        // }, {
        //     "x": 423, "y": -90, "width": 123, "height": 123,
        // }],
        platforms: []
        
    }
}