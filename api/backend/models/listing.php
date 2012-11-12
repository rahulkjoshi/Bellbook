<?php

// Define the Listing class
class User {
   public $listing_id;
   public $first_name;
   public $last_name;
   public function toJSON()
   {
      return '#'.$this->id.': '.$this->first_name.' '.$this->last_name;
   }
}

?>