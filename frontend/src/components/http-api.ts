import axios, { AxiosResponse } from 'axios';

export async function getImages() {
    let response = await axios.get("/images", { responseType: "json" })
    return response.data;
}

export function getImageFromId(id: string, tag_name: string) {
    console.log("calling changeImageFromId from " + tag_name + " seeking image id : " + id);

    var imageUrl = "/images/" + id;
    var imageEl = document.getElementById(tag_name) as HTMLImageElement;

    axios.get(imageUrl, { responseType: "blob" })
        .then(function (response: AxiosResponse) {
            console.log("change image : OK")

            const reader = new window.FileReader();
            reader.readAsDataURL(response.data);
            reader.onload = function () {
                const imageDataUrl = (reader.result as string);
                console.log('problem : imageEl = ' + imageEl)
                if (imageEl == null) return;
                try {
                    imageEl.setAttribute("src", imageDataUrl);
                } catch {
                    console.log('problem : imageEl = ' + imageEl + ', imageDataUrl = ' + imageDataUrl)
                }
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log("change image : bad request : get(\"" + imageUrl + "\")")
        });
}

export function submitImage(files: FileList) {
    if (files == null) return;
    let formData = new FormData();
    formData.append('file', files[0]);
    axios.post('/images',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then(function () {
        console.log('SUCCESS!!');
    }).catch(function () {
        console.log('FAILURE!!');
    });
}