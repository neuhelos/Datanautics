import p5 from 'p5';
import { memory, scalar, tensor1d, tidy, train, variable } from '@tensorflow/tfjs'

let x_vals = []
let y_vals = []

let m, b

const learningRate = 0.5;
const optimizer = train.sgd(learningRate);

const loss = (pred, labels) => {
    //pred.sub(label).square().mean();
    //pred - predictions from predict function - tensors
    //labels - actual y values
    return pred.sub(labels).square().mean()

}

const predict = (x) => {

    const txs = tensor1d(x) //turn xs array into tensor
    //y = mx + b
    const tys = txs.mul(m).add(b)

    return tys //returns tensor
}

//stochastic gradient descent optimizer - adjusting m and b to minimize loss function

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
        
        x_vals.push(x),
        y_vals.push(y)
    }

    s.draw = () => {
        
        
        s.background(0);
        s.stroke(255);
        s.strokeWeight(8)
        
        for(let i=0; i < x_vals.length; i++){
            let px = s.map(x_vals[i], 0, 1, 0, width)
            let py = s.map(y_vals[i], 0, 1, 0, height)
            s.point(px,py)
        }
        
        tidy(() => {
            if(x_vals.length > 0 ) {
                const tys = tensor1d(y_vals)
                optimizer.minimize( () => loss(predict(x_vals), tys))
            }
        })
    
        const lineX = [0, 1]
        const ys = predict(lineX)

        let x1 = s.map(lineX[0], 0, 1, 0, width)
        let x2 = s.map(lineX[1], 0, 1, 0, width)
        
        let lineY = ys.dataSync()

        let y1 = s.map(lineY[0], 0, 1, height, 0)
        let y2 = s.map(lineY[1], 0, 1, height, 0)

        s.line(x1, y1, x2, y2)
        ys.dispose()

        //console.log(memory().numTensors)

    }
}

const sketchInstance = new p5(sketch)
