// esta linha faz com que a webcam seja ativada e exibida em um elemento HTML com o ID "camera"
Webcam.attach( '#camera' );

//seleciona o elemento HTML com o ID "camera" e atribui a ele a variável "camera".

camera = document.getElementById("camera");
   /**define as configurações da webcam, incluindo a largura e altura da imagem, 
    o formato de imagem e a qualidade da imagem em formato PNG. */   
  Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });


function take_snapshot()

/**chamada quando o botão "Tirar foto" é clicado, 
ela captura uma imagem da webcam e exibe a imagem capturada em um elemento HTML. */

{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
    });
}
// exibe a versão da biblioteca ML5.js no console do navegador.

  console.log('ml5 version:', ml5.version);
  
  /**Inicialize o método de classificação de imagem com o MobileNet
  classificador = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/R0l5dvqD5/model.json',modelLoaded);*/
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/R0l5dvqD5/model.json',modelLoaded);


// Quando o modelo é carregado

function modelLoaded() {
  console.log('Model Loaded!');
  }
      
  function check()
  {
    img = document.getElementById('selfie_image');
    classifier.classify(img, gotResult);
  }


// Uma função para ser executada quando recebermos erros ou resultados.


function gotResult(error, results) {


  // Imprime o erro no console 

  if (error) {
    console.error(error);
  } else {
    
//Os resultados estão em um array ordenado por confiança.

/*A array ordenada por confiança" significa que os resultados da classificação de  
 imagem são armazenados em uma estrutura de dados chamada array, e que os objetos nessa array são organizados 
 em ordem decrescente de confiança, ou seja, do objeto que o algoritmo considera mais provável 
 de estar presente na imagem até o menos provável. Assim, 
 o primeiro objeto na array é aquele em que o modelo tem a maior confiança de que está presente na imagem. */


console.log(results);
    document.getElementById("result_object_name").innerHTML = results[0].label;
    document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
  }
}