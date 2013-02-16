/**
* @file
* User interface functions for the author field module.
*/
(function ($) {
    
    
    $(window).ready(function(){
        var baseURL=window.location.protocol+"//"+window.location.host+Drupal.settings.basePath;
     
        /*
          * Function to check if Drupal's ajax event has completed or not. 
          * Todo: Search for better alternative to check if ajax call is complete or not   
          */            
        function checkForNewItems(){
            //  wait for throbber to hide 
            if(jQuery(".field-type-author-field").find(".ajax-progress-throbber").length==0){
                
                /*After each new item is added, Drupal removes our existing events and formatting,
                so we need to add events again. */
                addEventsToTextBox();
            }else{
                setTimeout(checkForNewItems, 1000);
            }
        }
        
        /*
         * Function to add events to author input boxes
         */
        function addEventsToTextBox(){
                     
            jQuery(".field-type-author-field").find(".field-add-more-submit").each(function(){


                var thisId=jQuery(this).attr('id');
              
                //attach our event listener to Drupal node's add more button
                if(thisId.indexOf('-und-add-more')>0){

                    $("#"+thisId).mousedown(function(){

                        jQuery("div#field-author-data").hide();
                        jQuery("div#field-author-data").appendTo(jQuery('body'));
          
               
                        checkForNewItems();
                    });
          
                }

            });

                    
                    
            //----------text box events --------------------------
            $("input.author-full").each(function(index,value){
                  
                //turn off browser's autocomplete
                jQuery(this).attr('autocomplete','off');
                
                
                var textbox=this;
                var authordisplay;
                
                
                var fieldwrapper= $(this).parents('.fieldset-wrapper');
                var nid=$(fieldwrapper).find(".field-author-display").attr('nid');
                
                $(fieldwrapper).css("margin","0px");
                if(nid!=""){
                    $(this).hide();
                    $(this).val(nid);
                    $(fieldwrapper).find(".field-author-display").show();
                    
                }else{
                
                 
                    //if browser's page is refreshed
                    var val= jQuery(this).val().trim();
                    
                    var author_entry=jQuery("div#field-author-data").find(".field-author-entry[nid="+val+"]");
                    
                    if(jQuery(author_entry).length>0){
                        authordisplay= jQuery(fieldwrapper).find(".field-author-display");
                        $(authordisplay).attr('nid',val);
                        $(authordisplay).find('.field-author-name').text(jQuery(author_entry).find('.field-author-name').text().trim());
                        $(authordisplay).find('.field-author-nid').text(jQuery(author_entry).find('.field-author-nid').text().trim());
                        $(authordisplay).find('.field-author-organization').text(jQuery(author_entry).find('.field-author-organization').text().trim());
                        $(this).hide();
                        $(fieldwrapper).find(".field-author-display").show();
                    } 
                 
                }
                
                $(fieldwrapper).find(".field-author-delete").click(function(){
                    authordisplay= jQuery(fieldwrapper).find(".field-author-display").hide();
                    
                    $(authordisplay).find('.field-author-name').text("");
                    $(authordisplay).find('.field-author-nid').text("");
                    
                    $(authordisplay).find('.field-author-organization').text("");
                    
                    $(textbox).show().val("");
                  
                    
                });
                
                  
                $(this).focus(function(event){
                    //we maintain only one autocmoplete author list per node add form regardless of number of instances of author fields                
                          
                    //move author list below to the focused textbox       
                    var div_t_list=jQuery(fieldwrapper).find('.field-author-list');
                    $("div#field-author-data").appendTo(div_t_list);
                    $(div_t_list).find('#field-author-data').show();          
                    $(div_t_list).width($(this).width()+5).show();
            
         
                }).blur(function(){
            
                  
                    var div_t_list=jQuery(this).parents('.fieldset-wrapper').find('.field-author-list');
                    //make sure all author entries are visible
                    $(div_t_list).find('.field-author-entry').show();
                    
                    //hide the autocomplete list
                    $(div_t_list).hide();
                    
            
                }).keyup(function(event){
                    
                    // ------------ autocomplete code to search in the authors list -------------------------
                    var div_t_list=jQuery(this).parents('.fieldset-wrapper').find('.field-author-list');
                    var stringToSearch=$(this).val().toLowerCase();
                   
                    
                    jQuery(div_t_list).find('.field-author-entry').each(function(index,value){
                        if($(this).attr('authorname').toLowerCase().indexOf(stringToSearch)<0){
                            jQuery(this).hide();
                        }else{
                            jQuery(this).show();

                        }
                    });
                    
                });
            
            
                  
            }) ;
              
              
        
        }
      
        //show the loading message when loading or refreshing a page
        if(jQuery("#field-author-data").length==0){
         
            jQuery("body").prepend('<div  id="field-author-load" class="messages" >Loading authors/users...</div>');
            $( "#field-author-load" ).show();
       
        }
     
      
        //make an ajax call to get the list of authors
        function loadAuthorsData(){
            $.ajax({
                url: baseURL+ 'author_field_getdata',
           
                success: function( data ) {
               
                    //remove all existing authors entries
                    jQuery("div#field-author-data").remove();
              
                    //append author list to body initially
                    jQuery("body").append(data );
                    
                    //hide the container used to hold the author list
                    jQuery("body").find('.field-author-list').hide();
                    
                    
                    //when new author is added, we reload the entire authors list, so if existing add author-content dialog is open, close it
                    if($("#field-author-addnew").length>0){
                        $("#field-author-addnew").dialog('close');
                    }
                    
                    //------ events for add new author-content content
                    jQuery("div.field-author-addnewentry").mousedown(function(){
                                          
                        var addNewAuthorUrl= baseURL+  'node/add/author-content';
                      
                        
                        jQuery("div#field-author-addnew").remove()
                      
                        jQuery("body").append('<div title="Add New Author" id="field-author-addnew" class="loading-gif-large" ><iframe style="display:block;margin-top:600px;" name="addnewauthoriframe" id="field-author-addnew-iframe"  width="100%" height="95%" src="'+addNewAuthorUrl+'" ></iframe> </div> ');
                        //note: we set iframe's margin-top=600px so that user won't see the loading of a iframe
                      
                      
                        //create a jQuery UI popup dialog
                        $( "#field-author-addnew" ).dialog({
                            height: 500,
                            width:600,
                            modal: true,
                            autoOpen: false 
                        });
                    
                    
                        //supress the ajax autocomplete warnings on add author-content form to give better user experience
                        window["addnewauthoriframe"].alert=function(msg){
                            if(window.console && window.console.log){
                                console.log(msg);
                            }
                        }
    
    
                    
                        //on iframe load
                        jQuery("#field-author-addnew-iframe").load(function(){
                            
                        
                            //get iframe's contens
                            var iframe_contents=jQuery(this).contents();

 
                            //check if iframe is loading a add author-content form or showing the node created form
                            if(iframe_contents[0].URL!==addNewAuthorUrl){
                                //inside means, iframe is showing node created form. 
                                //we try to extract the node id from iframe's url 
                                
                                jQuery(this).parent().addClass('loading-gif-large');
                                jQuery(this).hide();
                               
                                var iframeURL=iframe_contents[0].URL;
                               
                             
                                var nodeUrl=iframeURL.replace(baseURL,"");
                                var pos1=nodeUrl.indexOf('node/');
                                var nid;
                                
                                
                                //Check if pathauto is enabled, we may get the node alias instead the node id if pathauto is enabled
                                if(pos1!=-1){
                                    //pathauto is not enabled
                                     
                                    nid=iframeURL.substring(pos1+6);
                                 
                                     
                                  
                                }else{ 
                                    //pathauto is enabled
                                    
                                    
                                    //make an ajax call to get the nid from node's alias
                                    jQuery.ajax({
                                        type: 'POST',
                                        async:false,
                                        url: baseURL+"author_field_getnid",
                                        data: {
                                            alias: nodeUrl
                                            
                                        },
                                        dataType:'json',
                                        success: function(data){

                                            nid=data.nid;
                                          
                                        }
  
                                    });
                                }
                                
                                 
                               
                                var fieldwrapper= jQuery("#field-author-data").parents('.fieldset-wrapper');
                              
                                var inputbox= jQuery(fieldwrapper).find("input.author-full");
                                jQuery(inputbox).val(nid);
                                
                             
                                //load the authors data again
                                loadAuthorsData();
                                   
                         
                            
                          
                                
                             
                            }//end of checking for new node url

                        
                            //following code hides the everything on the page other than author-content-node-form
                        
                            jQuery("#field-author-addnew-iframe").contents().find('body').removeAttr('style'); 
                            jQuery("#field-author-addnew-iframe").contents().find('body').removeAttr('class'); 
                            
                            
                            var iframeContents= jQuery("#field-author-addnew-iframe").contents();
                            var iframeBody=jQuery(iframeContents).find("body");

                            jQuery(iframeBody).css('padding','10px');

                            jQuery(iframeContents).find('#author-content-node-form').appendTo(jQuery(iframeBody));
                            jQuery(iframeContents).find('.messages').show().prependTo(jQuery(iframeBody));
                            jQuery(iframeBody).children().each(function(){
                              
                                if(jQuery(this).attr('id')!="author-content-node-form"){
                                    jQuery(this).hide();
                                }else{
                                    jQuery(this).show();
                                }

                            });
                        
                            //iframe is loaded so hide the loading gif
                            jQuery(this).parent().removeClass('loading-gif-large');
                            
                            //only after iframe is loaded and we hide all other elements except #author-content-node-form, we bring back iframe to its intended position
                            jQuery(this).css('margin-top','0px');
                            jQuery(this).show();
                            
                            
                            //bug in chrome. did not add message to top, do add it
                            jQuery(iframeContents).find('.messages').show().prependTo(jQuery(iframeBody));
                        

                        }) //end of iframe load event;
         
                      
                            
                        $( "#field-author-addnew" ).dialog('open');
                  
                
                    });
                 
                
                    //------ events for each entry in an author list ------------------------------
                    jQuery("div.field-author-entry").mousedown(function(){
                    
                    
                        //------ on mouse click update the input box and corresponding divs ------------
                        var wrapper=  jQuery(this).parents('.fieldset-wrapper');
                        jQuery(wrapper).find('input').val($(this).attr('nid')).hide();
                    
                        var authordisplay= jQuery(wrapper).find(".field-author-display");
                    
                        $(authordisplay).find('.field-author-name').text($(this).find('.field-author-name').text());
                        $(authordisplay).find('.field-author-nid').text($(this).find('.field-author-nid').text());
                    
                        $(authordisplay).find('.field-author-organization').text($(this).find('.field-author-organization').text());
                    
                        $(authordisplay).show();
                    
                   
                    });
                   
          
                        
                        
                    $( "#field-author-load" ).hide();
                 
           
                    //add events for the first time
                    addEventsToTextBox();
                  
                },
                error:function(){
                    $("input.author-full").val('Error: Could not load author list.').attr('disabled','true');
              
                
                }
            });
        }

        loadAuthorsData();
      
        
    });
  
     

})(jQuery);