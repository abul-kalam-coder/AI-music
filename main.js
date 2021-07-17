    sound_1="Naruto_bgm-1.mp3";
    sound_2="End.mp3";
    left_y=0;
    left_x=0;
    right_x=0;
    right_y=0;
score_left=0;
score_right=0;
    function preload(){
    sound_1=loadSound("Naruto-bgm-1.mp3");
    sound_2=loadSound("end.mp3")
    }
    function setup(){
    canvas=createCanvas(700,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
   }
   function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left=results[0].pose.keypoints[9].score;
        score_right=results[0].pose.keypoints[10].score;
        console.log("score = "+score_left);
        left_x=results[0].pose.leftWrist.x;
        left_y=results[0].pose.leftWrist.y;
        right_x=results[0].pose.rightWrist.x;
        right_y=results[0].pose.rightWrist.y;
        console.log("right_x = "+right_x+"right_y = "+ right_y+"left_x = "+left_x+"left_y = "+left_y);
    }
}

   function modelLoaded(){
    console.log("model loaded")
}
  
    function play_sound(){
if(score_left>0.2 ){
    if(sound_2.isPlaying()==true){
        sound_2.stop();
    }
    sound_1.play();
    console.log("left");

    }
console.log(left_y);
}
    function draw(){
        image(video,0,0,700,500);
        fill("red");
        stroke("red");
        if(score_left>0.2){
            circle(left_x,left_y,20);
        }
    }