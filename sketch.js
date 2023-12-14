
  // Global variable to store the classifier
let classifier;

let state01 = 0; // 0: 대기상황 1: 소리듣는중 2: state02 로 넘어가서 alert 하기

let state02 = 0; //  0: 소리없는 상황 1: 화재경보 2: 세탁기 알림 3: 노크소리 4: 경비실 알림 5:경비실 방송

let timer=0;



// Label
let label = 'listening...';

// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/gdKVl8N4I/';



let bearing_eye; // 눈
let fire_alram; //화재경보
let ssiren; //사이렌아이콘
let knockknock;//노크소리
let doors;//노크 아이콘
let laundry_alram; //세탁기 알람
let laundry_gif;//세탁기 아이콘
let dingdong; // 소리 듣는 중
let announce; //경비실 안내방송 


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
  
}

function setup() {
  createCanvas(854,384);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
  
  
  //이미지 불러오기 
  bearing_eye = loadImage("asset/eye.gif");           
  //화재
  fire_alram = loadImage("asset/fire.gif");
  //사이렌 아이콘
  ssiren= loadImage("asset/siren.gif");

  knockknock= loadImage("asset/knock.gif");   

  //문 아이콘
  doors = loadImage("asset/door.gif");
  //세탁 완료 
  laundry_alram = loadImage("asset/laudry.png");
  //세탁기 아이콘
  laundry_gif =loadImage("asset/세탁기.gif");
  //소리 듣는 중 
  dingdong = loadImage("asset/listen.gif");
  //안내방송
  announce = loadImage("asset/live.gif");
  
}
  
  
  



function draw() {
    
 checkSound();

  if(state01 == 0){ //대기상황
   image(bearing_eye,0,0);}
  
  else if(state01 == 1){ //듣는중
   image(dingdong,0,0);
  }
  else if(state01 == 2)
  { //Sound alert
    // 0: 소리없는 상황 1: 화재경보 2: 세탁기 알림 3: 노크소리 4: 경비실 알림 5: 경비실 방송
    if(state02 == 1){
     image(fire_alram,0,0);
      image(ssiren,215,80,80,80);
    }
    
    else if(state02 == 2){
     image(laundry_alram,0,0,854,386);
     image(laundry_gif,460,87,100,100);
    }
    else if(state02 == 3){
     image(knockknock,0,0);
     image(doors,215,90,100,100);
    }
    else if(state02 == 4){
     image(dingdong,0,0);
    }
    else if(state02 == 5){
     image(announce,0,0,854,386);
      
    }
  }
  
  }



function checkSound() { // 이름은 체크하세요.
  if(label == '배경 소음'){
    state01 = 0;
  }else if(label == 'Fire'){
    if(state01 == 0){
      state01 = 1;
      timer = millis(); //1초동안 소리듣는중 
    }else if(state01 == 1 && (millis() - timer) > 1000 ){
      state01 = 2;
      state02 = 1; //1초가 지나면 화재 화면으로 
    }
  }else if(label == 'Laundry'){
    if(state01 == 0){
      state01 = 1;
      timer = millis();
    }else if(state01 == 1 && (millis() - timer) > 1000 ){
      state01 = 2;
      state02 = 2;
    }
  }else if(label == 'Knock'){
    if(state01 == 0){
      state01 = 1;
      timer = millis();
    }else if(state01 == 1 && (millis() - timer) > 1000 ){
      state01 = 2;
      state02 = 3;
    }
  }else if(label == 'DingDang'){
    if(state01 == 0){
      state01 = 1;
      timer = millis();
    }/*else if(state01 == 1 && (millis() - timer) > 2000 ){
      state01 = 2;
      state02 = 4;
    }*/
  }else if(state01 == 1 && (millis() - timer) > 2000){
    state01 = 2;
    state02 = 5;
  }
  /*
    else if(label == 'Live'){
    if(state01 == 0){
      state01 = 2;
      state02 = 5;
      //print(state02);
      data=1;
    }
    }
    */
}



// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}

