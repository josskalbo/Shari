document.addEventListener('DOMContentLoaded', () => {
    // Function to show the second display
    function showSecondDisplay() {
        // Hide the first display
        document.getElementById('firstDisplay').style.display = 'none';

        // Hide the "Turn on the lights" button
        document.getElementById('turnOnLightsButton').style.display = 'none';

        // Show the second display
        document.getElementById('secondDisplay').style.display = 'block';

        // Start the balloons and image animation
        startAnimation();

        // Play the background music
        const audio = document.getElementById('birthdayAudio');
        audio.play();
    }

    function startAnimation() {
        const canvas = document.getElementById('balloonCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const balloons = [];
        const colors = ['#ff4d4d', '#ffcc00', '#66ff66', '#66b3ff', '#ff99ff'];

        function createBalloon() {
            const radius = 20 + Math.random() * 20;
            return {
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * canvas.height,
                width: radius,
                height: radius * 1.3, // Adjusted to make the balloon slightly oblong
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: 1 + Math.random() * 3,
                stringLength: 50 + Math.random() * 50 // Random length for the string
            };
        }

        for (let i = 0; i < 30; i++) {
            balloons.push(createBalloon());
        }

        function drawBalloon(balloon) {
            // Draw the balloon as an ellipse
            ctx.beginPath();
            ctx.ellipse(balloon.x, balloon.y, balloon.width, balloon.height, 0, 0, 2 * Math.PI);
            ctx.fillStyle = balloon.color;
            ctx.fill();

            // Draw the string
            ctx.beginPath();
            ctx.moveTo(balloon.x, balloon.y + balloon.height);
            ctx.lineTo(balloon.x, balloon.y + balloon.height + balloon.stringLength);
            ctx.strokeStyle = '#ffffff'; // White color for the string
            ctx.lineWidth = 2; // Thickness of the string
            ctx.stroke();
        }

        const image = document.getElementById('happyBirthdayImage');
        const imageWidth = 700; // Adjust as needed
        const imageHeight = 700; // Adjust
        const imageX = (canvas.width - imageWidth) / 2;
        const imageY = (canvas.height - imageHeight) / 2;

        function drawImage() {
            ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw and animate balloons
            balloons.forEach((balloon, index) => {
                drawBalloon(balloon);

                balloon.y -= balloon.speed;

                if (balloon.y + balloon.height < 0) {
                    balloons[index] = createBalloon();
                    balloons[index].y = canvas.height + balloons[index].height;
                }
            });

            // Draw the image in the middle
            drawImage();

            requestAnimationFrame(animate);
        }

        animate();
    }

    function showThirdDisplay() {
        // Hide the second display
        document.getElementById('secondDisplay').style.display = 'none';

        // Stop the background music
        const audio = document.getElementById('birthdayAudio');
        audio.pause();
        audio.currentTime = 0;

        // Show the third display
        const thirdDisplay = document.getElementById('thirdDisplay');
        thirdDisplay.style.display = 'flex'; // Change display to flex
        thirdDisplay.style.alignItems = 'center'; // Vertically center
        thirdDisplay.style.justifyContent = 'center'; // Horizontally center

        // Clear existing content (if any)
        thirdDisplay.innerHTML = '';

        // Create and append the birthday cake image
        const cakeImage = document.createElement('img');
        cakeImage.src = 'birthday_cake.png'; // Assuming the path to your birthday cake image
        cakeImage.alt = 'Birthday Cake';

        // Adjust size of the cake image
        cakeImage.style.width = '500px'; // Adjust width as needed
        cakeImage.style.height = '500px'; // Adjust height as needed
        cakeImage.style.objectFit = 'contain'; // Maintain aspect ratio

        
        thirdDisplay.appendChild(cakeImage);

        // Create audio element for cake song
        const cakeAudio = document.createElement('audio');
        cakeAudio.src = 'cake_song.mp3'; // Path to your cake song audio file
        cakeAudio.autoplay = true; // Autoplay audio
        cakeAudio.loop = true; // Loop audio

        // Append audio element to third display
        thirdDisplay.appendChild(cakeAudio);

        // Start the confetti animation
        startConfettiAnimation(); // Ensure this function call is present
    }

    function startConfettiAnimation() {
        const canvas = document.getElementById('confettiCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confetti = [];
        const colors = ['#ff4d4d', '#ffcc00', '#66ff66', '#66b3ff', '#ff99ff'];

        function createConfettiPiece() {
            return {
                x: Math.random() * canvas.width,
                y: -Math.random() * canvas.height,
                width: 10 + Math.random() * 10,
                height: 10 + Math.random() * 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: 2 + Math.random() * 3,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 5
            };
        }

        for (let i = 0; i < 100; i++) {
            confetti.push(createConfettiPiece());
        }

        function drawConfettiPiece(confettiPiece) {
            ctx.save();
            ctx.translate(confettiPiece.x + confettiPiece.width / 2, confettiPiece.y + confettiPiece.height / 2);
            ctx.rotate((confettiPiece.rotation * Math.PI) / 180);
            ctx.fillStyle = confettiPiece.color;
            ctx.fillRect(-confettiPiece.width / 2, -confettiPiece.height / 2, confettiPiece.width, confettiPiece.height);
            ctx.restore();
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach((confettiPiece, index) => {
                drawConfettiPiece(confettiPiece);

                confettiPiece.y += confettiPiece.speed;
                confettiPiece.rotation += confettiPiece.rotationSpeed;

                if (confettiPiece.y - confettiPiece.height > canvas.height) {
                    confetti[index] = createConfettiPiece();
                    confetti[index].y = -confetti[index].height;
                }
            });

            requestAnimationFrame(animateConfetti);
        }

        animateConfetti();
    }

    // Add event listener for the cake button
    document.getElementById('cakeButton').addEventListener('click', showThirdDisplay);

    // Add event listener for the "Turn on the lights" button
    document.getElementById('turnOnLightsButton').addEventListener('click', showSecondDisplay);
});
