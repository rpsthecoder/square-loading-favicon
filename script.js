onload = ()=> {
    canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d');
    if (!!context) {
        button = document.querySelector('button'),
        favicon = document.querySelector('link[rel*="icon"]');
        /* Style of the lines of the square that'll be drawn */
        let gradient = context.createLinearGradient(0, 0, 32, 32);
        gradient.addColorStop(0, '#c7f0fe');
        gradient.addColorStop(1, '#56d3c9');
        context.strokeStyle = gradient;
        context.lineWidth = 8;
        // Enable the disabled button on page refresh (it's disabled when drawing is done)
        if(button.disabled) button.removeAttribute('disabled');
        button.addEventListener('click', function() { 
            /* A variable to track the drawing increments */
            n = 0, 
            /* Interval speed for the animation */
            loadingInterval = setInterval(drawLoader, 60); 
            /* Style of the button when the loader is being drawn */
            this.textContent = 'Loading...';
            this.style.backgroundColor = '#56d3c9';
            this.setAttribute('disabled','');
        });
    }
};
/* This function, incrementally, draws a square in canvas and transforms it to a favicon */
function drawLoader() {
    with(context) {
        clearRect(0, 0, 32, 32);
        beginPath();
        /* Upto 25% of the time assigned to draw */
        if (n<=25){ 
            /*
                (0,0)-----(32,0)
            */
            moveTo(0, 0); lineTo((32/25)*n, 0);
        }
        /* Between 25 to 50 percent */
        else if(n>25 && n<=50){ 
            /*
                (0,0)-----(32,0)
                          |
                          |
                          (32,32)
            */
            moveTo(0, 0); lineTo(32, 0);
            moveTo(32, 0); lineTo(32, (32/25)*(n-25));
        }
        /* Between 50 to 75 percent */
        else if(n>50 && n<= 75){ 
            /*
                (0,0)-----(32,0)
                          |
                          |
                (0,32)----(32,32)
            */
            moveTo(0, 0); lineTo(32, 0);
            moveTo(32, 0); lineTo(32, 32);
            moveTo(32, 32); lineTo(-((32/25)*(n-75)), 32);
        }
         /* Between 75 to 100 percent */
        else if(n>75 && n<=100){
           /*
                (0,0)-----(32,0)
                   |      |
                   |      |
               (0,32)----(32,32)
            */
            moveTo(0, 0); lineTo(32, 0);
            moveTo(32, 0); lineTo(32, 32);
            moveTo(32, 32); lineTo(0, 32);
            moveTo(0, 32); lineTo(0, -((32/25)*(n-100)));
        }
        stroke();
    }
    // Convert the Canvas drawing to PNG and assign it to the favicon
    favicon.href = canvas.toDataURL('image/png');
    /* When finished drawing */
    if (n === 100) {
        clearInterval(loadingInterval);
        button.textContent = 'Loaded';
        button.style.backgroundColor = '#aaa';
        return;
    }
    // Increment the variable used to keep track of drawing intervals
    n++;
}
