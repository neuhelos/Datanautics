import p5 from 'p5';
import { scalar, tensor1d, train, variable } from '@tensorflow/tfjs'

let xs = []
let ys = []

let m, b

const sketch = (s) => {
    
    let width = 500
    let height = 500

    s.setup = () => {
        s.createCanvas(width, height);
        
        m = variable(scalar(s.random(1)))
        b = variable(scalar(s.random(1)))

    }

    s.mousePressed = () => {
        
        let x = s.map(s.mouseX, 0, width, 0, 1) //Normalizing x and y values with a range of 0-1
        let y = s.map(s.mouseY, 0, height, 0, 1)
        
        xs.push(x),
        ys.push(y)
    }

    s.draw = () => {
        
        optimizer.minimize(() => loss(f(xs), ys));
        
        s.background(0);
        s.stroke(255);
        s.strokeWeight(8)
        
        for(let i=0; i < xs.length; i++){
            let px = s.map(xs[i], 0, 1, 0, width)
            let py = s.map(ys[i], 0, 1, 0, height)
            s.point(px,py)
        }
    }
    
    
    const learningRate = 0.2;
    const optimizer = train.sgd(learningRate);

    const loss = (pred, labels) => {
        //pred.sub(label).square().mean();
        //pred - predictions from predict function - tensors
        //labels - actual y values
        return pred.sub(labels).squared().mean

    }

    const predict = (x) => {

        const xs = tensor1d(x) //turn xs array into tensor
        //y = mx + b
        const ys = tfxs.mul(m).add(b)
    
        return ys
    }

    //stochastic gradient descent optimizer - adjusting m and b to minimize loss function



}




const sketchInstance = new p5(sketch)
