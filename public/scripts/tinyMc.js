window.onload = function () {
  tinymce.init({
    selector: "textarea#tiny-mce-post-body",
    plugins:
      "a11ychecker advcode casechange formatpainter media image imagetools linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker",
    toolbar:
      "a11ycheck link image media  casechange checklist code formatpainter pageembed permanentpen table",
    toolbar_mode: "floating",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    height: 400,
    automatic_uploads: true,
    images_upload_url: "/uploads/postimage",
    images_upload_handler: function (blobInfo, success, failure) {
      let headers = new Headers();
      headers.append("Accept", "Application/JSON");

      let formData = new FormData();
      formData.append("post-image", blobInfo.blob(), blobInfo.filename());

      let req = new Request("/uploads/postimage", {
        method: "POST",
        headers,
        mode: "cors",
        body: formData,
      });

      fetch(req)
        .then((res) => res.json())
        .then((data) => success(data.imgUrl))
        .catch(() => failure("HTTP Error"));
    },
  });
};
