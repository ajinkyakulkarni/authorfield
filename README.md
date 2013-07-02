### SUMMARY

This Drupal module provides a field type for storing authors.

The module creates a custom content type called 'author_content' and store each author information using that content type.
Fields such as email, biography, organizations, and picture are automatically created and added to the 'author_content' content type.

It also creates a vocabulary to store author's organizations. Module exposes a permission to control the addition of new terms into an organization vocabulary.

This module works like a user_reference module storing only the author node id in the field and pointing to the actual author node.

Other Features:
* Autocomplete list for selecting existing authors
* Ability to add multiple authors
* Ability to create new author content using a popup window
* Custom rendering of author information

### SCREENSHOTS

#####Add New Author
![addnewauthor](http://content.screencast.com/users/Ajinkya/folders/Default/media/d18d2b54-9ac1-4806-b870-de3acfbd8002/Add%20new%20Author%20popup.jpg)

#####Autocomplete List

![autocompletelist](http://content.screencast.com/users/Ajinkya/folders/Default/media/4623683d-973d-4411-a484-2045c78884d5/Autocomplete%20List.jpg)

#####Selected Authors in a add content form

![selectedauthors](http://content.screencast.com/users/Ajinkya/folders/Default/media/6d86b4c2-3e69-4823-9638-94ae7aaba0e3/Selected%20Authors%20in%20a%20node.jpg)


#####Node Display

![nodedisplay](http://content.screencast.com/users/Ajinkya/folders/Default/media/66e5af09-9ee3-4803-b433-ff60153687d1/Node%20display.jpg)

#####Author Content Type

![authorcontenttype](http://content.screencast.com/users/Ajinkya/folders/Default/media/448e8eef-ba3e-498e-9978-1067f36d5756/Author%20Content%20Type%20definition.jpg)

#####Nodes of Author Content Type

![authornodes](http://content.screencast.com/users/Ajinkya/folders/Default/media/8046a85b-7f5f-4891-b434-4f0e76fef381/Nodes%20of%20Author%20Content%20Type.jpg)


### REQUIREMENTS

* Email field module http://drupal.org/project/email.

### INSTALLATION

* Install Email field module

* Then install as usual, see http://drupal.org/node/70151 for further information.



### CONFIGURATION

* Configure user permissions in Administration » People » Permissions:

  - Add New Organization

    This permission controls whether users can add new terms to the organization 
    vocabulary or not
 



### CONTACT

Current maintainers:
* Ajinkya Kulkarni (ajinkya.kulkarni) - http://drupal.org/user/769896 
