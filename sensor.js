class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 6;
        this.rayLength = 100;
        this.raySpread = Math.PI / 2;

        this.rays = [];
        this.readings = [];
    }

    update(roadBorders, traffic) {
        this.#castRays();
        this.readings = [];

        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.#getReading(this.rays[i], roadBorders, traffic)
            );
        }
    }

    #getReading(ray, roadBorders, traffic) {
        let touches = [];

        for (let i = 0; i < roadBorders.length; i++) {
            const roadBorder = roadBorders[i];
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorder[0],
                roadBorder[1]
            );
            
            if (touch) {
                touches.push(touch);
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            const trafficPoly = traffic[i].polygon;
            for (let j = 0; j < trafficPoly.length; j++) {
                const touch = getIntersection(
                    ray[0],
                    ray[1],
                    trafficPoly[j],
                    trafficPoly[(j + 1) % trafficPoly.length]
                );

                if (touch) {
                    touches.push(touch);
                }
            }
        }

        if (touches.length == 0) {
            return null;
        } else {
            const offsets = touches.map(touch => touch.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(touch => touch.offset == minOffset);
        }
    }

    #castRays() {
        this.rays = [];

        for(let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount == 1 ? .5 : i / (this.rayCount - 1)
            ) + this.car.angle;

            const start = {
                x: this.car.x,
                y: this.car.y
            };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            }

            this.rays.push([start, end]);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.rayCount; i++) {

            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }

            // drawing the ray
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'yellow';
            ctx.beginPath();
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.stroke();

            // drawing the reading
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}