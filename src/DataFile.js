function DataFile(id) {
  this.id = id;
}

DataFile.prototype.setData = function(data) {
  this.data = data;
}

DataFile.prototype.getData = function() {
  var binFile = document.getElementById(this.id).files;
  if(!binFile) return;

  var fileReader = new FileReader();

  fileReader.readAsArrayBuffer(binFile[0]);  //ファイル読み込み

  var self = this;
  //ファイルの読み込み成功時
  fileReader.onload = function(e) {
    self.setData(new Uint32Array(fileReader.result));
  }
}

