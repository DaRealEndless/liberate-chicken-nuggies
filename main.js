Webcam.set({
    width: 350,
    height: 350,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("Camera")

Webcam.attach('#camera');

function pic_take() {
    Webcam.snap(function (data_url) {
        document.getElementById("Result").innerHTML = '<img id="captured_img" src=' + data_url + '>';
    });
}

console.log("ml5.version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/lfv6x6YLq/model.json", modelLoaded);

function modelLoaded() {
    console.log("model_loaded");
}

function check_pic() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
        }
    else {
        console.log(results);
        document.getElementById("object_name").innerHTML=results[0].label;
        document.getElementById("accuracy").innerHTML=results[0].confidence.toFixed(2);
    }
    }