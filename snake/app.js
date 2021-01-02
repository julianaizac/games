window.onload = function(){
 
    let stage = document.getElementById('stage');
    let ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);

    const vel = 1;

    let score = 0

    let vx = vy = 0;
    let px = 10;
    let py = 15;
    let tp = 20;
    let qp = 25;
    let ax = ay = 15;

    let trail = [];
    tail = 1;

    function game(){
        px += vx;
        py += vy;
        if (px < 0) {
            px = qp - 1;
        }
        if (px > qp-1) {
            px = 0;
        }
        if (py < 0) {
            py = qp - 1;
        }
        if (py > qp-1) {
            py = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "orangered";
        ctx.fillRect(ax * tp, ay * tp, tp,tp);

        ctx.fillStyle = "lime";
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
            if (trail[i].x == px && trail[i].y == py) { 
                vx = vy = 0;
                tail = 1;
                score = 0
            }
        }

        trail.push({ x:px, y:py })
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py){
            tail++;
            score++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }

        ctx.fillStyle = "white";
        ctx.font = "20px Fjalla One";
        ctx.fillText(score, 1 * qp, 1.6 * qp);
    }

    function keyPush(event){
        switch (event.keyCode) {
            case 37: // left
                vx = -vel;
                vy = 0;
                break;
            case 38: // up
                vx = 0;
                vy = -vel;
                break;
            case 39: // right
                vx = vel;
                vy = 0;
                break;
            case 40: // down
                vx = 0;
                vy = vel;
                break;          
            default:
                break;
        }
    }
}