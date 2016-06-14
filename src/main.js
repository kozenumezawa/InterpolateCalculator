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
      for(var t = 0; t < 20; t = t + 6){
        var vv0 = coordData.getCoord(connectData.data[t + 0]);
        var vv1 = coordData.getCoord(connectData.data[t + 1]);
        var vv2 = coordData.getCoord(connectData.data[t + 2]);
        var vv3 = coordData.getCoord(connectData.data[t + 3]);
        var vv4 = coordData.getCoord(connectData.data[t + 4]);
        var vv5 = coordData.getCoord(connectData.data[t + 5]);
        drawPrism(vv0, vv1, vv2, vv3, vv4, vv5);
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
  geometry.vertices.push(new THREE.Vector3(v4[0], v4[1], v4[2]));
  geometry.vertices.push(new THREE.Vector3(v5[0], v5[1], v5[2]));
  var material = new THREE.LineBasicMaterial({color: 0xFFFFFF});
  var line = new THREE.Line(geometry, material);
  scene.add(line);
}


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
var controls = new THREE.OrbitControls(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 400);

document.getElementById('output').appendChild(renderer.domElement);

render();


function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}

