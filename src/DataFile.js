function DataFile(id) {
  this.id = id;
  this.dataFlag = false;
}

DataFile.prototype.setData = function(data) {
  this.data = data;
  this.dataFlag = true;
}

DataFile.prototype.setFileType = function(type) {
  this.type = type;
}

DataFile.prototype.getCoord = function(idx) { 
  var result = [];
  result[0] = this.data[idx * 3];
  result[1] = this.data[idx * 3 + 1];
  result[2] = this.data[idx * 3 + 2];
  
  return result;
}
DataFile.prototype.getData = function() {
  var binFile = document.getElementById(this.id).files;
  if(!binFile) return;

  var fileReader = new FileReader();

  fileReader.readAsArrayBuffer(binFile[0]);  //ファイル読み込み

  var self = this;
  //ファイルの読み込み成功時
  fileReader.onload = function(e) {
    switch(self.type){
      case 'Uint':
        self.setData(new Uint32Array(fileReader.result));
        break;
      case 'Float':
        self.setData(new Float32Array(fileReader.result));
        break;
      default:
        break;
    }
  }

}

