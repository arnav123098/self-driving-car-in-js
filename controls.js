class Controls {
    constructor(isTraffic) {
        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;
        if (isTraffic) {
            this.forward = true;
        } else {
            this.#keyListeners();
        }
    }

    #keyListeners() {

        document.onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.forward = true;
                    break;
                case 'ArrowDown':
                    this.reverse = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
            }
        }

        document.onkeyup = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.forward = false;
                    break;
                case 'ArrowDown':
                    this.reverse = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
            }
        }
    }
}