leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
song = "";

boy_with_luv_song="";
seven_song="";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Model is Initialized!!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

    }
}

function preload(){
    boy_with_luv_song = loadSound("music1.mp3");
    seven_song = loadSound("music2.mp3");
}

function draw(){
    image(video,0,0,600,530);
    fill("#FF0000");
    stroke("#FFFF00");
    
    song = boy_with_luv_song.isPlaying();
    console.log(song);

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        seven_song.stop();
        if(song == false)
        {
            boy_with_luv_song.play();
        }
        else
        {
            console.log("Song Name: Boy With Luv");
            document.getElementById("song_name").innerHTML = "Song Name: Boy With Luv"
        }
    }
}
