
    $(document).ready(function(){
        //$('#replaceable').fadeIn(300);
        if ('onhashchange' in window) {
            window.onhashchange = hashHasChanged;    
        } else {
           alert('Browser doesnt support hashchanges, need to account for this - direct link alternative');
        }

        $('#mainNav').on("click","span",function(){
            $('#mainNav span').each(function() {
                 $(this).removeClass('active');  
            })
            
            $(this).addClass('active');
        });


    });

    function hashHasChanged(event){
        var url = event.currentTarget.location.hash;
        $('#mainNav span').each(function() {
             $(this).removeClass('active');  
        })
        $('#mainNav a[href=' + url + ']').parent().addClass('active');

        url = url.replace('#','');
        console.log(url);
        pageOut(url);
    };

    function pageOut(url){
        $('#replaceable').animate({
                opacity: 0,
                left: -100
            },  
            1000,
            function() {
                loadPage(url);
        });
    }



    function loadPage(url)	//the function that loads pages via AJAX
    {
        //url=url.replace('#page','');	//strip the #page part of the hash and leave only the page number

        $('#loading').css('visibility','visible');	//show the rotating gif animation

        if (url == null || url == '') {
            url = 'indexFill';
        }

        $.ajax({	//create an ajax request to load_page.php
            type: "POST",
            url: "load_page.php",
            data: "page=" + url,
            dataType: "html",	//expect html to be returned
            success: function(msg){

                if(parseInt(msg)!=0)	//if no errors
                {

                    $('#replaceable').html(msg);	//load the returned html into pageContent
                    $('#replaceable').animate({
                        opacity: 1,
                        left: 0
                    },  
                    1000,
                    function() {
                    });
                }
            }

        });
    };