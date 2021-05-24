const drawItem = {
    smoke: (p, t) => {
        p.push();
        p.noStroke();
        p.rotate(-p.HALF_PI);

        for (let i = 0; i < 5; ++i) {
            let color = p.map(1 + p.cos(i), -1, 1, 220, 255);
            const r = (t + p.sin(i)) % 0.5;
            const brightness = (r / 0.5);
            color *= brightness;

            const theta = p.map(i, 0, 4, -p.PI / 3, p.PI / 3);
            const size = p.map(i, 0, 4, 0.1, 0.3);

            p.fill(color, color, color);
            p.circle(r * p.cos(theta), r * p.sin(theta), size);
        }
        p.pop();
    },
    explosion: (p, t) => {
        p.push();
        p.noStroke();
        p.rotate(-p.HALF_PI);
        const iter = 10;

        for (let i = 0; i < iter; ++i) {
            let color = p.map(1 + p.sin(i), -1, 1, 220, 255);
            const r = 2 * (t + p.cos(i)) % 0.5;
            const extraColor = p.map(p.sin(i + t), -1, 1, 0, 64);

            const theta = p.map(i, 0, iter, -p.PI, p.PI) + t;
            const size = p.map(i, 0, iter, 0.1, 0.3);

            p.fill(255, 128 + extraColor, 0 + extraColor);
            p.circle(r * p.cos(theta), r * p.sin(theta), size);
        }
        p.pop();
    },
    arena: (p, t) => {
        p.push();
        p.strokeWeight(0.01);

        // Stands
        p.stroke(0);
        p.fill(200);
        p.rect(-0.45, -0.4, 0.2, 0.55);
        p.rect(0.25, -0.4, 0.2, 0.55);
        p.rect(-0.45, -0.4, 0.9, 0.25);
        p.rect(-0.4, -0.05, 0.8, 0.2);
        for (let i = 1; i < 9; ++i) {
            const y = i / 10 * 0.25 - 0.05;
            p.line(-0.4, y, 0.4, y);
        }

        // Scoreboard
        p.stroke(120);
        p.fill(255);
        p.beginShape();
        p.vertex(-0.3, -0.3);
        p.vertex(-0.2, -0.2);
        p.vertex(-0.2, -0.05);
        p.vertex(-0.3, -0.1);
        p.endShape();
        p.line(-0.3, -0.3, -0.3, 0.3);
        p.line(-0.2, -0.2, -0.2, 0.2);
        p.line(-0.3, -0.3, -0.2, -0.2);
        p.line(-0.3, -0.1, -0.2, -0.05);

        p.pop();
    },
    explodingArena: (p, t) => {
        p.push();

        // Sky
        p.noStroke();
        p.fill(50, 150, 255);
        p.rect(-0.5, -0.5, 1.0, 1.0);

        // Ground
        p.fill(0, 150, 75);
        p.rect(-0.5, -0.2, 1.0, 0.7);

        drawItem.arena(p, t);

        p.translate(0, 1 / 8);
        p.scale(p.map(p.sin(t), -1, 1, 0.2, 0.6));
        drawItem.explosion(p, t);
        p.pop();

        p.push();

        p.translate(0, -3 / 8);
        p.scale(1 / 3, 1 / 3);
        drawItem.smoke(p, t);

        p.translate(-1, 0);

        p.push();
        p.scale(-1, 1);
        drawItem.smoke(p, t);
        p.pop();

        p.translate(2, 0);

        p.push();
        p.scale(-1, 1);
        drawItem.smoke(p, t);
        p.pop();

        p.pop();
    },
    snakes: (p, t) => {
        const n = (x) => p.map(p.noise(x), 0.0, 1.0, -0.5, 0.5);
        const numSnakes = 50;
        const colors = [
            [244, 92, 255],
            [43, 255, 43],
            [92, 211, 255],
            [247, 255, 28],
        ];

        // Snakes
        p.strokeWeight(0.01);
        p.noFill();
        for (let i = 0; i < numSnakes; ++i) {
            const x0 = n(t + i);
            const y0 = n(t + i + 200);
            const x1 = n(t + i + 10);
            const y1 = n(t + i - 520);
            const x2 = n(t + i - 632903);
            const y2 = n(t + i + 5203);
            const x3 = n(t + i - 70934);
            const y3 = n(t + i + 12909);

            const color = colors[Math.floor(colors.length * i / numSnakes)];

            p.stroke(color);
            p.bezier(x0, y0, x1, y1, x2, y2, x3, y3);
        }
    },
    tree: (p, t) => {
        p.push();
        p.strokeWeight(0.005);

        // Trunk
        p.fill(200, 150, 50);
        p.stroke(50, 30, 10);
        p.rect(-0.05, -0.2, 0.1, 0.7);

        // Leaves
        p.fill(0, 255, 100);
        p.stroke(0, 150, 50);
        p.circle(0.0, -0.2, 0.5);

        p.pop();
    },
    snakesOnPaper: (p, t) => {
        // Paper
        p.fill(230);
        p.stroke(0);
        p.rect(-0.4, -0.5, 0.8, 1.0);

        // Writing
        p.noFill();
        p.stroke(0);
        const numLines = 10;
        for (let i = 0; i < numLines; ++i) {
            const y = p.map(i, 0, numLines - 1, -0.4, 0.4);

            p.beginShape();
            for (let x = -0.35; x <= 0.35; x += 0.01) {
                const offset = p.map(p.sin(100 * (x + y)), -1.0, 1.0, -0.01, 0.01);
                p.vertex(x, y + offset);
            }
            p.endShape();
        }

        // Snakes
        drawItem.snakes(p, t);
    },
    zoo: (p, t) => {
        p.push();

        // Sky
        p.noStroke();
        p.fill(50, 150, 255);
        p.rect(-0.5, -0.5, 1.0, 1.0);

        // Tree
        p.push();
        p.translate(0.22, 0.0);
        p.scale(0.75);
        drawItem.tree(p, t);
        p.pop();

        // Ground
        p.noStroke();
        p.fill(0, 255, 150);
        p.beginShape();
        p.vertex(0.5, 0.5);
        p.vertex(-0.5, 0.5);
        const inc = 0.005;
        for (let x = -0.5; x < 0.5 + inc; x += inc) {
            const y = p.map(p.noise(x), 0.0, 1.0, 0.1, 0.4);
            p.vertex(x, y);
        }
        p.endShape(p.CLOSE);

        // Bars
        p.strokeWeight(0.02);
        p.stroke(100);
        const numBars = 10;
        for (let i = 0; i < numBars; ++i) {
            const x = p.map(i, 0, numBars - 1, -0.5, 0.5);
            p.line(x, -0.5, x, 0.5);
        }
        p.line(-0.5, -0.5, 0.5, -0.5);
        p.line(-0.5, 0.5, 0.5, 0.5);

        p.pop();
    },
    mockingjay: (p, t) => {
        p.push();
        const wingPos = p.map(p.sin(t * 7), -1.0, 1.0, -0.3, 0.0);

        // Back wing
        p.noStroke();
        p.fill(0);
        p.bezier(
            0.5, wingPos,
            0.4, 0.2,
            0.3, 0.2,
            0.2, 0.1,
        );

        // Body
        p.fill(255);
        p.bezier(
            -0.2, 0.4,
            0.4, 0.3,
            0.3, -0.2,
            0.1, 0.0,
        );

        // Beak
        p.fill(255, 200, 0);
        p.triangle(
            0.3, -0.05,
            0.35, -0.2,
            0.2, -0.1,
        );

        // Head
        p.fill(0);
        p.circle(0.2, -0.05, 0.2);

        // Front wing
        p.fill(0);
        p.bezier(
            -0.4, wingPos,
            -0.3, 0.3,
            0.0, 0.2,
            0.1, 0.1,
        );
        p.pop();
    },
    hangingPost: (p, t) => {
        p.push();

        // Noose
        p.strokeWeight(0.01);
        p.noFill();
        p.stroke(100, 75, 25);
        p.line(-0.175, -0.35, -0.175, -0.25)
        p.circle(-0.175, -0.2, 0.1);

        // Posts
        p.noStroke();
        p.fill(100, 75, 25);
        p.rect(-0.4, 0.0, 0.05, 0.4);
        p.rect(0.0, 0.0, 0.05, 0.4);
        p.rect(-0.35, -0.4, 0.05, 0.4);
        p.rect(-0.05, -0.4, 0.05, 0.4);

        // Stand
        p.fill(110, 100, 20);
        p.rect(-0.45, 0.0, 0.55, 0.05);
        p.rect(-0.375, -0.4, 0.4, 0.05);

        p.pop();
    },
    forest: (p, t) => {
        // Trees
        for (let x = -0.4; x <= 0.4; x += 0.1) {
            p.push();
            p.translate(x, -0.1);
            p.scale(0.75)
            drawItem.tree(p, t);
            p.pop();
        }
        for (let x = -0.3; x <= 0.3; x += 0.15) {
            p.push();
            p.translate(x, 0.0);
            p.scale(0.5)
            drawItem.tree(p, t);
            p.pop();
        }

        // Ground
        p.noStroke();
        p.fill(0, 150, 75);
        p.beginShape();
        p.vertex(0.5, 0.5);
        p.vertex(-0.5, 0.5);
        const inc = 0.005;
        for (let x = -0.5; x < 0.5 + inc; x += inc) {
            const y = p.map(p.noise(x), 0.0, 1.0, 0.1, 0.2);
            p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
    },
    hangingSpot: (p, t) => {
        p.push();

        // Sky
        p.noStroke();
        p.fill(50, 150, 255);
        p.rect(-0.5, -0.5, 1.0, 1.0);

        // Forest
        drawItem.forest(p, t);

        // Birds
        const numMockingjays = 5
        for (let i = 0; i < numMockingjays; ++i) {
            const x = p.map((t + 1 + p.sin(i)) % 1, 0.0, 1.0, -0.5, 0.5);
            const y = p.map(i, 0, numMockingjays - 1, -0.3, -0.2) + 0.1 * p.cos(t * 3 + i * 10);

            p.push();
            p.translate(x, y);
            p.scale(0.2);
            drawItem.mockingjay(p, t);
            p.pop();
        }

        // Hanging post
        drawItem.hangingPost(p, t);

        p.pop();
    },
};

/*
    smoke
    explosion
    arena
    explodingArena
    snakes
    tree
    snakesOnPaper
    zoo
    mockingjay
    hangingPost
    forest
    hangingSpot
*/

const createScene = ({width, height, canvasId, canvasContainer, draw}) => {
    return new p5(p => {
        let t = 0;
        const fps = 30;
        const getTime = () => {
            return ++t / fps;
        };

        p.setup = () => {
            p.canvas = p.createCanvas(width, height);
            p.canvas.id(canvasId);
            p.canvas.parent(canvasContainer);
            p.frameRate(fps);
        };

        p.draw = () => {
            draw(p, getTime());
        };
    });
};

const itemDrawer = (item) => (p, t) => {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.scale(p.width, p.height);
    item(p, t);
};

const width = 500;
const height = 500;
const scenes = [
    {
        width,
        height,
        canvasId: 'p5-zoo',
        canvasContainer: 'p5-zoo-container',
        draw: itemDrawer(drawItem.zoo),
    },
    {
        width,
        height,
        canvasId: 'p5-snake',
        canvasContainer: 'p5-snake-container',
        draw: itemDrawer(drawItem.snakesOnPaper),
    },
    {
        width,
        height,
        canvasId: 'p5-exploding-arena',
        canvasContainer: 'p5-exploding-arena-container',
        draw: itemDrawer(drawItem.explodingArena),
    },
    {
        width,
        height,
        canvasId: 'p5-mockingjay',
        canvasContainer: 'p5-mockingjay-container',
        draw: itemDrawer(drawItem.hangingSpot),
    },
]
    .map(createScene);
