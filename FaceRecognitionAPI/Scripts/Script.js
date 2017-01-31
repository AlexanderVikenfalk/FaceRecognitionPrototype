$(document).ready(function () {
    var request = new XMLHttpRequest();


    var getFace = function () {
        var value = $('#input').val();

        //request.onreadystatechange = function () {

        //	console.log("readyState:" + request.readyState);
        //	console.log("status:" + request.status);
        //	console.log("responseText:" + request.responseText);
        //	console.log("-----");

        //	if ((request.readyState === 4) && (request.status === 200)) {
        //		$("ul").append("<li>" + request.responseText + "</li>");
        //	}
        //}


        $.getJSON("http://face-recognition-api.azurewebsites.net/api/webapi?url=" + value + "", function (json) {
        //$.getJSON("http://localhost:59982/api/webapi?url=" + value + "", function (json) {

            $('#placeHolder').html('<div id="image" style="background-image: url(' + value + ')"></div>');

            var response = json;

            var age = response[0].faceAttributes.age;
            var gender = response[0].faceAttributes.gender;

            // Face
            var faceHeight = response[0].faceRectangle.height;
            console.log(faceHeight);
            var faceWidth = response[0].faceRectangle.width;
            console.log(faceWidth);

            var faceLeft = response[0].faceRectangle.left;
            console.log(faceLeft);

            var faceTop = response[0].faceRectangle.top;
            console.log(faceTop);


            // Left eye
            var eyeLeftBottom = response[0].faceLandmarks.eyeLeftBottom.y;
            var eyeLeftTop = response[0].faceLandmarks.eyeLeftTop.y;
            var eyeLeftInner = response[0].faceLandmarks.eyeLeftInner.x;
            var eyeLeftOuter = response[0].faceLandmarks.eyeLeftOuter.x;

            // Right eye 
            var eyeRightBottom = response[0].faceLandmarks.eyeRightBottom.y;
            var eyeRightTop = response[0].faceLandmarks.eyeRightTop.y;
            var eyeRightInner = response[0].faceLandmarks.eyeRightInner.x;
            var eyeRightOuter = response[0].faceLandmarks.eyeRightOuter.x;

            // Mouth 
            var underLipBottom = response[0].faceLandmarks.underLipBottom.y;
            var upperLipTop = response[0].faceLandmarks.upperLipTop.y;
            var mouthRight = response[0].faceLandmarks.mouthRight.x;
            var mouthLeft = response[0].faceLandmarks.mouthLeft.x;

            // Nose
            var noseTip = response[0].faceLandmarks.noseTip.y;
            var noseRootLeft = response[0].faceLandmarks.noseRootLeft.y;
            var noseRightAlarOutTip = response[0].faceLandmarks.noseRightAlarOutTip.x;
            var noseLeftAlarOutTip = response[0].faceLandmarks.noseLeftAlarOutTip.x;



            eyeLeftHeight = eyeLeftBottom - eyeLeftTop;
            eyeLeftWidth = eyeLeftInner - eyeLeftOuter;

            eyeRightHeight = eyeRightBottom - eyeRightTop;
            eyeRightWidth = eyeRightOuter - eyeRightInner;

            mouthHeight = underLipBottom - upperLipTop;
            mouthWidth = mouthRight - mouthLeft;

            noseHeight = noseTip - noseRootLeft;
            noseWidth = noseRightAlarOutTip - noseLeftAlarOutTip;

            eyeLeftTop = eyeLeftTop + 100;
            eyeRightTop = eyeRightTop + 100;
            upperLipTop = upperLipTop + 100;
            noseRootLeft = noseRootLeft + 100;
            faceTop = faceTop + 100;

            $("#gender").html("<b>This is probably a " + gender + "</b>");
            if (gender == "female") {
                $("#age").html("<b>We think she is about " + age + " years old</b>");
            }
            else {
                $("#age").html("<b>We think he is about " + age + " years old</b>");
            }


            //Face
            var d = document.getElementById('face');
            d.style.position = "absolute";
            d.style.left = faceLeft + 'px';
            d.style.top = faceTop + 'px';
            d.style.height = faceHeight + 5 + 'px';
            d.style.width = faceWidth + 10 + "px";
            d.style.border = "2px solid green";
            //Left Eye
            var d = document.getElementById('leftEye');
            d.style.position = "absolute";
            d.style.left = eyeLeftOuter + 'px';
            d.style.top = eyeLeftTop + 'px';
            d.style.height = eyeLeftHeight + 5 + 'px';
            d.style.width = eyeLeftWidth + 10 + "px";
            d.style.border = "2px solid blue";

            //Right Eye
            var d = document.getElementById('rightEye');
            d.style.position = "absolute";
            d.style.left = eyeRightInner + 'px';
            d.style.top = eyeRightTop + 'px';
            d.style.height = eyeRightHeight + 5 + 'px';
            d.style.width = eyeRightWidth + 10 + "px";
            d.style.border = "2px solid blue";

            //Mouth
            var d = document.getElementById('mouth');
            d.style.position = "absolute";
            d.style.left = mouthLeft + 'px';
            d.style.top = upperLipTop + 'px';
            d.style.height = mouthHeight + 5 + 'px';
            d.style.width = mouthWidth + 10 + "px";
            d.style.border = "2px solid blue";

            //Nose
            var d = document.getElementById('nose');
            d.style.position = "absolute";
            d.style.left = noseLeftAlarOutTip + 20 + 'px';
            d.style.top = noseRootLeft - 10 + 'px';
            d.style.height = noseHeight + 40 + 'px';
            d.style.width = noseWidth - 30 + "px";
            d.style.border = "2px solid blue";








        });



    }

    $('#submit').click(getFace);


});