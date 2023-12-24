var sound1;
var analyzer;

function preload() {
  sound1 = loadSound("每天慢慢地散步和放鬆-Main-version.mp3");
}

var face_color="edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a) //臉顏色亂碼
var eye_color="93a3b1-7c898b-636564-4c443c-322214".split("-").map(a=>"#"+a)  //眼睛顏色亂碼
var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_y=[] //移動速度
var v_x=[]
var txts //宣告一個變數
var face_move_var = false //臉物件移動條件，如果為true，臉物件移動，如果false就不會移動
//語音辨識的初始設定
var lang = navigator.language  //取得瀏覽器的語系
var myRec = new p5.SpeechRec(lang)

function setup() {
createCanvas(windowWidth, windowHeight);
analyzer = new p5.Amplitude();
analyzer.setInput(sound1);
//文字框設定
inputElement = createInput("😎") //產生一個文字方塊，""內的文字為預設顯示的文字
inputElement.position(10,10) //文字方塊放到(10,10)
inputElement.size(170,33) //文字框的寬與高
//以下的style,可以google搜尋htmml imput css找到資料
inputElement.style("font-size","20px") //文字框內的文字大小
inputElement.style("color","#1d3557") //文字框內的文字顏色
inputElement.style("background","#f1faee") //文字框內的背景顏色
//inputElement.style("border","none") //設定文字框沒有框線
//按鈕的設定
btnStopElement = createButton("移動")
btnStopElement.position(200,10) //按鈕的位置
btnStopElement.size(80,40) //按鈕的寬與高
btnStopElement.size("font-size","20px")
btnStopElement.size("color","#fff") //按鈕內的文字與顏色
btnStopElement.size("background","#ade8f4")
btnStopElement.mousePressed(face_move) //移動按鈕被按下後會執行face_move函數

//"暫停"按鈕的設定
btnPauseElement = createButton("暫停")
btnPauseElement.position(300,10) //按鈕的位置
btnPauseElement.size(80,40)
btnPauseElement.size("font-size","20px") //按鈕的寬與高
btnPauseElement.size("color","#fff") //按鈕內的文字與顏色
btnPauseElement.size("background","#ade8f4")
btnPauseElement.mousePressed(face_stop) //暫停按鈕被按下後會執行face_stop函數

//"語音"按鈕的設定
btnVoiceElement = createButton("語音")
btnVoiceElement.position(400,10) //按鈕的位置
btnVoiceElement.size(80,40)
btnVoiceElement.size("font-size","20px") //按鈕的寬與高
btnVoiceElement.size("color","#fff") //按鈕內的文字與顏色
btnVoiceElement.mousePressed(voice_go) //暫停按鈕被按下後會執行voice_go函數
//radio選紐的設定，多個選項，只能選一個（單選組）
radioElement=createRadio()
radioElement.option("移動")
radioElement.option("旋轉")
radioElement.option("暫停")
radioElement.position(500,10) //選紐的位置
radioElement.size(180,40) //選紐的寬與高
radioElement.style("width","180px")
radioElement.style("color","#1d3557")
radioElement.style("background","#f1faee")
sound1.play();
}
function draw(){
  background("#457b9d")
  var volume = analyzer.getLevel();
  var mappedSize = map(volume, 0, 1, 0.3, 2);

  let mode = radioElement.value()
for(var i=0;i<pos_x.length;i=i+1) //依照pos_X內有幾筆資料，就會產生幾個物件
{
  push()
   txts = inputElement.value(); //把文字框的文字內容，
    translate(pos_x[i],pos_y[i])
    if(mode =="旋轉"){
      rotate(sin(frameCount/10*v_y[i])) //如果旋轉的角度一正一負，物件才會左右搖擺
    }
    drawface(colors[i],0,sizes[i])
  pop()

  if(face_move_var || mode == "移動"){  //在face_move_var為true時，臉物件會移動
    pos_y[i] =pos_y[i]+v_y[i] //物件移動的指令
   }
  }
if(pos_y[i]>height || pos_y[i]<0){
  pos_x.splice(i,1) //把碰到邊的陣列元素刪掉
  pos_y.splice(i,1)
  sizes.splice(i,1)
  colors.splice(i,1)
  v_y.splice(i,1)
 }
}
function drawface(face_clr=255, eye_clr=0, size=1) {
  push(); // 開始自行設定格式

  //translate(random(width), random(height))
  scale(size); // 宣告放大縮小的比例尺

  // 痞老闆外框
  fill("#5a8365");
  noStroke();
  ellipse(150, 200, 150, 300);

  // 大眼睛
  fill("#dce4b9");
  ellipse(150, 150, 75, 100);
  // 小眼睛
  fill("#aa371c");
  ellipse(150, 150, 25, 25);

  // 觸鬚
  fill("#283618")
  line(150, 50, -50, -100);
  line(150, 50, 250, -100);

  // 嘴巴
  fill("#aa371c");
  noStroke();
  arc(150, 250, 100, 75, 0, PI);
  noFill();
  arc(150, 250, 100, 5, 0, PI);

  // 牙齒
  fill(255);
  rect(150, 252, 15);
  rect(135, 252, 15);

  pop(); // 結束自行設定格式

  push(); // 開始新的自行設定格式

  // 文字框的顯示格式
  fill("#f5ebe0"); // 設定文字的顏色
  textSize(50); // 文字大小
  text(txts, 350, 400); // 顯示文字，文字內容為 txts，放在位置座標為 (-100, 250)

  pop(); // 結束新的自行設定格式
}


function mousePressed(){ 
  if(mouseY>50){
  pos_x.push(mouseX)
  pos_y.push(mouseY)
  sizes.push(random(0.3,1))
  colors.push(face_color[int(random(face_color.length))])
  v_y.push(random(-1,1))
  sound1.play(); // 在這裡播放音樂
  }
  //v_x.push(random(1,-1))
}

function face_move(){
  face_move_var = true
}
function face_move(){
  face_move_var = true
}

function face_stop() {
  face_stop_var = false;
}

function voice_go(){
 myRec.onResult = showResult //取得語音辨識後去執行function showResult 
 myRec.start() //開始辨識
}
function showResult(){
  if(myRec.resultValue == true)
  {
    print(myRec.resultString)
    if(myRec.resultString.indexOf("走") !== -1){
      face_move_var = true
    }
    if(myRec.resultString.indexOf("停") !== -1){
      face_move_var = false
    }
    if(myRec.resultString.indexOf("轉") !== -1){
      face_move_var = true 
    }
  }
}
