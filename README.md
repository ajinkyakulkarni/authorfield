-- SUMMARY --

This module provides a field type for storing authors.

The module creates a custom content type called 'author_content' and store each author information using that content type.
Fields such as email, biography, organizations, and picture are automatically created and added to the 'author_content' content type.

It also creates a vocabulary to store author's organizations. Module exposes a permission to control the addition of new terms into an organization vocabulary.

This module works like a user_reference module storing only the author node id in the field and pointing to the actual author node.

Other Features:
* Autocomplete list for selecting existing authors
* Ability to add multiple authors
* Ability to create new author content using a popup window
* Custom rendering of author information

-- REQUIREMENTS --

* Email field module http://drupal.org/project/email.

-- INSTALLATION --

* Install Email field module

* Then install as usual, see http://drupal.org/node/70151 for further information.



-- CONFIGURATION --

* Configure user permissions in Administration » People » Permissions:

  - Add New Organization

    This permission controls whether users can add new terms to the organization 
    vocabulary or not
 



-- CONTACT --

Current maintainers:
* Ajinkya Kulkarni (ajinkya.kulkarni) - http://drupal.org/user/769896 