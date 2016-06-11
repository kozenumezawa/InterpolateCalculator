function getBinFile() {
  var binFile = document.getElementById('targetFiles').files;

  if(!binFile) return;

  var fileReader = new FileReader();

  //ファイル読み込み成功時
  fileReader.onload = function(e) {
    var test = new Uint32Array(fileReader.result);

    target.innerHTML = test;

  }

  fileReader.readAsArrayBuffer(binFile[0]);  //ファイル読み込み

}