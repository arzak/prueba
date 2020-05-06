

 




$(function()
{
    function after_form_submitted(data) 
    {

      
        if(data.result == 'success')
        {



            // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyDEbpC92xI0O6hjSwNXnBGStLgbxW_OMgw",
        authDomain: "reunion-8574d.firebaseapp.com",
        databaseURL: "https://reunion-8574d.firebaseio.com",
        projectId: "reunion-8574d",
        storageBucket: "reunion-8574d.appspot.com",
        messagingSenderId: "881636066181",
        appId: "1:881636066181:web:4bc888e167bf689c"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

           var database = firebase.database();     

           //console.log(data.datos.nombre);
           //userId=10;
           name=data.datos.nombre;
           email=data.datos.email;
           telefono=data.datos.telefono;
           status=0;
           acreditado=0;
           codigo=Math.floor(100000 + Math.random() * 900000);

           userId=codigo;

            writeUserData(userId,name, email, telefono, status,acreditado,codigo);

            $('form#reused_form').hide();
            $('#success_message').show();
            $('#error_message').hide();
            document.getElementById("reused_form").reset(); 
            $(".button-blue").attr("disabled", true);
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else



            function writeUserData(userId,name, email, telefono, status,acreditado,codigo) {
                    firebase.database().ref('descarga/'+userId).set({
                      username: name,
                      email: email,
                     telefono : telefono,
                     status:status,
                     acreditado:acreditado,
                     codigo:codigo
                     });
    }






    }

	$('#reused_form').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);

        var datos=$( this ).serialize();
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Enviando ...');
        });
        

            var formdata = new FormData(this);

            formdata.append('datos', datos);

             //console.log(datos)   

            $.ajax({
                type: "POST",
                url: 'handler.php',
                data:  formdata,
                success: after_form_submitted,
                dataType: 'json' ,
                processData: false,
                contentType: false,
                cache: false        
            });
        
      });	
});
