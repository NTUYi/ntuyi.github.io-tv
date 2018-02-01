//analyze.js

let faceConfig = {
    face_token : '',
}
let faceAttributes = {};



function detectCamImg(Camdata) {
    
    let url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';

    // let files = $('#testImg').prop('files');
    let files = video;
    let data = new FormData();
    data.append('api_key', "WYj1PZQSmcFOtTf0GNOnpnVknTWiWarR");
    data.append('api_secret', "Kurq91dNrqw_KoNu7W3lNa5RPZDHgTLF");
    data.append('image_file', Camdata);
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success(data) {
            faceConfig.face_token = data.faces[0].face_token;
            analyzeImg(); //调用分析图片的函数
        }
    })
}


function detectImg() {
    
    let url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
    let files = $('#testImg').prop('files');
    console.log(files[0]);
    let data = new FormData();
    data.append('api_key', "WYj1PZQSmcFOtTf0GNOnpnVknTWiWarR");
    data.append('api_secret', "Kurq91dNrqw_KoNu7W3lNa5RPZDHgTLF");
    data.append('image_file', files[0]);
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success(data) {
            faceConfig.face_token = data.faces[0].face_token;
            analyzeImg(); //调用分析图片的函数
        }
    })
}

function analyzeImg() {
    let url = 'https://api-cn.faceplusplus.com/facepp/v3/face/analyze';
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            api_key: "WYj1PZQSmcFOtTf0GNOnpnVknTWiWarR",
            api_secret: "Kurq91dNrqw_KoNu7W3lNa5RPZDHgTLF",
            face_tokens: faceConfig.face_token,
            return_attributes: "gender,age,smiling,ethnicity,emotion"
        },
        success(data) {
            console.log(data);
            let attributes = data.faces[0].attributes;
            faceAttributes = {
                age : attributes.age.value,
                gender: attributes.gender.value,
                ethnicity: attributes.ethnicity.value,
                smiling: attributes.smile.value,                
                emotion: attributes.emotion
            }
            console.log(faceAttributes);
           var $log = $( "#log" ),
              str = JSON.stringify(faceAttributes),
              html = $.parseHTML( str );
             
            // Append the parsed HTML
            $log.append( html );
            // //用jQuery获取模板
            // var tpl   =  $("#tpl").html();
            // //预编译模板
            // var template = Handlebars.compile(tpl);
            // //匹配json内容
            // var html = template(faceAttributes);
            // //输入模板
            // $('#result').html(html);
        }
    })
}
