song = "";

function preload() {
    song = loadSound("music.mp3")
}

scoreRightWrist = 0;
scoreleftWrist = 0;

rightWrightX = 0;
rightwrighty = 0;

leftWrightX = 0;
leftwrightY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    veio = createCapture(VIDEO);
    vedio.hide();

    poseNet = ml5.poseNet(vedio, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialize');
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    Stroke("#FF0000");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
    }

    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);


    } else if (rightWristY > 100 && rightWristY < 200) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY < 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY < 400) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY < 400) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(0.5);
    }

}

if (scoreLetfWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    new_leftWristY = floor(InNumberleftWristY * 2);
    leftWristY_divide_1000 = new_leftWristY / 1000;
    document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;
    song.setVolume(leftWristY_divide_1000);
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}