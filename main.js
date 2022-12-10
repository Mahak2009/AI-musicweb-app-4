song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x-60;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + ", Right Wrist Y = " + rightWristY);
        console.log("Left Wrist X = " + leftWristX + ", Left Wrist Y = " + leftWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}

function setup()
{
    canvas = createCanvas(550, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Model is Loaded");
}

function draw()
{
    image(video, 0, 0, 550, 450);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("orange");
    stroke("black");
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 25);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing The Peter Pan Song";
        }
    }
}