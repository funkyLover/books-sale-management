$(document).ready(function() {
  $('.createdAt').each(function(i, el){
    var $el = $(el);
    var date = $el.attr('data-date');
    //myMoment = moment(date).format('YYYY-MM-DD HH:mm:ss');
    var myMoment = moment(date).format('YYYY-MM-DD');
    $el.text(myMoment);
  });
});