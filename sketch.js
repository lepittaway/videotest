//Set up scene, camera, and renderer
var scene = new THREE.Scene;
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 3;

controls = new THREE.OrbitControls( camera );

var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( new THREE.Color('lightgrey'), 1 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
                
var video = document.createElement('video');
    video.src = "src/videos/sintel.mp4";
    video.load();
    video.play();

//make your video canvas
var videocanvas = document.createElement('canvas');
var videocanvasctx = videocanvas.getContext('2d');

//set its size
videocanvas.width = 640;
videocanvas.height = 480;
var screenWidth = 2;
var screenHeight = 1.1;
//draw a black rectangle so that your spheres don't start out transparent
videocanvasctx.fillStyle = "#000000";
videocanvasctx.fillRect(screenWidth/2, screenHeight/2, 640,480);

//add canvas to new texture
var spheretexture = new THREE.Texture(videocanvas);

//add texture to material that will be wrapped around the sphere
var material = new THREE.MeshBasicMaterial( { map: spheretexture } );


//Use whatever values you were using for the sizes of the spheres before
//var sphere = new THREE.SphereGeometry(0.3, 0.3, 0.3);

var geometry = new THREE.CubeGeometry(2,1.1,0.01);

//make a mesh from the material and the geometry (the sphere)
var sphereMesh = new THREE.Mesh(geometry, material);
scene.add( sphereMesh );
//Run your render function, checking the video for data and writing it to the canvas if there is any (this assumes you already have your video on the page and its element saved to the variable 'video'

function render(){
    //check for vid data
    if(video.readyState === video.HAVE_ENOUGH_DATA){
      //draw video to canvas starting from upper left corner
      videocanvasctx.drawImage(video, screenWidth/2, screenHeight/2);
      //tell texture object it needs to be updated
      spheretexture.needsUpdate = true;
    }
      renderer.render(scene, camera); //Same as how you always render a 3js scene
      
      window.requestAnimationFrame(render); //When finished rendering, ask to render again on the next frame
}

window.requestAnimationFrame(render); //Start render loop