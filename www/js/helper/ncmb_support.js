/**
 * NCMB利用のsupport
 */

var NcmbSupport = (function () {


    /**
     * Ncmbを利用してNiftymBaasにファイルをアップロードする
     * @param {*} phote_uri     ファイルパス
     * @param {*} filename      ファイル名
     * @param {*} callback      コールバック
     */
    var fileUploadNcmb =  function(phote_uri,filename,callback){
        window.resolveLocalFileSystemURI(phote_uri, function(fileEntry) {
            fileEntry.file(function(file){
                
                var reader = new FileReader();
                reader.onloadend = function (evt) {
                    console.log("read success");
                    console.log("通過チェックBBB ：："+ evt.target.result);
                    var blob = new Blob([new Uint8Array(evt.target.result)], { type: "image/jpg" });
                    ncmb.File.upload(filename, blob)
                        .then(function(data){
                            // アップロード後処理
                            console.log("成功 = " + JSON.stringify(data));
                            callback(true)
                        })
                        .catch(function(err){
                            // エラー処理
                            console.info('err = '+err);
                            callback(false)
                        });
                };
                reader.readAsArrayBuffer(file);
                
            }, function(error){
                console.info('err = '+error.code);
                callback(false)
            });
            
        }, function(e)  {
            //エラー
            console.info('err = '+e);
            callback(false)
        });
    
    }

    return {
        fileUploadNcmb : fileUploadNcmb
    }
})();

