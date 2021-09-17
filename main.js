prediction_1="";
prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);
classifier=ml5.imageClassifier('https://storage.googleapis.com/tm-model/Ubrf-XLb-/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is " + prediction_1;
    speak_data_2="And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResults);
}
function gotResults(error,Results){
if(error)
{console.error(error)}
else{
    console.log(Results)
    document.getElementById("result_emotion_name").innerHTML=Results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=Results[1].label;
prediction_1=Results[0].label;
prediction_2=Results[1].label;
speak();
if(Results[0].label=="amazing"){
    document.getElementById("update_emoji").innerHTML="&#128076;";

}
if(Results[0].label=="victory"){
    document.getElementById("update_emoji").innerHTML="&#9996;";

}
if(Results[0].label=="best"){
    document.getElementById("update_emoji").innerHTML="&#128077;";

}
if(Results[0].label=="amazing"){
    document.getElementById("update_emoji2").innerHTML="&#128076;";

}
if(Results[0].label=="victory"){
    document.getElementById("update_emoji2").innerHTML="&#9996;";

}
if(Results[0].label=="best"){
    document.getElementById("update_emoji2").innerHTML="&#128077;";

}
}
}