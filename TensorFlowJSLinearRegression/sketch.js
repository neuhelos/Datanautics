import p5 from 'p5';
import tf from ''

let xs = []
let ys = []

let m, b

const sketch = (s) => {
    
    let width = 500
    let height = 500

    s.setup = () => {
        s.createCanvas(width, height);

        m = tf.scalar(random(1))
    }

    s.mousePressed = () => {
        
        let x = s.map(s.mouseX, 0, width, 0, 1) //Normalizing x and y values with a range of 0-1
        let y = s.map(s.mouseY, 0, height, 0, 1)
        
        xs.push(x),
        ys.push(y)
    }

    s.draw = () => {
        s.background(0);
        s.stroke(255);
        s.strokeWeight(8)
        
        
        for(let i=0; i < xs.length; i++){
            let px = s.map(xs[i], 0, 1, 0, width)
            let py = s.map(ys[i], 0, 1, 0, height)
            s.point(px,py)
        }
    }




}




const sketchInstance = new p5(sketch)
