//calculateボタンが押されたときの処理
function getBinFile() {
  var coordData = new DataFile('coordFiles');
  var valueData = new DataFile('valueFiles');
  var connectData = new DataFile('connectFiles');

  coordData.setFileType('Float');
  valueData.setFileType('Float');
  connectData.setFileType('Uint');
  
  coordData.getData();
  valueData.getData();
  connectData.getData();

  var timer;
  var checkData = function(){
    if(coordData.dataFlag == true && valueData.dataFlag == true && connectData.dataFlag == true){
      //データ所得後の処理
      console.log('start drawing');
      for(var t = 0; t < 1000000; t = t + 6){
        var vv0 = coordData.getCoord(connectData.data[t + 0]);
        var vv1 = coordData.getCoord(connectData.data[t + 1]);
        var vv2 = coordData.getCoord(connectData.data[t + 2]);
        var vv3 = coordData.getCoord(connectData.data[t + 3]);
        var vv4 = coordData.getCoord(connectData.data[t + 4]);
        var vv5 = coordData.getCoord(connectData.data[t + 5]);

        var ss0 = valueData.data[connectData.data[t + 0]];
        var ss1 = valueData.data[connectData.data[t + 1]];
        var ss2 = valueData.data[connectData.data[t + 2]];
        var ss3 = valueData.data[connectData.data[t + 3]];
        var ss4 = valueData.data[connectData.data[t + 4]];
        var ss5 = valueData.data[connectData.data[t + 5]];
        
        var prism = new prismCell(vv0, vv1, vv2, vv3, vv4, vv5,
          ss0, ss1, ss2, ss3, ss4, ss5);
        // drawPrism(vv0, vv1, vv2, vv3, vv4, vv5);
      }
      camera.position.x = coordData.data[0];
      camera.position.y = coordData.data[1];
      camera.position.z = coordData.data[2];
      console.log('finish drawing');
      clearInterval(timer);
    }
  }

  timer = setInterval(checkData, 500);  //500ミリ秒毎に読み込みが終わったか確認
}

function drawPrism(v0, v1, v2, v3, v4, v5){
  var geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(v0[0], v0[1], v0[2]));
  geometry.vertices.push(new THREE.Vector3(v1[0], v1[1], v1[2]));
  geometry.vertices.push(new THREE.Vector3(v2[0], v2[1], v2[2]));
  geometry.vertices.push(new THREE.Vector3(v3[0], v3[1], v3[2]));
  // geometry.vertices.push(new THREE.Vector3(v4[0], v4[1], v4[2]));
  // geometry.vertices.push(new THREE.Vector3(v5[0], v5[1], v5[2]));

  var material = new THREE.LineBasicMaterial({color: 0xFFFFFF});
  var line = new THREE.Line(geometry, material);
  scene.add(line);
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
var controls = new THREE.OrbitControls(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 400);

document.getElementById('output').appendChild(renderer.domElement);

render();


//test value
var testv0 = [14.162066459655762, 17.28990364074707, 0.13279689848423004];
var testv1 = [14.026290893554688, 17.400737762451172, 0];
var testv2 = [14.181086540222168, 17.274816513061523, 0];
var testv3 = [14.168360710144043, 17.297574996948242, 0.1328529268503189];
var testv4 = [14.032523155212402, 17.40846061706543, 0.000007705200914642774];
var testv5 = [14.187387466430664, 17.282487869262695, -0.00000669671680952888];
var tests0 = 1.7021111249923706;
var tests1 = 2.054548978805542;
var tests2 = 2.3084678649902344;
var tests3 = 5.478623390197754;
var tests4 = 6.5422868728637695;
var tests5 = 7.609892845153809;

var prism1 = new prismCell(testv0, testv1, testv2, testv3, testv4, testv5,
  tests0, tests1, tests2, tests3, tests4, tests5);

var test1v0 = [14.5563325881958, 16.959299087524414, 0.13346345722675323];
var test1v1 = [14.638373374938965, 16.889066696166992, 0];
var test1v2 = [14.720490455627441, 16.816980361938477, 0.13713061809539795];
var test1v3 = [14.562799453735352, 16.966827392578125, 0.13352735340595245];
var test1v4 = [14.644874572753906, 16.896560668945312, -0.0000037786483062518528];
var test1v5 = [14.727031707763672, 16.82444190979004, 0.13719303905963898];
var test1s0 = 1.7021111249923706;
var test1s1 = 2.054548978805542;
var test1s2 = 2.3084678649902344;
var test1s3 = 5.478623390197754;
var test1s4 = 6.5422868728637695;
var test1s5 = 7.609892845153809;


var prism2 = new prismCell(test1v0, test1v1, test1v2, test1v3, test1v4, test1v5,
  test1s0, test1s1, test1s2, test1s3, test1s4, test1s5);
console.log(prism2.V);
console.log(prism2.volume);
// drawPrism(testv0, testv1, testv2, testv3, testv4, testv5);
drawPrism(test1v0, test1v1, test1v2, test1v3, test1v4, test1v5);


camera.position.x = test1v0[0];
camera.position.y = test1v0[1]+ 0.4;
camera.position.z = test1v0[2]+ 0.2;
camera.lookAt({x:test1v0[0], y:test1v0[1], z:test1v0[2]});


function render() {
  requestAnimationFrame(render);
  // controls.update();
  renderer.render(scene, camera);
}

