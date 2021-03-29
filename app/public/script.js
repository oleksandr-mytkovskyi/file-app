const getFileForm = document.querySelector("#getFileForm");
getFileForm.addEventListener("submit", e => {
  e.preventDefault();
// для багатьох файлів
  const getFiles1 = document.querySelector('#getFiles').files;

  for (var i = 0; i < getFiles1.length; i++) {
      fetch('http://localhost:3000/file/',{
    method: 'POST',
    headers: {
      'Content-Disposition': getFiles1[i].name,
      'Content-Type': 'multipart/form-data'
    },
    body: getFiles1[i]
  })
  .then(data => {
      console.log(data);
  })
  .catch(e => {
      console.log(e);
  })
}

// для 1 файла
  // const getFiles = document.querySelector('#getFiles').files[0];
  // const fileName = getFiles.name;

  // fetch('http://localhost:3000/file/',{
  //   method: 'POST',
  //   headers: {
  //     'Content-Disposition': fileName,
  //     'Content-Type': 'multipart/form-data'
  //   },
  //   body: getFiles
  // })
  // .then(data => {
  //     console.log(data);
  // })
  // .catch(e => {
  //     console.log(e);
  // })
});


function getAllFile(){ 
  const data = fetch('http://localhost:3000/file/')
  .then((response) => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  })

  // console.log(data);
}

