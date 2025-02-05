const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;

const road = new Road(canvas.width / 2, canvas.width * .9);
const num = 1;
const cars = [];
for (let i = 0; i < num; i++) {
    cars.push(new Car(road.getLaneCenter(0), 400, 40, 55, false));
}

let bestCar = cars[0];

if (localStorage.getItem('bestBrain')) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'));
        
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.05);
        }
        
    }
}

const save = () => {
    localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
}

const traffic = [
    new Car(road.getLaneCenter(1), 300, 40, 55, true),
    new Car(road.getLaneCenter(4), -400, 40, 55, true),
    new Car(road.getLaneCenter(0), -200, 40, 55, true),
    new Car(road.getLaneCenter(2), -500, 40, 55, true),
    new Car(road.getLaneCenter(0), -500, 40, 55, true),
    new Car(road.getLaneCenter(1), -700, 40, 55, true),
    new Car(road.getLaneCenter(4), -100, 40, 55, true),
    new Car(road.getLaneCenter(0), -300, 40, 55, true),
    new Car(road.getLaneCenter(2), -900, 40, 55, true),
    new Car(road.getLaneCenter(0), -900, 40, 55, true),
    new Car(road.getLaneCenter(1), 1000, 40, 55, true),
    new Car(road.getLaneCenter(4), -1400, 40, 55, true),
    new Car(road.getLaneCenter(0), -1200, 40, 55, true),
    new Car(road.getLaneCenter(2), -1500, 40, 55, true),
    new Car(road.getLaneCenter(0), -1500, 40, 55, true),
    new Car(road.getLaneCenter(1), -1700, 40, 55, true),
    new Car(road.getLaneCenter(4), -1100, 40, 55, true),
    new Car(road.getLaneCenter(0), -1300, 40, 55, true),
    new Car(road.getLaneCenter(2), -1900, 40, 55, true),
    new Car(road.getLaneCenter(0), -1900, 40, 55, true)
];

animate();

function animate() {

    cars.forEach(car => car.update(road.borders, traffic));
    traffic.forEach(el => el.update(road.borders, []));

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -bestCar.y + canvas.height * .7);

    road.draw(ctx);
    traffic.forEach(el => el.draw(ctx));
    cars.forEach(car => car.draw(ctx));

    bestCar = cars.find(
        car => car.y == Math.min(
            ...cars.map(c => c.y)
        )
    );

    ctx.restore();
    requestAnimationFrame(animate);
}