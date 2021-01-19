import p5 from 'p5';

let xs = []
let ys = []

const sketch = (s) => {
    
    let width = 500
    let height = 500
    s.setup = () => {
        s.createCanvas(width, height);
    }

    s.draw = () => {
        s.background(0);
    }

    s.mousePressed = () => {
        
        let x = s.map(s.mouseX, 0, width, 0, 1) //Normalizing x and y values with a range of 0-1
        let y = s.map(s.mouseY, 0, height, 0, 1)
        
        xs.push(x),
        ys.push(y)
    }




}




const sketchInstance = new p5(sketch)
