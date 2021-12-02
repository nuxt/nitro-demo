import JSZip from "jszip";
import saveAs from "file-saver";

export default {
  generateZipFile(project, onComplete) {

    const jszip = new JSZip();

    const items = [];

    const promises = []

    const previewRoot = 'https://plan8-api-preview-dev.s3.eu-central-1.amazonaws.com'

    project.subProjects.forEach(project => {
      jszip.folder(project.name);
      project.items.forEach(item => {
        let fileName = item.originalName;
        let fileUrl = `${previewRoot}/${item.stems[0].key}.mp3`;
        const prom = this.downloadUrlAsPromise(fileUrl)
        //items.push(item)
        jszip.file(
          `${project.name}/${fileName}`, //in my case, this produces something like 'my image.jpg'
          prom
          //this.downloadUrlAsPromise(fileUrl) //generates the file we need to download


        );
        promises.push(prom)

      });

    });

    console.log('jszip: ', jszip);


    Promise.all(promises).then(() => {
      jszip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, `${project.name}.zip`);
      });
      onComplete && onComplete()
    })


    // //Looping through to get the download url for each image
    // for (let i = 0; i < items.length; i++) {
    //   let fileName = items[i].name;
    //   let fileUrl = items[i].url;



    //   jszip.file(
    //     fileName, //in my case, this produces something like 'my image.jpg'
    //     this.downloadUrlAsPromise(fileUrl) //generates the file we need to download
    //   );

    //   //If we have reached the last image in the loop, then generate the zip file
    //   if (i == items.length - 1) {
    //     jszip.generateAsync({ type: "blob" }).then(function (content) {
    //       saveAs(content, `${board.boardName}.zip`);
    //     });
    //   }
    // }
  },

  downloadUrlAsPromise(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onreadystatechange = function (evt) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error("Error for " + url + ": " + xhr.status));
          }
        }
      };
      xhr.send();
    });
  }
}