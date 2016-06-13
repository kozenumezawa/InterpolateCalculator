function getBinFile() {
  var coordData = new DataFile('coordFiles');
  var valueData = new DataFile('valueFiles');
  var connectData = new DataFile('connectFiles');

  coordData.getData();
  valueData.getData();
  connectData.getData();
}



(function() {


  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
  var controls = new THREE.OrbitControls(camera);

  camera.position.z = 70;

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(400, 400);

  document.getElementById('output').appendChild(renderer.domElement);
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 50, 50);
  scene.add(directionalLight);

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(-160, 50, 30));
  geometry.vertices.push(new THREE.Vector3(-160, 80, 100));

  var material = new THREE.LineBasicMaterial({color: 0xFFFFFF});
  var line = new THREE.Line(geometry, material);
  scene.add(line);

  render();

  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }
}())