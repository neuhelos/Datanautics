import p5 from 'p5'

let xs = []
let ys = []

const sketch = (s) => {
    s.setup = () => {
        s.createCanvas(400, 400);
    }

    s.draw = () => {
        s.background(0);
    }
}

const mousePressed = () => {


}


const sketchInstance = new p5(sketch)
