const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // x1 x2 x3
    x1 = (data[0] - 42.68552) / 10.5902
    x2 = (data[1] - 88.62443) / 18.99792
    x3 = (data[2] - 143.0362) / 23.1039
    return [x1, x2, x3]
}

function denormalized(data){
    y1 = (data[0] * 9.194057) + 74.7862
    y2 = (data[1] * 14.79373) + 49.8907
    y3 = (data[2] * 24.03545) + 159.8179
    return [y1, y2, y3]
}


async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/nraziztn/bot-nur-aziz-41419010020/main/public/ex_model/model.json?token=5032006078:AAEqFrvzCagE0LxcTi02wILNgtjAjPQ1r4M';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
