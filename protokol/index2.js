var out;
var newdoc;
function testfnc(){

    JSZipUtils.getBinaryContent('document.docx', function (error, content) {
      if (error) {
        throw error;
      }
      var opts = {}
      opts.centered = false;
      opts.getImage = function (tagValue, tagName) {
        return new Promise(function (resolve, reject) {
          JSZipUtils.getBinaryContent(tagValue, function (error, content) {
            if (error) {
              return reject(error);
            }
            return resolve(content);
          });
        });
      }
      opts.getSize = function (img, tagValue, tagName) {
        // FOR FIXED SIZE IMAGE :
        return [150, 150];
      }
  
      var imageModule = new ImageModule(opts);
  
      var zip = new PizZip(content);
      var doc = new docxtemplater()
        .loadZip(zip)
        .attachModule(imageModule)
        .compile();
      var cislo_dokumentu = "2";
      doc.resolveData({
        image: 'https://cdn.myshoptet.com/usr/www.laskakit.cz/user/logos/laskakit_tagline_crop-1.png',
        Insert_Value_0: cislo_dokumentu,  
    }).then(function () {
        console.log('ready');

        doc.render();
         out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        console.log(out);
        saveAs(out, 'newdoc.docx');
      function2();
      })
    });
    
    }
function function2(){
    console.log('function2');
        function loadFile(url, callback) {
            PizZipUtils.getBinaryContent(url, callback);
        }
        
            console.log('generate');
            loadFile(
                newdoc,
                function (error, content) {
                    if (error) {
                        throw error;
                    }
                    var zip = new PizZip(content);
                    var doc = new window.docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });

                    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                    doc.render({
                        Insert_Value_0: 0,  
                    });
                    console.log("render");

                    var blob = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        // compression: DEFLATE adds a compression step.
                        // For a 50MB output document, expect 500ms additional CPU time
                        compression: "DEFLATE",
                    });
                    // Output the document using Data-URI
                    saveAs(blob, "output.docx");
                }
            );
        };
      