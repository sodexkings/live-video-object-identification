img = ""
status = ""
object = []
function preload()
{
img = loadImage('people.jpg')
}

function setup()
{
  canvas = createCanvas(380,380)
  canvas.center()
  video = createCapture(VIDEO)
  video.size(380,380)
  video.hide()
 
}

function draw()
{
    image(video,0,0,380,380)
    
  if(status  != "")
  {
    r = random(255)
    g = random(255)
    b = random(255)
    objectDetector.detect(video ,gotResult)
    for(i = 0; i < object.length ;i++)
    {
      document.getElementById("status").innerHTML = 'status:Object Deducted'
      document.getElementById("number_of_objects").innerHTML = 'Number of objects detected are :'+object.length
      fill(r,g,b);
      percent = floor(object[i].confidence * 100);
      text(object[i].label + "" + percent + "%",object[i].x + 15,object[i].y +15)
noFill()
stroke(r,g,b)
rect(object[i].x,object[i].y,object[i].width,object[i].height)
    }
  }
    
}

function modelLoaded()
{
  console.log('Model  Loaded!')
  status = 'true'

}

function gotResult(error,results)
{

console.log(results)
 object = results
}
function start()
{
   objectDetector = ml5.objectDetector('cocossd', modelLoaded)
document.getElementById('status').innerHTML = 'status: Detecting Objects'
}